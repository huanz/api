'use strict';
const app = require('./app');
const PORT = parseInt(process.env.PORT || 3000);

app.listen(PORT, function (err) {
    console.log('Node app is running on port:', PORT);

    // 注册全局未捕获异常处理器
    process.on('uncaughtException', function (err) {
        console.error('Caught exception:', err.stack);
    });
    process.on('unhandledRejection', function (reason, p) {
        console.error('Unhandled Rejection at: Promise ', p, ' reason: ', reason.stack);
    });
});