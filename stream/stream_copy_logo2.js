//这里就是一段拷贝的基本思路

// 数据流的读写
var fs = require('fs');

var readStream = fs.createReadStream('flowers.mp4');
var writeStream = fs.createWriteStream('1-stream.mp4');

readStream.on('data', function(chunk) {
    writeStream.write(chunk);
    //判断数据是否还在缓存区，如果在缓存区则先让readStream暂停，接着会调用drain方法
    if (writeStream.write(chunk) === false) {
        console.log('still cached');
        readStream.pause();
    }
});

readStream.on('end', function() {
    writeStream.end();
});
//drain方法主要是为了看数据是否已经全部写入到目标中，如果是的话，再启动readStream
writeStream.on('drain', function() {
    console.log('data drains');
    readStream.resume();
});
