/**
 * Created by chencz on 2016/12/10.
 */
//node通过http模块来了解http
var http=require('http');
http
    .createServer(function(req,res){
        res.writeHead(200,{'Content-Type':'text/plain'});
        res.write('Hello world');
        res.end();
    })
    .listen(2016);