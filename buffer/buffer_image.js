/**
 * Created by chencz on 2016/12/19.
 */
var fs=require('fs')
fs.readFile('logo.png',function(err,origin_buffer){
    console.log(Buffer.isBuffer(origin_buffer));//判断origin_buffer是不是Buffer对象 //true
    //将origin_buffer的utf8编码格式的文件写入logo_buffer.png
    fs.writeFile('logo_buffer.png',origin_buffer,function(err){
        if(err) console.log(err);
    })

    //将origin_buffer进行base64编码并转换成Buffer对象
    var base64Image=origin_buffer.toString('base64')//将Buffer对象origin_buffer转化为base64的字符串
    console.log(base64Image)//打印很长的一串东西
    var decodedImage=new Buffer(base64Image,'base64')//将字符串base64Image转化为base64的Buffer对象decodedImage
    console.log(Buffer.compare(origin_buffer,decodedImage))//比较两个Buffer对象 // 0

    //将origin_buffer的base64编码格式的Buffer对象decodedImage写入logo_decoded.png
    fs.writeFile('logo_decoded.png',decodedImage,function(err){
        if(err) console.log(err);
    })
})
