import request from './request'

const simpleQuery = function (data ) {
    const url = 'query/';
    return request.post( url, data );
};


const submitHashList = function (data, config) {
    // {'filter':{}, 'offset': 0, 'limit': 0, 'order':['']}
    const url = 'vt/samples/download/';
    return request.post( url, data , config);
};

const submitHashListV2 = function (data, config) {
    // {'filter':{}, 'offset': 0, 'limit': 0, 'order':['']}
    const url = 'vts/require/';
    return request.post( url, data , config);
};


export default {
    simpleQuery,
    submitHashList,
    submitHashListV2
}
