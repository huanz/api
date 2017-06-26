const Excel = require('exceljs');
/**
 * @param sheets[] 
 * @param sheets[].name sheet name
 * @param sheets[].title 
 * @param sheets[].header[]
 * @param sheets[].rows[]  
 * @param sheets[].count 合计[column index]  
 */
module.exports = (sheets) => {
    let workbook = new Excel.Workbook();
    let sheetKey = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
    sheets.forEach(sheet => {
        let worksheet = workbook.addWorksheet(sheet.name, {
            properties: {
                defaultRowHeight: 25
            },
            pageSetup: {
                paperSize: 9,
                horizontalCentered: true,
                verticalCentered: true
            }
        });
        let columns = [];
        sheet.header.forEach((header, index) => {
            columns.push({
                key: `key${index}`,
                width: 15,
                style: {
                    font: {
                        size: 12,
                        name: '宋体'
                    },
                    alignment: {
                        horizontal: 'center',
                        vertical: 'middle'
                    }
                }
            });
        });

        worksheet.columns = columns;
        // 表格标题
        let sheetTitle = worksheet.addRow([sheet.title]);
        sheetTitle.height = 25;
        sheetTitle.font = {
            size: 18,
            name: '宋体'
        };
        worksheet.mergeCells(`A1:${sheetKey[sheet.header.length - 1]}1`);
        // 合计
        let count = null;
        if (Number.isInteger(sheet.count)) {
            count = 0;
        }

        // 表头
        sheet.rows.unshift(sheet.header);
        sheet.rows.forEach((rowData, index) => {
            let row = worksheet.addRow(rowData);
            row.height = 25;
            if (index && count !== null) {
                count += Number(rowData[sheet.count]);
            }
        });

        if (count !== null) {
            let rowData = ['合计'];
            rowData[sheet.count] = count;
            let row = worksheet.addRow(rowData);
            row.height = 25;
        }
    });
    return workbook;
};