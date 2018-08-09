import React from "react";
import "../App.css";
import "rc-checkbox/assets/index.css";

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
        <div className="filter">
          <input
            placeholder="Search by Name"
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
        <div className="filter">
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
            From <input type="text" name="from" id="from" size="5" />
            To <input type="text" name="to" id="to" size="5" />
          </form>
        </div>
      );
    }

    case constant.COLLECTION: {
      return (
        <div className="filter">
          {filterStatus[colHeaderKey] ? (
            Object.keys(filterStatus[colHeaderKey]).map((category, key) => (
              <label key={key}>
                <input
                  type="checkbox"
                  checked={filterStatus[colHeaderKey][category]}
                  onChange={() => {
                    filterData(colHeaderKey, dataType, {
                      ...filterStatus,
                      [colHeaderKey]: {
                        ...filterStatus[colHeaderKey],
                        [category]: !filterStatus[colHeaderKey][category]
                      }
                    });
                  }}
                />
                {category}
                <br />
              </label>
            ))
          ) : (
            <div>Hello</div>
          )}
        </div>
      );
    }

    default: {
      break;
    }
  }
};
