import request from './request'

const listDownload = function (data ) {
    const url = 'vt/download/list';
    return request.post( url, data );
};


const commitDownload = function (data) {
    // {'filter':{}, 'offset': 0, 'limit': 0, 'order':['']}
    const url = 'vt/commit';
    return request.post( url, data );
};


const submitHashList = function (data, config) {
    // {'filter':{}, 'offset': 0, 'limit': 0, 'order':['']}
    const url = 'vt/group/download';
    console.log(data);
    console.log(config);
    return request.post( url, data , config);
};

export default {
    listDownload,
    commitDownload,
    submitHashList
}
