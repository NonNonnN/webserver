const router=require('koa-router')();
const fs=require('fs');
const  fileManager=require('D:\\test\\webserver\\bin\\filemanager.js');
const reptle = require('D:\\test\\webserver\\bin\\reptle.js');
const fsManager=new fileManager();
const getphotoLinks=new reptle();
//主路径

router.get('/',async (ctx)=>{
    ctx.res.type='html';
    ctx.body=await fs.readFileSync('./static/dist/index.html','utf-8');
});

//获取文件夹名字文件数组
router.get('/readfs',async(ctx)=>{
    let i=ctx.request.query;
    let b=fsManager.fileName(i.path);
    //如有需求添加排序算法
    let x=b.reverse();
    ctx.response.type='json';
    ctx.response.body=x;
    console.log(i)
});
//获取图片链接
router.get('/getphotolinks',async(ctx)=>{
    const i=ctx.request.query;
    await getphotoLinks.index(i.url,(a)=>{
        console.log()
    });
});
//创建文件夹
router.get('/mkdirfs',async (ctx)=>{
    const a =ctx.request.query;
    const x=a.path;

});

//创建文件
router.get('/createDocument',async (ctx)=>{
    //创建文件失败发送false;
    let a=ctx.request.query;
    let x=a.path;
    fsManager.createDocument(x,async()=>{
        //有相同文档的处理方案
    })
});

//获取请求路径分发起验证访问路径分发路径
router.get('/requestpath',async(ctx)=>{
    const i=JSON.parse(ctx.request.query);
    if (typeof i=='Object'){
    }else{
        ctx.response.status=404;
    }
});


module.exports=router;
