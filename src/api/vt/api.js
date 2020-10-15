import request from './request'

const simpleQuery = function (data ) {
    const url = 'query/';
    return request.post( url, data );
};


const submitHashList = function (data, config) {
    // {'filter':{}, 'offset': 0, 'limit': 0, 'order':['']}
    const url = 'vt/samples/download/';
    console.log(data);
    console.log(config);
    return request.post( url, data , config);
};


export default {
    simpleQuery,
    submitHashList
}
