export default function SetTableSetting(tableOption: any) {
  const defaultColDef = tableOption.defaultColDef;
  const autoSizeStrategy = tableOption.autoSizeStrategy;

  return {
    defaultColDef,
    autoSizeStrategy,
  };
}
