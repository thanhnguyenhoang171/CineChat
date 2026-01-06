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
