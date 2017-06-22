/**
 * @desc apis
 */
const fs = require('fs');
const path = require('path');
const request = require('request-promise-native');
const Excel = require('exceljs');

/**
 * @desc 节假日查询：http://www.easybots.cn/holiday_api.net
 */
exports.holiday = async(ctx, next) => {
    let res = await request.get('http://www.easybots.cn/api/holiday.php', {
        qs: ctx.query
    });
    if (res) {
        ctx.body = res;
    }
};

async function getXlsxTemplate() {
    const workbook = new Excel.Workbook();
    if (global.wb) {
        return global.wb;
    }
    const wb = await workbook.xlsx.readFile(path.join(__dirname, '..', 'config', 'template.xlsx'))
    if (wb) {
        global.wb = wb;
        return wb;
    }
}

/**
 * @desc 生成xlsx
 * @param ctx.body.name 表格
 */
exports.xlsx = async(ctx, next) => {
    let body = ctx.body;

    const wb = await getXlsxTemplate();

    // if (body.meals && body.meals.length) {

    // }
    // wb.eachSheet((worksheet, sheetId) => {
    //     console.log(sheetId);
    //     worksheet.getRow(i+2).values = row;
    //     worksheet.getCell("A"+(i+2)).style=worksheet.getCell('A2').style;
    //     worksheet.getCell("B"+(i+2)).style=worksheet.getCell('B2').style;
    //     worksheet.getCell("C"+(i+2)).style=worksheet.getCell('C2').style;
    //     worksheet.getCell("D"+(i+2)).style=worksheet.getCell('D2').style;
    //     worksheet.getCell("E"+(i+2)).style=worksheet.getCell('E2').style;
    //     worksheet.getCell("F"+(i+2)).style=worksheet.getCell('F2').style;
    // });

    // ctx.body = 'ff';
    //ctx.set('Content-disposition', `attachment; filename=${body.name}.xlsx`);
};