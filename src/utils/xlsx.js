const fs = require('fs');
const PassThrough = require('stream').PassThrough;
const Excel = require('exceljs');
/**
 * @param sheets[] 
 * @param sheets[].name sheet name
 * @param sheets[].title 
 * @param sheets[].header[]
 * @param sheets[].rows[]  
 */
module.exports = async(workbook, sheets) => {
    sheets.forEach(sheet => {
        let worksheet = workbook.addWorksheet('加班餐费明细', {});


    });


    let worksheet = workbook.addWorksheet('加班餐费明细', {
        properties: {
            defaultRowHeight: 25
        },
        pageSetup: {
            paperSize: 9,
            horizontalCentered: true,
            verticalCentered: true
        }
    });
};