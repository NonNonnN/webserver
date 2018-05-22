//原生JS对流处理
const http=require('http');
const https=require('https');
class reptle {
    //url:string;
    constructor() {
    }
    //判断协议
    public index(url,next) {
        const re = /https/;
        const protocol = url.slice(0, 6);//判断协议1~7字符串
        if (re.test(protocol) === true) {
            this.gethttpsData(url,next);
        } else {
            this.gethttpData(url,next);
        }
    }

    private gethttpData(url,next) {
        let data = '';
        const req = http.request(url, (res) => {
            res.on("data", (chunk) => {
                data += chunk;
            });
            res.on('end', () => {
                const a=this.getphotoLinks(data);//如果添加正则就在这里添加判断来进行选择方
                next(a);
            });
        });
        req.end();
        req.on("error", (e) => {
            console.error(e)
        });
    }
    private gethttpsData(url,next) {
        let  data = '';
        const req = https.request(url, (res) => {
            res.on("data", (chunk) => {
                data += chunk;
            });
            res.on('end', () => {
                const a=this.getphotoLinks(data);
                next(a);
            });
        });
        req.on("error", (e) => {
            console.error(e)
        });
    }

    //筛选data获取的data字符串
    //3
    private getphotoLinks(data) {
        const re = /<img\b.*?(?:\>|\/>)/g;
        return data.match(re);
    }
}
module.exports=reptle;
