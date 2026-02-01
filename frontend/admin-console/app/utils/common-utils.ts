import { format } from 'date-fns';

export function formatFullName(
  firstName?: string | null,
  lastName?: string | null,
): string {
  const parts = [firstName, lastName]
    .map((part) => part?.trim())
    .filter((part) => part && part.length > 0);
  return parts.join(' ').trim();
}

export function parseFullName(
  fullName?: string | null,
  options?: {
    firstNamePosition?: 'first' | 'last';
    includeMiddleName?: boolean;
    maxLastNameWords?: number;
  },
): {
  firstName: string;
  lastName: string;
  middleName?: string;
} {
  const {
    firstNamePosition = 'last',
    includeMiddleName = false,
    maxLastNameWords,
  } = options || {};

  // Handle empty input
  if (!fullName) {
    return { firstName: '', lastName: '' };
  }

  const clean = fullName.trim().replace(/\s+/g, ' ');
  const parts = clean.split(' ').filter((part) => part.length > 0);

  if (parts.length === 0) {
    return { firstName: '', lastName: '' };
  }

  if (parts.length === 1) {
    return {
      firstName: parts[0],
      lastName: '',
    };
  }

  let firstName = '';
  let lastName = '';
  let middleName = '';

  if (firstNamePosition === 'last') {
    firstName = parts[parts.length - 1];
    const lastNameParts = parts.slice(0, -1);

    // Limit the number of words for lastName if configured
    if (maxLastNameWords && maxLastNameWords > 0) {
      lastName = lastNameParts.slice(0, maxLastNameWords).join(' ');
    } else {
      lastName = lastNameParts.join(' ');
    }
    if (includeMiddleName && parts.length > 2) {
      middleName = parts.slice(1, -1).join(' ');
    }
  } else {
    firstName = parts[0];
    const lastNameParts = parts.slice(1);

    if (maxLastNameWords && maxLastNameWords > 0) {
      lastName = lastNameParts.slice(0, maxLastNameWords).join(' ');
    } else {
      lastName = lastNameParts.join(' ');
    }
    if (includeMiddleName && parts.length > 2) {
      middleName = parts.slice(1, -1).join(' ');
    }
  }

  const result: any = {
    firstName,
    lastName,
  };

  if (includeMiddleName && middleName) {
    result.middleName = middleName;
  }

  return result;
}

export const generatePaginationEllipsis = (
  totalPages: number,
  currentPage: number,
) => {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1); // if has 7  item -> show all
  }

  if (currentPage <= 3) {
    return [1, 2, 3, 'ellipsis', totalPages - 1, totalPages]; // located at some place in first head (1 2 3 ... 20)
  }

  if (currentPage >= totalPages - 2) {
    return [1, 2, 'ellipsis', totalPages - 2, totalPages - 1, totalPages]; // located at some place in last tail (1  ...18 19 20)
  }

  // located in center (1 ...4 5 6 ... 20)
  return [
    1,
    'ellipsis',
    currentPage - 1,
    currentPage,
    currentPage + 1,
    'ellipsis',
    totalPages,
  ];
};

export const get4LastDigitsFromId = (id: string) => {
  return id.slice(-4);
};

export const getItemTotal = (itemArr: any[]) => {
  return itemArr.length;
};

export const formatDateTime = (
  date?: Date | string | number | null,
): string => {
  if (!date) return '---';

  try {
    const d = new Date(date);
    if (isNaN(d.getTime())) return 'Invalid Date';

    return format(d, 'dd/MM/yyyy HH:mm:ss');
  } catch (error) {
    return 'Invalid Date';
  }
};
