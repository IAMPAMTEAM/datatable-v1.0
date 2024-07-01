import { AgGridReact } from "ag-grid-react";
import {
  ColDef,
  SizeColumnsToContentStrategy,
  SizeColumnsToFitGridStrategy,
  SizeColumnsToFitProvidedWidthStrategy,
} from "ag-grid-community";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";

import { ReactNode, useCallback, useMemo, useRef } from "react";

interface IDataTable {
  children: ReactNode;
  showSaveButton?: boolean;
  datas: any[];
  columnDefs: any[];
  defaultTableSetting: any;
  tableHeight: number;
  pagination: boolean;
  paginationPageSize: number;
  paginationPageSizeSelector: number[];
  saveCallback?: (data: any[]) => void;
}

export default function StaticDataTable({
  children,
  showSaveButton,
  datas,
  columnDefs,
  defaultTableSetting,
  tableHeight,
  pagination,
  paginationPageSize,
  paginationPageSizeSelector,
  saveCallback,
}: IDataTable) {
  const autoSizeStrategy = useMemo<
    | SizeColumnsToFitGridStrategy
    | SizeColumnsToFitProvidedWidthStrategy
    | SizeColumnsToContentStrategy
  >(() => {
    return defaultTableSetting.autoSizeStrategy;
  }, [defaultTableSetting.autoSizeStrategy]);

  const autoGroupColumnDef = useMemo<ColDef>(() => {
    return {
      headerName: "Group",
      width: 120,
      cellRendererParams: {
        suppressCount: true,
      },
    };
  }, []);

  const gridRef = useRef<AgGridReact>(null);

  const onBtnCSVExport = useCallback(() => {
    gridRef.current!.api.exportDataAsCsv();
  }, []);

  const onBtnExcelExport = useCallback(() => {
    gridRef.current!.api.exportDataAsExcel();
  }, []);

  function onBtnSave() {
    if (!saveCallback) {
      return;
    }
    console.log(datas);
    saveCallback(datas);
  }

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        {children}
        <div className="flex">
          {showSaveButton && (
            <button
              onClick={onBtnSave}
              className="bg-[#6667AB] font-bold text-white px-2 py-2 rounded-md mr-2"
            >
              Save
            </button>
          )}
          <button
            onClick={onBtnCSVExport}
            className="bg-[#6667AB] font-bold text-white px-2 py-2 rounded-md mr-2"
          >
            Export CSV
          </button>
          <button
            onClick={onBtnExcelExport}
            className="bg-[#6667AB] font-bold text-white px-2 py-2 rounded-md"
          >
            Export Excel
          </button>
        </div>
      </div>
      <div style={{ height: tableHeight }} className={"ag-theme-quartz"}>
        <AgGridReact
          ref={gridRef}
          rowData={datas}
          columnDefs={columnDefs}
          defaultColDef={defaultTableSetting.defaultColDef}
          autoGroupColumnDef={autoGroupColumnDef}
          autoSizeStrategy={autoSizeStrategy}
          suppressAggFuncInHeader={true}
          pagination={pagination}
          paginationPageSize={paginationPageSize}
          paginationPageSizeSelector={paginationPageSizeSelector}
        />
      </div>
    </>
  );
}
