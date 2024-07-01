import { useEffect, useState } from "react";
import StaticDataTable from "./components/StaticDataTable";
import MergeTagData from "./utils/MergeTagData";
import SetColumnDefs from "./utils/SetColumnDefs";
import SetDefaultTableSetting from "./utils/SetDefaultTableSetting";
import axios from "axios";
import "./assets/css/dataTableStyle.css";

function App() {
  const [columnDefs, setColumnDefs] = useState<any[]>([]);
  const [mergedTableData, setMergedTableData] = useState<any[]>([]);
  const [tableData, setTableData] = useState<any[]>([]);
  const [tableOption, setTableOption] = useState<any>({});
  const [userTag, setUserTag] = useState<any[]>([]);
  const [awsTag, setAwsTag] = useState<any[]>([]);
  const [defaultTableSettings, setDefaultTableSettings] = useState<any>({});

  useEffect(() => {
    async function fetchData() {
      const { data: tableData } = await axios(
        "http://localhost:5000/staticData"
      );
      const { data: tableOption } = await axios(
        "http://localhost:5000/staticSchema"
      );
      const { data: userTag } = await axios(
        "http://localhost:5000/staticTagUser"
      );
      const { data: awsTag } = await axios(
        "http://localhost:5000/staticTagAws"
      );

      setTableData(tableData);
      setDefaultTableSettings(SetDefaultTableSetting(tableOption));
      setTableOption(tableOption);
      setUserTag(userTag);
      setAwsTag(awsTag);
    }

    fetchData();
  }, []);

  useEffect(() => {
    if (
      !tableData.length ||
      !Object.keys(tableOption).length ||
      !Object.keys(userTag).length ||
      !Object.keys(awsTag).length
    ) {
      return;
    }

    const mergedColumnDefs = SetColumnDefs(tableOption, userTag, awsTag);
    setColumnDefs(mergedColumnDefs);

    const mergedData = MergeTagData(tableData, userTag, awsTag);
    setMergedTableData(mergedData);
  }, [tableData, tableOption, userTag, awsTag]);

  const saveEditedRow = async (datas: any[]) => {
    await axios({
      method: "put",
      url: "http://localhost:5000/staticTagUser",
      data: datas,
    });
  };

  if (!mergedTableData.length || !columnDefs.length) {
    return;
  }

  return (
    <>
      <div className="m-4">
        <StaticDataTable
          showSaveButton={true}
          datas={mergedTableData}
          columnDefs={columnDefs}
          defaultTableSetting={defaultTableSettings}
          tableHeight={tableOption.tableHeight}
          pagination={tableOption.pagination}
          paginationPageSize={tableOption.paginationPageSize}
          paginationPageSizeSelector={tableOption.paginationPageSizeSelector}
          saveCallback={saveEditedRow}
        >
          <p className="text-lg"></p>
        </StaticDataTable>
      </div>
    </>
  );
}

export default App;
