/**
 * @desc apis
 */
const fs = require('fs');
const PassThrough = require('stream').PassThrough;
const path = require('path');
const request = require('request-promise-native');
const Excel = require('exceljs');

/**
 * @desc 节假日查询：http://www.easybots.cn/holiday_api.net
 */
exports.holiday = async (ctx, next) => {
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
 */
exports.xlsx = async (ctx, next) => {
    let data = ctx.query.data;
    if (data) {
        try {
            let req = JSON.parse(data);
            if (req && req.meals && req.meals.length) {
                let workbook = new Excel.Workbook();
                let mealSheet = workbook.addWorksheet('加班餐费明细', {
                    properties: {
                        defaultRowHeight: 25
                    },
                    pageSetup: {
                        paperSize: 9,
                        horizontalCentered: true,
                        verticalCentered: true
                    }
                });
                mealSheet.columns = [
                    { key: 'no', width: 15, style: {font: { size: 12, name: '宋体' }, alignment:{ horizontal: 'center', vertical: 'middle'}}},
                    { key: 'date', width: 15,  style: {font: { size: 12, name: '宋体' }, alignment:{ horizontal: 'center', vertical: 'middle'}}},
                    { key: 'name', width: 15, style: {font: { size: 12, name: '宋体' }, alignment:{ horizontal: 'center', vertical: 'middle'}}},
                    { key: 'type', width: 15, style: {font: { size: 12, name: '宋体' }, alignment:{ horizontal: 'center', vertical: 'middle'}}},
                    { key: 'money', width: 15, style: {font: { size: 12, name: '宋体' }, alignment:{ horizontal: 'center', vertical: 'middle'}}},
                    { key: 'etc', width: 15 , style: {font: { size: 12, name: '宋体' }, alignment:{ horizontal: 'center', vertical: 'middle'}}}
                ];
                // 增加表头
                let header = mealSheet.addRow(['交通费明细单']);
                header.height = 25;
                header.font = {
                    bold: true
                };
                mealSheet.mergeCells('A1:F1');

                req.meals.forEach(meal => {
                    let row = mealSheet.addRow(meal);
                    row.height = 25;
                });

                const stream = new PassThrough();
                await workbook.xlsx.write(stream);
                ctx.body = stream;
                ctx.set('Content-disposition', `attachment; filename=${req.name}.xlsx`);
            }
        } catch (error) {

        }
    }
};