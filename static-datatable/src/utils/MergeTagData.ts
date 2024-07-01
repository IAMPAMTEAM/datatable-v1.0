export default function MergeTagData(
  tableDatas: any[],
  ...tagDataArray: any[]
) {
  const mergedTableDatas = tableDatas;

  tagDataArray.forEach((tagData) => {
    const keyColumn = tagData.keyColumn;
    const data = tagData.tagData;

    for (const key in data) {
      mergedTableDatas.forEach((tableData, index) => {
        if (tableData[keyColumn] === key) {
          mergedTableDatas[index] = { ...tableData, ...data[key] };
        }
      });
    }
  });

  return mergedTableDatas;
}
