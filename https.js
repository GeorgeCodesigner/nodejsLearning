/**
 * Created by chencz on 2016/12/14.
 */
/*搭建https服务器
* 这里还需要输入以下两行命令生成证书：
* 一、openssl genrsa 1024 > ssh_key.pem
* 二、openssl req -x509 -days 365 -new -key ssh_key.pem > ssh_cert.pem
* 接着按照提示输入证书相应的信息就行，然后运行node https.js,再在浏览器中打开https://localhost:8090
*/
var https=require('https');
var fs=require('fs');
var options={
    key:fs.readFileSync('ssh_key.pem'),
    cert:fs.readFileSync('ssh_cert.pem')
}
https
    .createServer(options,function(req,res){
        res.writeHead(200);
        res.end('Hello Nodejs');
    })
    .listen(8090);