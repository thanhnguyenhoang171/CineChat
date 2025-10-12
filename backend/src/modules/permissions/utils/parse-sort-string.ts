export function parseSort(sortString: string): any {
  const sort: any = {};
  const fields = sortString.split(',');

  fields.forEach((fields) => {
    if (fields.startsWith('-')) {
      sort[fields.substring(1)] = -1; // descending
    } else {
      sort[fields] = 1; // ascending
    }
  });
}
