const path = require('path');
const body = require('koa-body');
const cors = require('kcors');
const helmet = require('koa-helmet');
const error = require('koa-json-error');

let middlewares = [
    body({
        formidable: {
            uploadDir: path.join(process.cwd(), 'upload')
        }
    }),
    cors(),
    helmet(),
    error({
        format: (err) => {
            return {
                status: err.status,
                msg: err.message,
                success: 2
            };
        }
    }),
];

module.exports = (app) => {
    if (app.env !== 'production') {
        middlewares.push(require('koa-logger')());
    }
    middlewares.forEach(middlewares => {
        app.use(middlewares);
    })
    return app;
};