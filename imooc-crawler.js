/**
 * Created by chencz on 2016/12/10.
 */
//HTTP爬虫爬慕课网上的课程数据的页面源码并打印出来
var http=require('http');
var url="http://www.imooc.com/learn/348";
http.get(url, function (res) {
    var html="";
    res.on('data',function(data){
        html+=data;
    });
    res.on('end', function () {
        console.log(html);
    })
}).on('error',function(){
    console.log('课程信息获取出错！');
})