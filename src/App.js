import React, { Component } from "react";
import "./App.css";
import { Table, Column, Cell } from "fixed-data-table-2";
import "fixed-data-table-2/dist/fixed-data-table.css";
import { getData } from "./utils/http";
import { filter } from "./utils/filter";
import { ShowFilters } from "./Components/ShowFilters";
import * as constants from "./constants/dataTypes";
import { sortListData } from "./utils/sort";
import { collectionListGenerator } from "./utils/collectionListGenerator";

const header = (colHeaderKey, dataType, label, filterData, filterStatus) => {
  return (
    <Cell
      className="header"
      onClick={() => {
        filterData(colHeaderKey, "sort", filterStatus);
      }}
    >
      {dataType ? (
        <ShowFilters
          filterData={filterData}
          colHeaderKey={colHeaderKey}
          dataType={dataType}
          filterStatus={filterStatus}
        />
      ) : (
        ""
      )}
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
  },
  category: {
    label: "Category",
    width: 200,
    header,
    dataType: constants.COLLECTION
  }
};

class App extends Component {
  constructor() {
    super();
    this.state = {
      disabled: false,
      data: [],
      updatedData: [],
      config: appTableConfig,
      filterStatus: {}
    };
    this.onColumnResizeEndCallback = this.onColumnResizeEndCallback.bind(this);
    this.filterData = this.filterData.bind(this);
    this.initializeFilterStatus = this.initializeFilterStatus.bind(this);
  }

  onColumnResizeEndCallback = (newColumnWidth, columnKey) => {
    this.setState({
      config: {
        ...this.state.config,
        [columnKey]: { ...this.state.config[columnKey], width: newColumnWidth }
      }
    });
  };

  initializeFilterStatus(data) {
    let tempFilterStatus = {};
    Object.keys(appTableConfig).map(value => {
      switch (appTableConfig[value].dataType) {
        case constants.COLLECTION: {
          tempFilterStatus = {
            ...tempFilterStatus,
            [value]: collectionListGenerator(data, value)
          };
          break;
        }

        default: {
          tempFilterStatus = { ...tempFilterStatus, [value]: "" };
          break;
        }
      }
    });
    return tempFilterStatus;
  }
  componentWillMount = () => {
    getData().then(res => {
      this.setState({
        data: res.data.data,
        updatedData: res.data.data,
        filterStatus: this.initializeFilterStatus(res.data.data)
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
      <Table
        rowHeight={50}
        rowsCount={this.state.updatedData.length}
        width={800}
        isColumnResizing={false}
        onColumnResizeEndCallback={this.onColumnResizeEndCallback}
        height={800}
        headerHeight={50}
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
    );
  }
}

export default App;
