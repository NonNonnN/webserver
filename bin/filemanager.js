var fs = require('fs');
var path = require('path');
var fileManager = /** @class */ (function () {
    function fileManager() {
        this.path = 'D:\\test\\webserver\\user\\';
    }
    //读取文件名返回数组
    //name为JSON对象
    fileManager.prototype.fileName = function (name) {
        if (typeof name === 'object') {
            var fileName = fs.readdirSync(this.path + "\\" + name.join("\\"));
            return fileName;
        }
        else {
            var fileName = fs.readdirSync(this.path + "\\" + name);
            return fileName;
        }
    };
    //创建文件夹//当前路径
    fileManager.prototype.mkdirFile = function (name, next) {
        if (typeof name === "string") {
            fs.mkdir(this.path + "\\" + name.join('//'), function (err) {
                console.error(err);
            });
            next();
        }
        else {
            fs.mkdir(this.path + "\\" + name, function (err) {
                console.error(err);
            });
            next();
        }
    };
    fileManager.prototype.createDocument = function (name, next) {
        var _this = this;
        this.fileName(name, function (fsname) {
            for (var i = 0; i < fsname.length; i++) {
                if (fsname[i] === name) {
                    next(); //如有相同的执行回调函数
                }
                else {
                    fs.appendFileSync(_this.path, name);
                }
            }
        });
    };
    //移除文件，在windows会出错
    fileManager.prototype.removeDocument = function (name, next) {
        fs.rmdirSync(name, function () {
            next();
        });
    };
    ;
    //修改文件名
    fileManager.prototype.renameDoucment = function (name, next) {
        fs.rename();
    };
    //用户访问文件路径
    //pathname 预测为数组
    fileManager.prototype.accessPath = function (name, next) {
        var a = name.join('//');
        fs.existsSync("this.path" + a);
        next();
    };
    return fileManager;
}());
module.exports = fileManager;
