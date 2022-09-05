export const getMatch = (query: any): any => {
  const match: any = {};
  const keys: string[] = Object.keys(query);
  const filteredKeys: string[] = keys.filter((key) => {
    return key !== "sort" && key !== "skip" && key !== "limit";
  });
  filteredKeys.forEach((key) => {
    if (!isNaN(Number(query[key]))) {
      query[key] = Number(query[key]);
    } else if (query[key] === "true" || query[key] === "false") {
      if (query[key] === "true") {
        query[key] = true;
      } else {
        query[key] = false;
      }
    } else if (query[key] === "null") {
      query[key] = null;
    }
    return (match[key] = query[key]);
  });
  return match;
};

export const paginator = (queryObject: any): string => {
  //FILTERING:
  let filtering = ``;
  const match = getMatch(queryObject);
  if (Object.keys(match).length > 0) {
    filtering = ` WHERE`;
    let counter = 0;
    Object.entries(match).forEach(([key, value]) => {
      if (counter > 0) {
        filtering += ` AND`;
      }
      if (typeof value === "string") {
        value = `'${value}'`
      }
      filtering += ` ${key} = ${value}`;
      counter++;
    });
  }
  //SORTING:
  let sorting = ``;
  if (queryObject.sort) {
    sorting = ` ORDER BY ${queryObject.sort}`;
  }
  //PAGINATION:
  let limit = ` LIMIT 10`;
  if (queryObject.limit) {
    limit = ` LIMIT ${queryObject.limit}`;
  }
  let skip = ` OFFSET 0`;
  if (queryObject.skip) {
    skip = ` OFFSET ${queryObject.skip}`;
  }
  const pagination = limit + skip;
  //FINAL QUERY:
  const query = filtering + sorting + pagination;

  return query;
};
