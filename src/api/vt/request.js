import axios from 'axios'
import {Loading, Message} from 'element-ui'
import {base_url} from "./config";

// 超时时间
// axios.defaults.timeout = 3000;

let loadingInstance;

// 全局错误提示
const toastError = function (text) {
    // Vue.prototype.$message.error( text );
    Message.error({
        message: text,
        showClose: true
    });
};

// 在发送请求之前做些什么
const axiosRequest = function (config) {
    loadingInstance = Loading.service();
    return config;
};

// 对请求错误做些什么，回调，Promise
const axiosRequestError = function (error) {
    toastError(error.message);
    loadingInstance.close();
    // Message.error({
    //   message: "请求错误"
    //   // message: error
    // });
    return Promise.reject(error);
};

// 对响应数据做点什么
const axiosResponse = function (response) {
    loadingInstance.close();
    // In axios, the response for a request contains the following information.
    // response schema:
    // { data: {}, status: 200, statusText: 'OK', headers: {}, config: {}, request: {}}
    // 自定义接口返回键值：code desc msg message
    if (response.data.code !== 0) {
        toastError(response.data.desc || response.data.msg || response.data.message);
    }
    if (response.data.code === 0 && response.data.message|| response.data.desc || response.data.msg) {
        Message.success(response.data.message|| response.data.desc || response.data.msg)
    }
    console.log(response)
    return response;
};

// 对响应错误做点什么，回调，Promise
const axiosResponseError = function (error) {
    loadingInstance.close();
    toastError(error.message);
    // Message.error({
    //   message: "响应失败"
    //   // message: error
    // });
    return Promise.reject(error);
};

let req = axios.create({
    baseURL: base_url
});

// 添加请求拦截器
req.interceptors.request.use(axiosRequest, axiosRequestError);

// 添加响应拦截器
req.interceptors.response.use(axiosResponse, axiosResponseError);

export default req;
