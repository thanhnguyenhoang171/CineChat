import { PaginationQueryDto } from '@common/dto/pagination-query.dto';
import aqp from 'api-query-params';
import { Logger } from '@nestjs/common';
import { PaginatedMeta, PaginatedResponse } from '@interfaces/pagination.interface';
import { Model } from 'mongoose';

const logger = new Logger('HTTP');

export const parseSort = (sortString: string): Record<string, 1 | -1> => {
  return sortString.split(',').reduce(
    (acc, sortField) => {
      const field = sortField.trim();

      if (field.startsWith('-')) {
        acc[field.substring(1)] = -1; // decreasing
      } else {
        acc[field] = 1;
      }
      return acc;
    },
    {} as Record<string, 1 | -1>,
  );
};
export const buildBaseOptions = (page: number, limit: number): any => {
  return {
    skip: (page - 1) * limit,
    limit: limit,
  };
};

export const handleFilters = (
  dto: PaginationQueryDto & { search?: string },
  query: any,
  options: any,
): void => {
  if (!dto.filters) return;

  const parseQuery = aqp(dto.filters, {
    skipKey: 'skip',
    limitKey: 'limit',
    projectionKey: 'projection',
    sortKey: 'sort',
  });
  Object.assign(query, parseQuery.filter); // use that instead spread syntax

  if (parseQuery.sort) {
    options.sort = parseQuery.sort;
  }
  if (parseQuery.projection) {
    options.projection = parseQuery.projection;
  }
};

export const handleSearch = (
  dto: PaginationQueryDto & { search?: string },
  searchFields: string[],
  query: any,
): void => {
  if (dto.search && dto.search.length > 0) {
    query.$or = searchFields.map((field) => ({
      [field]: { $regex: dto.search, $options: 'i' },
    }));
  }
};

export const handleProjections = (
  dto: any,
  options: any,
  schemaPaths?: Record<string, any>,
  defaultExcludes: string[] = ['createdBy'], // 👈 chỉ mặc định loại password
): void => {
  const projection: Record<string, 0 | 1> = {};

  // Nếu user truyền projections (vd: ?projections=name,email,-username)
  if (dto.projections) {
    const fields = dto.projections.split(',').map((f: string) => f.trim());
    const includes: string[] = [];
    const excludes: string[] = [];

    for (const field of fields) {
      if (field.startsWith('-')) excludes.push(field.substring(1));
      else includes.push(field);
    }

    if (includes.length > 0 && excludes.length > 0) {
      logger.warn(
        'Mixing include/exclude fields in projections — defaulting to exclude mode',
      );
    }

    const useExclude = excludes.length > 0;
    const rawFields = useExclude ? excludes : includes;
    const validFields = schemaPaths
      ? rawFields.filter((f) => schemaPaths[f])
      : rawFields;

    if (validFields.length === 0) {
      logger.warn('No valid projection fields found, skipping projection.');
    } else {
      for (const field of validFields) {
        projection[field] = useExclude ? 0 : 1;
      }
    }
  }

  // Luôn exclude mặc định các trường nhạy cảm
  for (const excludeField of defaultExcludes) {
    projection[excludeField] = 0;
  }

  options.projection = projection;

  logger.debug(`Applied projection: ${JSON.stringify(projection)}`);
};

export const handleSort = (dto: PaginationQueryDto & { search?: string }, options: any): void => {
  if (!options.sort) {
    options.sort = dto.sort ? parseSort(dto.sort) : { createdAt: -1 };
  }
};

export const handlePopulate = (
  dto: PaginationQueryDto & { search?: string },
  populateOptions: any,
  options: any,
): void => {
  if (populateOptions) {
    options.populate = populateOptions;
  } else if (dto.populate) {
    options.populate = dto.populate.split(',').map((field: string) => field.trim());
  }
};

export const logQuery = (query: any, options: any): void => {
  logger.log('--- Final Mongoose Query ---');
  logger.log('Query: ' + JSON.stringify(query, null, 2));
  logger.log('Options: ' + JSON.stringify(options, null, 2));
};

export const executeQuery = async <T>(
  model: Model<T>,
  query: any,
  options: any,
  page: number,
  limit: number,
): Promise<PaginatedResponse<T>> => {
  try {
    const [total, data] = await Promise.all([
      model.countDocuments(query),
      model
        .find(query, options.projection || {})
        .sort(options.sort)
        .skip(options.skip)
        .limit(options.limit)
        .populate(options.populate || [])
        .lean<T[]>(),
    ]);

    const meta: PaginatedMeta = {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };

    return { data, meta };
  } catch (error) {
    console.error('Pagination errors:', error);
    throw error;
  }
};

export const buildSearchQuery = (search: string, searchFields: string[]): any => {
  if (!search || searchFields.length === 0) return {};

  return {
    $or: searchFields.map((field) => ({
      [field]: { $regex: search, $options: 'i' },
    })),
  };
};

export const parseProjections = (projections: string, model?: any): any => {
  if (!projections) return {};

  const fields = projections.split(',').map((f) => f.trim());
  const schemaFields = model ? Object.keys(model.schema.paths) : null;

  const includes: string[] = [];
  const excludes: string[] = [];

  fields.forEach((field) => {
    const isExclude = field.startsWith('-');
    const name = isExclude ? field.substring(1) : field;

    if (schemaFields && !schemaFields.includes(name)) {
      logger.warn(`Ignored projection field "${name}" — not in schema`);
      return;
    }

    if (isExclude) excludes.push(name);
    else includes.push(name);
  });

  // Nếu cả include và exclude đều có → ưu tiên loại exclude (hoặc bạn có thể throw)
  if (includes.length > 0 && excludes.length > 0) {
    logger.warn('Mixing include/exclude in projection — defaulting to exclude mode');
    return excludes.reduce(
      (acc, f) => {
        acc[f] = 0;
        return acc;
      },
      {} as Record<string, 0 | 1>,
    );
  }

  const target = excludes.length > 0 ? excludes : includes;
  const mode: 0 | 1 = excludes.length > 0 ? 0 : 1;

  return target.reduce(
    (acc, f) => {
      acc[f] = mode;
      return acc;
    },
    {} as Record<string, 0 | 1>,
  );
};

export const buildPaginationMeta = (total: number, page: number, limit: number): PaginatedMeta => {
  return {
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
  };
};

export const buildQueryOptions = (
  page: number,
  limit: number,
  sort?: any,
  projection?: any,
): any => {
  const options: any = {
    skip: (page - 1) * limit,
    limit: limit,
  };

  if (sort) options.sort = sort;
  if (projection) options.projection = projection;

  return options;
};


