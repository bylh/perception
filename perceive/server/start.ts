
import http from 'http';
import express from 'express';
import cors from 'cors';

(async function main() {

    let app = express();
    let httpServer = http.createServer(app);
    const corsOptions = {
        /* 注意：https下 不能同时设置origin为*和credentials: true，这样不安全，http下可以设置，但不推荐 */
        origin: new RegExp('[a-zA-z]+://[^\s]*'),
        // origin: ['https://bylh.top'],
        credentials: true // 设置允许跨域访问默认是拒绝接收浏览器发送的cookie，这里设置允许
    }
    app.use(cors(corsOptions)); // 解决跨域访问的问题
    // app.use('/', (req, res, next) => {
    // });
    app.get('/', (req: express.Request, res: express.Response) => {
        res.send('hello');
    });
    app.get('/about', about);

    app.post('/download', (req: express.Request, res: express.Response) => {
        
    });
   
    // 启动监听

    httpServer.listen(4200);
    if (process.send != null) process.send('ready');

    console.log('监听http 4200端口');

    process.on('SIGINT', async () => {  // 保存log后退出
        process.exit(); // 程序结束
    });
})();

async function about(req: express.Request, res: express.Response) {
    res.status(200).send('this is proxy');
}
