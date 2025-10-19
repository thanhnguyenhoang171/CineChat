export function parseSort(sortString?: string): Record<string, 1 | -1> {
  const sort: Record<string, 1 | -1> = {};

  if (!sortString) return sort; // if not have sortString return empty object

  const fields = sortString.split(',');

  fields.forEach((field) => {
    field = field.trim();
    if (!field) return; //reject empty field

    if (field.startsWith('-')) {
      sort[field.substring(1)] = -1; // descending
    } else {
      sort[field] = 1; // ascending
    }
  });

  return sort;
}
