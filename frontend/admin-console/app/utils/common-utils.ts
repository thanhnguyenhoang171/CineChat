export function formatFullName(
  firstName?: string | null,
  lastName?: string | null,
): string {
  return [firstName, lastName].filter(Boolean).join(' ').trim();
}

export function parseFullName(fullName?: string | null) {
  const clean = fullName?.trim().replace(/\s+/g, ' ') ?? '';

  if (!clean) {
    return { firstName: '', lastName: '' };
  }

  const parts = clean.split(' ');

  return {
    firstName: parts.at(-1) ?? '',
    lastName: parts.slice(0, -1).join(' '),
  };
}
