/**
 * Created by chencz on 2016/12/10.
 */
//HTTP爬虫爬慕课网上的课程数据的页面源码并提取出有用的信息
var http=require('http');
var cheerio=require('cheerio');
var url="http://www.imooc.com/learn/348";
//定义filterChapters函数
function filterChapters(html){
    var $=cheerio.load(html);//加载爬下来的网页内容
    var chapters=$(".chapter");
    //[{
    //    chapterTitle:"",
    //    videos:[
    //        title:"",
    //        id:""
    //    ]
    //}]
    var courseData=[];
    //开始遍历每一章节的内容
    chapters.each(function (item) {
        var chapter=$(this);
        var chapterTitle=chapter.find('strong').text();
        var videos=chapter.find('.video').children('li');
        var chapterData={
            chapterTitle:chapterTitle,
            videos:[]
        };
        //开始遍历videos的内容
        videos.each(function(item){
            var video=$(this).find(".J-media-item");
            var title=video.text();
            var id=video.attr("href").split('video/')[1];
            chapterData.videos.push({
                title:title,
                id:id
            });
        })
        courseData.push(chapterData);
    });
    return courseData;
}
//定义printCourseInfo函数
function printCourseInfo(courseData){
    courseData.forEach(function(item){
        console.log(item.chapterTitle+'\n');
        item.videos.forEach(function(video){
            console.log('【'+video.id+'】'+video.title+'\n');
        })
    })
}
http.get(url, function (res) {
    var html="";
    res.on('data',function(data){
        html+=data;
    });
    res.on('end', function () {
        var courseData=filterChapters(html);
        printCourseInfo(courseData);
    })
}).on('error',function(){
    console.log('课程信息获取出错！');
})