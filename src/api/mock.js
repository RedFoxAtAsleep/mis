import Vue from "vue";
import axios from 'axios'
axios.defaults.baseURL = 'http://mockjs.com/api';
// 设置默认请求的url，添加端口号可以直接避免同源策略
Vue.prototype.$http = axios;

// 使用 Mock
const Mock = require('mockjs');
// const Random = Mock.Random; // 获取random对象，随机生成各种数据，具体请翻阅文档
const domain = 'http://mockjs.com/api'; // 定义默认域名，随便写
// const code = 200; // 返回的状态码
const data = Mock.mock({
    // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
    'list|1-10': [{
        // 属性 id 是一个自增数，起始值为 1，每次增 1
        'id|+1': 1
    }]
});
console.log(data);

const getRecordVtsSampleStatus = req => {
    console.log(req);

    // let kv = {};s
    // for(let record of records){
    //     kv[record['hash']] = record['status']
    // }
    return Mock.mock({
        'data|5':[{
            'hash': /[a-z0-9]{32}/,
            'status|1': ['success','fail','pending'],
        }]
    });
};
// Mock.mock(`${domain}/news`, 'post', produceNewsData);

const url = {
    getRecordVtsDownload: `${domain}/vts/download`,
    getRecordVtsSampleStatus: `${domain}/vts/type`,
};

Mock.mock(
    url.getRecordVtsDownload,
    'get',
    {
        'data|4':[{
            'id|+1': 1,
            'mail|+1':['zhaojinhui', 'caili', 'songyitian', 'qinweichao'],
            // 'hash|': /[a-z0-9]{32}/,
            'count|10-20': 1,
            'times|1-10':1,
        }]
    });
Mock.mock(url.getRecordVtsSampleStatus, 'get',getRecordVtsSampleStatus());

export default {};

// Mock.mock(rurl, rtype, template)关联url、http方法、模板或数据
// 在mock.js中挂载$http，则可在具体的组件中调用$http发起/请求
// 调用axios发起请求

