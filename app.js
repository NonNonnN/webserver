const koa=require('koa');
const serve=require('koa-static');
const koaloger=require('koa-logger');
const bodyParser=require('koa-bodyparser');
const router=require('koa-router')();
const cors = require('koa2-cors');

const indexRouter=require('D:\\test\\webserver\\router\\index.js');

const app=new koa();
    app.use(bodyParser());
    app.use(koaloger());
    app.use(cors({
    origin: (ctx)=>{
        if (ctx.url === '/test') {
            return "*";
        }
        return 'http://localhost:8080';
    },
    exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
    maxAge: 5,
    credentials: true,
    allowMethods: ['GET', 'POST', 'DELETE'],
    allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
}));
    app.use(indexRouter.routes());
    app.use(serve(__dirname+'/static/dist'));
    app.use(router.routes());
    app.listen(8000,()=>{
                console.log('http//127.0.0.1:8000')
    });
