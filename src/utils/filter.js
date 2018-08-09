import * as constants from "../constants/dataTypes";
import { appTableConfig } from "../App";
export const filter = (list, filterStatus) => {
  return list.filter(listElement => {
    let listElementApproveBoolean = true;
    Object.keys(filterStatus).forEach(colKey => {
      switch (appTableConfig[colKey].dataType) {
        case constants.STRING: {
          listElementApproveBoolean =
            listElementApproveBoolean &&
            (filterStatus[colKey]
              ? listElement[colKey]
                  .toString()
                  .toLowerCase()
                  .startsWith(filterStatus[colKey].toString().toLowerCase())
              : true);
          break;
        }

        case constants.NUMBER: {
          listElementApproveBoolean =
            listElementApproveBoolean &&
            (filterStatus[colKey].from
              ? listElement[colKey] >= filterStatus[colKey].from &&
                (filterStatus[colKey].to
                  ? listElement[colKey] <= filterStatus[colKey].to
                  : true)
              : true);
          break;
        }

        case constants.COLLECTION: {
          listElementApproveBoolean =
            listElementApproveBoolean &&
            filterStatus[colKey][listElement[colKey].toLowerCase()];

          break;
        }

        default: {
          break;
        }
      }
    });

    return listElementApproveBoolean;
  });
};
