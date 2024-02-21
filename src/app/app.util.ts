export const arrayToObject = <T extends { [id: string]: any }>(
    array: T[],
    keyField: keyof T
  ) =>
    array.reduce((obj, item) => {
      typeof item === 'string'
        ? (obj[item] = item)
        : (obj[item[keyField]] = item);
      return obj;
    }, {} as { [id: string]: T }) || ({} as { [id: string]: T });