export const collectionListGenerator = (list, key) => {
  return list.reduce((acc, curr) => {
    if (!acc.hasOwnProperty(curr[key])) {
      return { ...acc, [curr[key].toLowerCase()]: true };
    }
  }, {});
};
