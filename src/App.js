import React, { Component } from "react";
import "./App.css";
import { Table, Column, Cell } from "fixed-data-table-2";
import "fixed-data-table-2/dist/fixed-data-table.css";
import { getData } from "./utils/http";
import { filter } from "./utils/filter";
import { ShowFilters } from "./Components/ShowFilters";
import * as constants from "./constants/dataTypes";
import { sortListData } from "./utils/sort";

const header = (colHeaderKey, dataType, label, filterData, filterStatus) => {
  return (
    <Cell
      onMouseEnter={() => {
        switch (dataType) {
          case "string": {
            break;
          }
          default: {
            break;
          }
        }
      }}
      onClick={() => {
        filterData(colHeaderKey, "sort", filterStatus);
      }}
    >
      <ShowFilters
        filterData={filterData}
        colHeaderKey={colHeaderKey}
        dataType={dataType}
        filterStatus={filterStatus}
      />
      {label}
    </Cell>
  );
};

export const appTableConfig = {
  id: { label: "ID", width: 50, header, dataType: constants.NUMBER },
  name: {
    label: "Name",
    width: 200,
    color: "red",
    header,
    dataType: constants.STRING
  }
};

class App extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      updatedData: [],
      config: appTableConfig,
      filterStatus: {}
    };
    this.onColumnResizeEndCallback = this.onColumnResizeEndCallback.bind(this);
    this.filterData = this.filterData.bind(this);
  }

  onColumnResizeEndCallback = (newColumnWidth, columnKey) => {
    this.setState({
      config: {
        ...this.state.config,
        [columnKey]: { ...this.state.config[columnKey], width: newColumnWidth }
      }
    });
  };
  componentWillMount = () => {
    getData().then(res => {
      let tempFilterStatus = {};
      Object.keys(appTableConfig).map(value => {
        tempFilterStatus = { ...tempFilterStatus, [value]: "" };
      });

      this.setState({
        data: res.data.data,
        updatedData: res.data.data,
        filterStatus: tempFilterStatus
      });
    });
  };

  filterData(colHeaderKey, filterType, filterStatus) {
    switch (filterType) {
      case "sort": {
        this.setState({
          updatedData: sortListData(this.state.updatedData, colHeaderKey),
          filterStatus
        });
        break;
      }

      default: {
        this.setState({
          updatedData: filter(this.state.data, filterStatus),
          filterStatus
        });
        break;
      }
    }
  }
  render() {
    return (
      <div className="test1">
        <Table
          rowHeight={50}
          rowsCount={this.state.updatedData.length}
          width={800}
          isColumnResizing={false}
          onColumnResizeEndCallback={this.onColumnResizeEndCallback}
          height={800}
          headerHeight={50}
          className="test1"
        >
          {Object.keys(appTableConfig).map(key => {
            let colConfig = appTableConfig[key];

            return (
              <Column
                key
                header={
                  colConfig.header ? (
                    colConfig.header(
                      key,
                      colConfig.dataType,
                      colConfig.label,
                      this.filterData,
                      this.state.filterStatus
                    )
                  ) : (
                    <Cell>{colConfig.label}</Cell>
                  )
                }
                isResizable={true}
                columnKey={key}
                cell={props => (
                  <Cell>{this.state.updatedData[props.rowIndex][key]}</Cell>
                )}
                width={this.state.config[key].width}
              />
            );
          })}
        </Table>
      </div>
    );
  }
}

export default App;
