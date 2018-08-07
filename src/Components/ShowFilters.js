import React from "react";
import * as constant from "../constants/dataTypes";
export const ShowFilters = ({
  filterData,
  colHeaderKey,
  dataType,
  filterStatus
}) => {
  switch (dataType) {
    case constant.STRING: {
      return (
        <div className="test">
          <input
            onChange={event => {
              filterData(colHeaderKey, dataType, {
                ...filterStatus,
                [colHeaderKey]: event.target.value
              });
            }}
          />
        </div>
      );
    }
    case constant.NUMBER: {
      return (
        <div className="test">
          <form
            onChange={event => {
              filterData(colHeaderKey, dataType, {
                ...filterStatus,
                [colHeaderKey]: {
                  ...filterStatus[colHeaderKey],
                  [event.target.name]: event.target.value
                }
              });
            }}
          >
            <input type="text" name="from" id="from" />
            <input type="text" name="to" id="to" />
          </form>
        </div>
      );
    }
    default: {
      break;
    }
  }
};
