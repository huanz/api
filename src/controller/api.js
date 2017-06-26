/**
 * @desc apis
 */
const PassThrough = require('stream').PassThrough;
const request = require('request-promise-native');
const createXlsx = require('../utils/xlsx');

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

/**
 * @desc 生成xlsx
 */
exports.xlsx = async(ctx, next) => {
    let data = ctx.query.data;
    if (data) {
        try {
            let req = JSON.parse(data);
            if (req && req.meals && req.meals.length) {
                let sheets = [{
                    name: '加班餐费明细',
                    title: '加班餐费明细单',
                    header: ['发票序号', '加班时间', '用餐人员', '中餐/晚餐', '金额', '备注'],
                    rows: req.meals,
                    count: 4
                }];

                if (req.traffic && req.traffic.length) {
                    sheets.push({
                        name: '加班餐费明细',
                        title: '加班餐费明细单',
                        header: ['发票序号', '时间', '出发地', '目的地', '事由', '金额', '备注'],
                        rows: req.traffic
                    });
                }
                let workbook = createXlsx(sheets);
                let stream = new PassThrough();
                await workbook.xlsx.write(stream);
                ctx.body = stream;
                ctx.set('Content-disposition', `attachment; filename=${req.name}.xlsx`);
            }
        } catch (error) {

        }
    }
};