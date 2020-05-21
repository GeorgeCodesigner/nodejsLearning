var stream = require('stream');
var util = require('util');//工具类
//定制可读流
function ReadStream() {
    stream.Readable.call(this);//使得ReadStream具备调用可读流上下文的能力
}
//继承可读流的原型（第一个参数是要继承的目标函数，第一个参数是被继承的函数）
util.inherits(ReadStream, stream.Readable);
//重写ReadStream原型的私有read方法
ReadStream.prototype._read = function() {
    this.push('I');
    this.push('Love ');
    this.push('Imooc\n');
    this.push(null);
};
//定制可写流
function WritStream() {
    stream.Writable.call(this);
    this._cached = new Buffer('');
}
util.inherits(WritStream, stream.Writable);
WritStream.prototype._write = function(chunk, encode, cb) { //cb是回调函数
    console.log(chunk.toString());
    cb();
};
//定制转换流
function TransformStream() {
    stream.Transform.call(this);
}
util.inherits(TransformStream, stream.Transform);
//需要重写TransformStream原型的两个私有方法
TransformStream.prototype._transform = function(chunk, encode, cb) {
    this.push(chunk);
    cb();
};
TransformStream.prototype._flush = function(cb) {
    this.push('Oh yeah!');//对读到的内容进行额外的定制处理（加上Oh yeah!的字符串）
    cb();
};

var rs = new ReadStream();
var ws = new WritStream();
var ts = new TransformStream();

rs.pipe(ts).pipe(ws);
