import Vue from "vue";
import axios from 'axios'
axios.defaults.baseURL = 'http://mockjs.com/api'; // 设置默认请求的url
Vue.prototype.$http = axios;

// 使用 Mock
const Mock = require('mockjs');
const Random = Mock.Random; // 获取random对象，随机生成各种数据，具体请翻阅文档
const domain = 'http://mockjs.com/api'; // 定义默认域名，随便写
const code = 200; // 返回的状态码
const data = Mock.mock({
    // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
    'list|1-10': [{
        // 属性 id 是一个自增数，起始值为 1，每次增 1
        'id|+1': 1
    }]
});
console.log(data);

// 随机生成文章数据
const postData = req => {
    console.log('req ', req);  // 请求体，用于获取参数
    let posts = [];  // 用于存放文章数据的数组
    for (let i = 0; i < 10; i++) {
        let post = {
            title: Random.csentence(10, 25), // 随机生成长度为10-25的标题
            author: Random.cname(), // 随机生成名字
            date: Random.date() + ' ' + Random.time() // 随机生成年月日 + 时间
        };
        posts.push(post)
    }
    // 返回状态码和文章数据posts
    return {
        code,
        posts
    }
};
Mock.mock(`${domain}/posts`, 'get', postData);


const produceNewsData = function () {
    let newsList = [];
    for (let i = 0; i < 20; i++) {
        let newNewsObject = {
            title: Random.ctitle(), //  Random.ctitle( min, max ) 随机产生一个中文标题，长度默认在3-7之间
            content: Random.cparagraph(), // Random.cparagraph(min, max) 随机生成一个中文段落，段落里的句子个数默认3-7个
            createdTime: Random.date() // Random.date()指示生成的日期字符串的格式,默认为yyyy-MM-dd；
        };
        newsList.push(newNewsObject)
    }

    return newsList
};

Mock.mock(`${domain}/news`, 'post', produceNewsData);


