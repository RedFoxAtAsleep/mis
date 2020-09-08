import demzClient from './demz/api.js'
import vtClient from './vt/api'

export const readLinks = function (data) {
    // 单纯的Ajax请求，没有校验，没有注册回调，...
    demzClient.readLinks(data)
};

export const post = function (data) {
    // 单纯的Ajax请求，没有校验，没有注册回调，...
    demzClient.post(data)
};

export const listDownload = function (data){
    return vtClient.listDownload(data).then().catch()
}

export default {
    readLinks,
    post,
    listDownload,
}
