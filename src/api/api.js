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
    return vtClient.simpleQuery(data)
};

export const submitHashList = function (data, config) {
    return vtClient.submitHashList(data, config)
};

export const submitHashListV2 = function (data, config) {
    return vtClient.submitHashListV2(data, config)
};

export const downloadPackage = function (config) {
    return vtClient.downloadPackage(config)  // promise
};

export const obj2table = function(obj, col_k, col_v){
    let rows = [];
    for(let k in obj){
        let tmp = {}
        tmp[col_k] = k;
        tmp[col_v] = obj[k]
        rows.push(tmp)
    }
    return rows
};

export default {
    readLinks,
    post,
    simpleQuery,
    submitHashList,
    submitHashListV2,
    downloadPackage,
    obj2table
}
