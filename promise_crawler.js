/**
 * Created by chencz on 2016/12/14.
 */
/**
 * Created by chencz on 2016/12/10.
 */
//HTTP爬虫爬慕课网上的课程数据的页面源码并提取出有用的信息
var http=require('http');
var Promise=require('bluebird');//较新版本的node内置Promise这个函数
var cheerio=require('cheerio');
var baseUrl="http://www.imooc.com/learn/";
var videoIds=[348,259,197,134,75,637,728];
//定义filterChapters函数
function filterChapters(html){
    var $=cheerio.load(html);//加载爬下来的网页内容
    var chapters=$(".chapter");
    var title=$(".path span").text().trim();//课程名称
    var number=parseInt($($(".static-item span")[3]).text().trim(),10);
    //coursesData = {
    //    title:title,
    //    number:number,
    //    videos:[{
    //    chapterTitle:"",
    //    videos:[
    //        title:"",
    //        id:""
    //        ]
    //    }]
    //}
    var coursesData={
        title:title,
        number:number,
        videos:[]
    }

    //开始遍历每一章节的内容
    chapters.each(function (item) {
        var chapter=$(this);
        var chapterTitle=chapter.find('strong').text().trim();
        var videos=chapter.find('.video').children('li');
        var chapterData={
            chapterTitle:chapterTitle,
            videos:[]
        };
        //开始遍历videos的内容
        videos.each(function(item){
            var video=$(this).find(".J-media-item");
            var title=video.text().trim();
            var id=video.attr("href").split('video/')[1];
            chapterData.videos.push({
                title:title,
                id:id
            });
        })
        coursesData.videos.push(chapterData);
    });
    return coursesData;
}
//定义printCourseInfo函数
function printCourseInfo(coursesData){
    //先把所有的课程名称打印出来
    coursesData.forEach(function(courseData){
        console.log(courseData.number+' 人学过 '+courseData.title+'\n');
    })
    //再一个课程一个课程打印里面的信息
    coursesData.forEach(function(courseData){
        console.log('### '+courseData.title+'\n')
        courseData.videos.forEach(function (item) {
            console.log(item.chapterTitle+'\n');
            item.videos.forEach(function(video){
                console.log('【'+video.id+'】'+video.title+'\n');
            })
        })
    })
}
//Promise来爬取页面，返回页面的html
function getPageAsync(url){
    return new Promise(function(resolve,reject){
        console.log("正在爬取："+url);
        http.get(url, function (res) {
            var html="";
            //爬取数据
            res.on('data',function(data){
                html+=data;
            });
            //数据爬取完毕
            res.on('end', function () {
                resolve(html);
            });
        }).on('error',function(e){ //爬取过程出错的处理
            reject(e);
            console.log('课程信息获取出错！');
        })
    })
}
//fetchCourseArray里面储存着要爬取的各个课程的Promise对象
var fetchCourseArray=[];

videoIds.forEach(function(id){
    fetchCourseArray.push(getPageAsync(baseUrl+id))
})

Promise
    .all(fetchCourseArray)
    .then(function (pages) {
        var coursesData =[];
        pages.forEach(function (html) {
            var courses=filterChapters(html);
            coursesData.push(courses);
        })
        /*对课程的学习人数数量进行从大到小的排序,里面的匿名函数是比较函数：
        * 若a.number小于b.number，在排序后的数组中a应该出现在b之后，则返回一个大于 0 的值；
        * 若a.number大于b.number，在排序后的数组中a应该出现在b之前，则返回一个小于 0 的值；
        * 若a.number等于b.number，则返回0。*/
        coursesData.sort(function (a,b) {
            return a.number < b.number
        })
        printCourseInfo(coursesData);
    })

