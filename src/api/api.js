import demzClient from './demz/api.js'

const readLinks = function (data) {
    // 单纯的Ajax请求，没有校验，没有注册回调，...
    demzClient.readLinks(data)
};

export default {
    readLinks,
}
