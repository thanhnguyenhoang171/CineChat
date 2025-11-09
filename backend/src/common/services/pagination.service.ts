import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { PaginationQueryDto } from '@common/dto/pagination-query.dto';
import { PaginatedMeta, PaginatedResponse } from '@interfaces/pagination.interface';
import aqp from 'api-query-params';
import {
  buildBaseOptions,
  executeQuery,
  handleFilters,
  handlePopulate,
  handleProjections,
  handleSearch,
  handleSort,
  logQuery,
  parseSort,
} from '@common/utils/pagination-query-handle.util';

@Injectable()
export class PaginationService {
  async paginate<T>(
    model: Model<T>,
    dto: PaginationQueryDto & { search?: string },
    searchFields: string[] = [],
    populateOptions?: any,
  ): Promise<PaginatedResponse<T>> {
    const { page, limit } = dto;

    let query: any = {};
    let options: any = buildBaseOptions(page, limit);

    handleFilters(dto, query, options);

    handleSearch(dto, searchFields, query);

    handleProjections(dto, options, model.schema.paths);

    handleSort(dto, options);

    handlePopulate(dto, populateOptions, options);

    logQuery(query, options);

    return await executeQuery(model, query, options, page, limit);
  }
}
