export default function SetColumnDefs(tableOption: any, userTag: any, awsTag: any) {
  const mergedColumnDefs: any[] = [];

  const columnDefsArray: any[] = [tableOption.columnDefs, userTag.tagColumnDefs, awsTag.tagColumnDefs];

  // Sum Column Defs
  columnDefsArray.forEach((columnDefs) => {
    columnDefs.forEach((columnDef: any) => {
      mergedColumnDefs.push(columnDef);
    });
  });

  // Add Editable Option
  tableOption.editableColumn.forEach((editableColumn: any[]) => {
    mergedColumnDefs.forEach((columnDefs: any, index) => {
      if (columnDefs['field'] && columnDefs['field'] === editableColumn) {
        mergedColumnDefs[index]['editable'] = true;
        mergedColumnDefs[index]['headerClass'] = 'editable-header';
      } else if (columnDefs['children']) {
        columnDefs['children'].forEach((childColumnDefs: any, childIndex: number) => {
          if (childColumnDefs['field'] && childColumnDefs['field'] === editableColumn) {
            mergedColumnDefs[index]['children'][childIndex]['editable'] = true;
            mergedColumnDefs[index]['children'][childIndex]['headerClass'] = 'editable-header';
          }
        });
      }
    });
  });

  // add Column width Option
  tableOption.columnWidth.forEach((columnWidth: any) => {
    mergedColumnDefs.forEach((columnDefs: any, index) => {
      if (columnDefs['field'] && columnDefs['field'] === Object.keys(columnWidth)[0]) {
        mergedColumnDefs[index]['width'] = columnWidth[Object.keys(columnWidth)[0]];
      } else if (columnDefs['children']) {
        columnDefs['children'].forEach((childColumnDefs: any, childIndex: number) => {
          if (childColumnDefs['field'] && childColumnDefs['field'] === Object.keys(columnWidth)[0]) {
            mergedColumnDefs[index]['children'][childIndex]['width'] = columnWidth[Object.keys(columnWidth)[0]];
          }
        });
      }
    });
  });

  // add Column maxWidth Option
  tableOption.columnMaxWidth.forEach((columnWidth: any) => {
    mergedColumnDefs.forEach((columnDefs: any, index) => {
      if (columnDefs['field'] && columnDefs['field'] === Object.keys(columnWidth)[0]) {
        mergedColumnDefs[index]['maxWidth'] = columnWidth[Object.keys(columnWidth)[0]];
      } else if (columnDefs['children']) {
        columnDefs['children'].forEach((childColumnDefs: any, childIndex: number) => {
          if (childColumnDefs['field'] && childColumnDefs['field'] === Object.keys(columnWidth)[0]) {
            mergedColumnDefs[index]['children'][childIndex]['maxWidth'] = columnWidth[Object.keys(columnWidth)[0]];
          }
        });
      }
    });
  });

  // Set Cell Style (fontSize)
  tableOption.columnFontSize.forEach((columnFontSize: any) => {
    mergedColumnDefs.forEach((columnDefs: any, index) => {
      if (columnDefs['field'] && columnDefs['field'] === Object.keys(columnFontSize)[0]) {
        const cellStyle = {
          fontSize: columnFontSize[Object.keys(columnFontSize)[0]],
        };
        mergedColumnDefs[index]['cellStyle'] = cellStyle;
      } else if (columnDefs['children']) {
        columnDefs['children'].forEach((childColumnDefs: any, childIndex: number) => {
          if (childColumnDefs['field'] && childColumnDefs['field'] === Object.keys(columnFontSize)[0]) {
            const cellStyle = {
              fontSize: columnFontSize[Object.keys(columnFontSize)[0]],
            };
            mergedColumnDefs[index]['children'][childIndex]['cellStyle'] = cellStyle;
          }
        });
      }
    });
  });

  // Set Cell Style (fontColor)
  tableOption.columnFontColor.forEach((columnFontColor: any) => {
    mergedColumnDefs.forEach((columnDefs: any, index) => {
      if (columnDefs['field'] && columnDefs['field'] === Object.keys(columnFontColor)[0]) {
        columnDefs['cellStyle'] = Object.assign({}, columnDefs['cellStyle'], {
          color: columnFontColor[Object.keys(columnFontColor)[0]],
        });
      } else if (columnDefs['children']) {
        columnDefs['children'].forEach((childColumnDefs: any, childIndex: number) => {
          if (childColumnDefs['field'] && childColumnDefs['field'] === Object.keys(columnFontColor)[0]) {
            mergedColumnDefs[index]['children'][childIndex]['cellStyle'] = Object.assign({}, childColumnDefs['cellStyle'], {
              color: columnFontColor[Object.keys(columnFontColor)[0]],
            });
          }
        });
      }
    });
  });

  // Set Cell Style (columnHeaderBackgroundColor)
  tableOption.columnHeaderBackgroundColor.forEach((columnHeaderBackgroundColor: any) => {
    mergedColumnDefs.forEach((columnDefs: any, index) => {
      if (columnDefs['field'] && columnDefs['field'] === Object.keys(columnHeaderBackgroundColor)[0]) {
        const headerClass = 'color-' + columnHeaderBackgroundColor[Object.keys(columnHeaderBackgroundColor)[0]];
        mergedColumnDefs[index]['headerClass'] = headerClass;
      } else if (columnDefs['children']) {
        columnDefs['children'].forEach((childColumnDefs: any, childIndex: number) => {
          if (childColumnDefs['field'] && childColumnDefs['field'] === Object.keys(columnHeaderBackgroundColor)[0]) {
            const headerClass = 'color-' + columnHeaderBackgroundColor[Object.keys(columnHeaderBackgroundColor)[0]];
            mergedColumnDefs[index]['children'][childIndex]['headerClass'] = headerClass;
          }
        });
      }
    });
  });

  // Set Cell Style (columnBackgroundColor)
  tableOption.columnBackgroundColor.forEach((columnBackgroundColor: any) => {
    mergedColumnDefs.forEach((columnDefs: any, index) => {
      if (columnDefs['field'] && columnDefs['field'] === Object.keys(columnBackgroundColor)[0]) {
        columnDefs['cellStyle'] = Object.assign({}, columnDefs['cellStyle'], {
          backgroundColor: columnBackgroundColor[Object.keys(columnBackgroundColor)[0]],
        });
      } else if (columnDefs['children']) {
        columnDefs['children'].forEach((childColumnDefs: any, childIndex: number) => {
          if (childColumnDefs['field'] && childColumnDefs['field'] === Object.keys(columnBackgroundColor)[0]) {
            mergedColumnDefs[index]['children'][childIndex]['cellStyle'] = Object.assign({}, childColumnDefs['cellStyle'], {
              backgroundColor: columnBackgroundColor[Object.keys(columnBackgroundColor)[0]],
            });
          }
        });
      }
    });
  });

  // Set cell Style according to value (Background Color or Font Color)
  tableOption.cellValueColor.forEach((cellValueColor: any) => {
    if (cellValueColor['type'] === 'Background') {
      mergedColumnDefs.forEach((columnDefs: any, index) => {
        cellValueColor['columns'].forEach((column: any) => {
          if (columnDefs['field'] && columnDefs['field'] === column) {
            mergedColumnDefs[index] = Object.assign({}, columnDefs, {
              cellStyle: (params: any) => {
                return {
                  backgroundColor: cellValueColor['value'][params.value],
                };
              },
            });
          } else if (columnDefs['children']) {
            columnDefs['children'].forEach((childColumnDefs: any, childIndex: number) => {
              if (childColumnDefs['field'] && childColumnDefs['field'] === column) {
                mergedColumnDefs[index]['children'][childIndex] = Object.assign({}, childColumnDefs, {
                  cellStyle: (params: any) => {
                    return {
                      backgroundColor: cellValueColor['value'][params.value],
                    };
                  },
                });
              }
            });
          }
        });
      });
    } else if (cellValueColor['type'] === 'FontColor') {
      mergedColumnDefs.forEach((columnDefs: any, index) => {
        cellValueColor['columns'].forEach((column: any) => {
          if (columnDefs['field'] && columnDefs['field'] === column) {
            mergedColumnDefs[index] = Object.assign({}, columnDefs, {
              cellStyle: (params: any) => {
                return {
                  color: cellValueColor['value'][params.value],
                };
              },
            });
          } else if (columnDefs['children']) {
            columnDefs['children'].forEach((childColumnDefs: any, childIndex: number) => {
              if (childColumnDefs['field'] && childColumnDefs['field'] === column) {
                mergedColumnDefs[index]['children'][childIndex] = Object.assign({}, childColumnDefs, {
                  cellStyle: (params: any) => {
                    return {
                      color: cellValueColor['value'][params.value],
                    };
                  },
                });
              }
            });
          }
        });
      });
    }
  });

  return mergedColumnDefs;
}
