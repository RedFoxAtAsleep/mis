import request from './request'

const readLinks = function (data ) {
    // {'filter':{}, 'offset': 0, 'limit': 0, 'order':['']}
    const url = 'someapp/links';
    return request.post( url, data );
};


const post = function (data, setting) {
    // {'filter':{}, 'offset': 0, 'limit': 0, 'order':['']}
    const url = 'someapp/post';
    return request.post( url, data, setting );
};

export default {
    readLinks,
    post
}
