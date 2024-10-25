import React from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import "./datatables.css";
import Loading from "../loading/Loading";
import { ifArray, ifObject } from "../../utils/TypeofVariable";
import { filterImage, isArray } from "../../utils/Functions";
import { dateYYYYMMDDtoDDMMYYYY } from "../../utils/Dateformat";

const Datatables = ({
  tabHeader,
  tabField,
  isFetching,
  tabValue,
  isError,
  error,
  headerLabel,
  paginator,
  selected,
  selectedItems,
  onSelected,
  rowNubmer,
  dropPage,
  className = "",
  actionsTables = () => {},
}) => {
  const dataColumn = [];
  for (var i = 0; i < tabHeader?.length; i++) {
    tabField && dataColumn.push({ header: tabHeader[i], field: tabField[i] });
  }

  const dataInTable = () => {
    if (isFetching) {
      return (
        <div className="flex items-center justify-center">
          <Loading />
        </div>
      );
    } else if (isError) {
      return <p className="text-center">{error}</p>;
    } else {
      return <p className="text-center">Aucun enregistrement</p>;
    }
  };

  const bodyFilter = (field, rowData) => {
    if (field === "action") {
      return actionsTables(rowData);
    } else if (field.includes("date") && field !== "date_bareme") {
      return <span>{dateYYYYMMDDtoDDMMYYYY(rowData[field])}</span>;
    } else if (isArray(field)) {
      return getValueByPath(rowData, field);
    } else if (field.includes("image")) {
      return (
        <img
          src={filterImage(rowData[field])}
          alt=""
          className="w-13 h-13 rounded-full object-cover border-[3px] border-zinc-300"
        />
      );
    } else {
      return rowData[field];
    }
  };

  function getValueByPath(obj, path) {
    if (obj.path === null) return "";
    let current = obj;
    for (const key of path) {
      if (current[key] === undefined) {
        return undefined;
      }
      if (current[key] === null) {
        return "aucun";
      }
      current = current[key];
    }

    return current;
  }

  return (
    <DataTable
      header={headerLabel}
      value={isFetching ? [] : tabValue}
      paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
      dataKey="id"
      paginator={paginator === false ? false : true}
      emptyMessage={dataInTable}
      className={` datatable-responsive mt-3 ${className}`}
      currentPageReportTemplate="{totalRecords} enregistrement"
      rows={rowNubmer ? rowNubmer : 100}
      rowsPerPageOptions={dropPage ? [5, 10, 15, 20] : ""}
      size="small"
      selection={selected && selectedItems}
      onSelectionChange={(e) => {
        onSelected(e.value);
      }}
    >
      {selected && (
        <Column selectionMode="single" headerStyle={{ width: "3em" }}></Column>
      )}
      {dataColumn.map((value, index) => {
        return (
          <Column
            align="left"
            key={index}
            field={value.field}
            header={value.header}
            style={{ textAlign: "left" }}
            body={(rowData) => bodyFilter(value.field, rowData)}
          />
        );
      })}
    </DataTable>
  );
};

export default Datatables;
