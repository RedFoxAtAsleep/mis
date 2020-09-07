import request from './request'

const readLinks = function (data ) {
    // {'filter':{}, 'offset': 0, 'limit': 0, 'order':['']}
    const url = 'someapp/links';
    return request.post( url, data );
};

export default {
    readLinks
}
