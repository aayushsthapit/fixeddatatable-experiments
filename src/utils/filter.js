import * as constants from "../constants/dataTypes";
import { appTableConfig } from "../App";
export const filter = (list, filterStatus) => {
  return list.filter(listElement => {
    let testBoolean = true;
    Object.keys(filterStatus).map(colKey => {
      switch (appTableConfig[colKey].dataType) {
        case constants.STRING: {
          testBoolean =
            testBoolean &&
            (filterStatus[colKey]
              ? listElement[colKey]
                  .toString()
                  .toLowerCase()
                  .startsWith(filterStatus[colKey].toString().toLowerCase())
              : true);
          break;
        }

        case constants.NUMBER: {
          testBoolean =
            testBoolean &&
            (filterStatus[colKey].from
              ? listElement[colKey] >= filterStatus[colKey].from &&
                (filterStatus[colKey].to
                  ? listElement[colKey] <= filterStatus[colKey].to
                  : true)
              : true);
        }
        default: {
          break;
        }
      }
    });

    return testBoolean;
  });
};
