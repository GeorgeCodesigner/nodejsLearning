var fs = require('fs');
//var readStream = fs.createReadStream('stream_copy_logo.js');//createReadStream用来创建可读的stream
var readStream = fs.createReadStream('flowers.mp4');//n=21,通过计算：1317562／21／1024=61.27(KB/次)
var n = 0;//计数器主要用来记录整个流传递过程中一共触发了几次data事件
readStream
    //如果触发data事件，则会返回chunk(这是一个Buffer对象)
    .on('data', function(chunk) {
        n++;
        console.log('data emits');
        console.log(Buffer.isBuffer(chunk)); //true
        //console.log(chunk.toString('utf8')); // 这里会打印出stream_copy_logo.js里面的内容

        readStream.pause();//让readStream暂停
        //定时器会实现的功能是：3秒钟后readStream暂停结束，继续往下执行
        console.log('data pause');
        setTimeout(function() {
            console.log('data pause end');
            readStream.resume();
        }, 10);
    })
    //如果触发readable事件，说明文件是可读的
    .on('readable', function() {
        console.log('data readable');
    })
    //如果触发end事件，目标将不再可写
    .on('end', function() {
        console.log(n);
        console.log('data ends');
    })
    //stream传输结束将会触发close事件
    .on('close', function() {
        console.log('data close');
    })
    //异常出现会触发error事件
    .on('error', function(e) {
        console.log('data read error' + e);
    });
