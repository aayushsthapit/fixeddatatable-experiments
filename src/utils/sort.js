export const sortListData = (list, colHeaderKey) => {
  let tempList = [...list];
  return tempList.sort((a1, a2) => {
    {
      if (a1[colHeaderKey] < a2[colHeaderKey]) return -1;
      if (a1[colHeaderKey] > a2[colHeaderKey]) return 1;
      return 0;
    }
  });
};
