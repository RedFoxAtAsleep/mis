import request from './request'
// import {base_url} from "./config";

const simpleQuery = function (data, config={}) {
    const url = 'query/';
    return request.post( url, data, config )
};

const submitHashList = function (data, config={}) {
    // {'filter':{}, 'offset': 0, 'limit': 0, 'order':['']}
    const url = 'vt/samples/download/';
    return request.post( url, data , config);
};

const submitHashListV2 = function (data, config={}) {
    // {'filter':{}, 'offset': 0, 'limit': 0, 'order':['']}
    const url = 'vts/require/';
    return request.post( url, data , config);
};

const downloadPackage = function (config={}) {
    // {'filter':{}, 'offset': 0, 'limit': 0, 'order':['']}

    const url = 'vts/download/';
    return request.get(url , config);
};

export default {
    simpleQuery,
    submitHashList,
    submitHashListV2,
    downloadPackage
}
