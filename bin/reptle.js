//原生JS对流处理
var http = require('http');
var https = require('https');
var reptle = /** @class */ (function () {
    //url:string;
    function reptle() {
    }
    //判断协议
    reptle.prototype.index = function (url, next) {
        var re = /https/;
        var protocol = url.slice(0, 6); //判断协议1~7字符串
        if (re.test(protocol) === true) {
            this.gethttpsData(url, next);
        }
        else {
            this.gethttpData(url, next);
        }
    };
    reptle.prototype.gethttpData = function (url, next) {
        var _this = this;
        var data = '';
        var req = http.request(url, function (res) {
            res.on("data", function (chunk) {
                data += chunk;
            });
            res.on('end', function () {
                var a = _this.getphotoLinks(data); //如果添加正则就在这里添加判断来进行选择方
                next(a);
            });
        });
        req.end();
        req.on("error", function (e) {
            console.error(e);
        });
    };
    reptle.prototype.gethttpsData = function (url, next) {
        var _this = this;
        var data = '';
        var req = https.request(url, function (res) {
            res.on("data", function (chunk) {
                data += chunk;
            });
            res.on('end', function () {
                var a = _this.getphotoLinks(data);
                next(a);
            });
        });
        req.on("error", function (e) {
            console.error(e);
        });
    };
    //筛选data获取的data字符串
    //3
    reptle.prototype.getphotoLinks = function (data) {
        var re = /<img\b.*?(?:\>|\/>)/g;
        return data.match(re);
    };
    return reptle;
}());
module.exports = reptle;
