/**
 * Created by chencz on 2016/12/11.
 */
//request函数模拟慕课网评论功能
var http=require('http');
var queryString=require('querystring');
var postData=queryString.stringify({
    'content':"我是打酱油的",
    'mid':'8837'
});
var options={
    hostname:'www.imooc.com',
    port:80,
    path:'/course/docomment',
    method:'POST',
    headers:{
         'Accept':'application/json, text/javascript, */*; q=0.01',
         'Accept-Encoding':'gzip, deflate',
         'Accept-Language':'zh-CN,zh;q=0.8,en;q=0.6',
         'Connection':'keep-alive',
         'Content-Length':postData.length,
         'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8',
         'Cookie':'imooc_uuid=5deed866-5cb9-4070-a82e-c114a6de4cf0; imooc_isnew_ct=1461422892; bdshare_firstime=1476502997720; loginstate=1; apsid=NiNjk5MThhOTY1MzY5OTBjYzFkZWY5NDUzMTY1MjYAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMjg2ODI5NgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABjaGVuY2hhb3poaWJ1YWFAMTYzLmNvbQAAAAAAAAAAAGQ1NThlY2Y4YWQ0ODJiYTFhNTJiYzhjMGQxMzIwY2JheHEoWHhxKFg%3DZW; last_login_username=chenchaozhibuaa%40163.com; PHPSESSID=6umaub5q6l0fcg202g92gii9d5; jwplayer.qualityLabel=é«æ¸; IMCDNS=0; Hm_lvt_f0cfcccd7b1393990c78efdeebff3968=1481355797,1481355937,1481357289,1481431442; Hm_lpvt_f0cfcccd7b1393990c78efdeebff3968=1481463747; imooc_isnew=2; cvde=584cd99119644-58',
         'Host':'www.imooc.com',
         'Origin':'http://www.imooc.com',
         'Referer':'http://www.imooc.com/video/8837',
         'User-Agent':'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/50.0.2661.102 Safari/537.36',
         'X-Requested-With':'XMLHttpRequest'
    }
};


var req=http.request(options,function(res){
    console.log('status:'+res.statusCode);
    console.log('headers:'+JSON.stringify(res.headers));

    res.on('data', function (chunk) {
        console.log(Buffer.isBuffer(chunk));
        console.log(typeof chunk);
    })
    res.on('end', function () {
       console.log("评论完毕！");
    })
});

req.on('error', function (e) {
    console.log("Error:"+ e.message);
})
req.write(postData);
req.end();

