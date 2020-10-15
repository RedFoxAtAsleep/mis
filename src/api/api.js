import demzClient from './demz/api.js'
import vtClient from './vt/api'
// import {Message, Notification} from "element-ui";

export const readLinks = function (data) {
    // 单纯的Ajax请求，没有校验，没有注册回调，...
    demzClient.readLinks(data)
};

export const post = function (data) {
    // 单纯的Ajax请求，没有校验，没有注册回调，...
    demzClient.post(data)
};

export const simpleQuery = function (data){
    return vtClient.simpleQuery(data).then().catch()
}

export const submitHashList = function (data, config) {
    return vtClient.submitHashList(data, config).then(response=>{ console.log('response', response);}).catch()
}

export default {
    readLinks,
    post,
    simpleQuery,
    submitHashList,
}
