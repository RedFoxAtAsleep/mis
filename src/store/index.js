import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);


// function setDefaultOption(optionMeta, index){
//     for(let option of Object.getOwnPropertyNames(optionMeta)){
//         console.log(option, optionMeta[option]);
//         if(!(option in index)){
//             index[option] = optionMeta[option]['default']
//         }
//     }
//     return index
// }


function indexWalker(indexConfig, indexStack, indices, route2index, optionMeta) {
    for (let item of indexConfig) {

        indexStack.push(item['name']);
        item['path'] = Object.assign([], indexStack);
        item['uid'] = indexStack.join('-');

        for(let option of Object.getOwnPropertyNames(optionMeta)){
            if(!(option in item)){
                item[option] = optionMeta[option]['default']
            }
        }

        if(item['type'] === 'link'){
            item['icon'] = 'el-icon-link'
        }
        else if(item['children'].length > 0){
            item['icon'] = 'el-icon-menu'
        }
        else{
            item['icon'] = 'el-icon-s-promotion'
        }

        if('route' in item){
            item['route']['uid'] = item['uid'];
            route2index[item['route']['name']] = item['uid']
        }

        if (item['children'].length === 0) {
            indices[item['uid']] = Object.assign({}, item);
        } else {
            indexWalker(item['children'], indexStack, indices, route2index, optionMeta);
        }

        indexStack.pop();
    }
    return [indexConfig, indices, route2index]
}


let optionMeta = {
    type: {default: '', type: 'string', },
    singleton: {default: true, type: 'boolean', },
    weight: {default: 0, type: 'integer', },
    show: {default: true, type: 'boolean', },
    roles: {default: [], type: 'list', },
    cache: {default: true, type: 'boolean', },
    loaded: {default: false, type: 'boolean', },
    children: {default: [], type: 'list', },
    src: {default: '', type: 'string', },
    icon: {default: '', type: 'string', },
};


let indexConfig = [
    {
        name: 'vt',
        label: 'VT样本下载',
        children: [
            {

                name: 'commit',
                label: '通知批量下载样本',
                route: {
                    'name': 'VtCommit'
                },
            },
            {

                name: 'commit-test',
                label: '测试页面：通知批量下载样本',
                route: {
                    'name': 'VtCommitTest'
                },
            },
            {
                name: 'query',
                label: 'VT信息查询',
                route: {
                    'name': 'VtQuery'
                },
            },
            {
                name: 'download',
                label: '下载批量样本包',
                route: {
                    'name': 'VtDownload',
                    'params': {
                        mail: 'all'
                    }
                },
            },
            {
                name: 'admin',
                label: '管理面板',
                children: [
                    {
                        name: 'admin',
                        label: 'Admin面板',
                        type: 'link',
                        src: 'http://10.51.10.68:8000/admin',
                    },
                    {
                        name: 'supervisor',
                        label: 'Supervisor面板',
                        type: 'link',
                        src: 'http://10.51.10.68:9001/',
                    },
                    {
                        name: 'flower',
                        label: 'Flower面板',
                        type: 'link',
                        src: 'http://10.51.10.68:5555/',
                    },
                    {
                        name: 'flower-test',
                        label: 'Flower面板',
                        type: 'iframe',
                        src: 'http://10.51.10.68:5555/',
                        singleton: true,
                        route: {
                            'name': 'NavigationIframe',
                            'params': {
                                uid: 'vt-admin-flower-test'
                            }
                        },
                    },
                ]
            },
        ]
    },
];
let indexStack = [];
let indices = {};
let route2index = {};
indexWalker(indexConfig, indexStack, indices, route2index, optionMeta);

export default new Vuex.Store({
    state: {
        'indexConfig': indexConfig,
        'indices': indices,
        'route2index': route2index,
        'selected': null,
    },
    getters: {
        'indexConfigHash': function (state) {
            let s = JSON.stringify(state.indexConfig);
            let hash = 5381;
            for(let i=0; i<s.length; i++){
                hash += hash*33 + s.charAt(i).charCodeAt()
            }
            return hash
        },
        // 'indices': function (state){
        //     let indexConfig = JSON.parse(JSON.stringify(state.indexConfig));
        //     let indexStack = [];
        //     let indices = {};
        //     let route2index = {};
        //     return indexWalker(indexConfig, indexStack, indices, route2index)[1];
        // },
        // 'route2index': function(state){
        //     let indexConfig = JSON.parse(JSON.stringify(state.indexConfig));
        //     let indexStack = [];
        //     let indices = {};
        //     let route2index = {};
        //     return indexWalker(indexConfig, indexStack, indices, route2index)[2];
        // },
    },
    watch: {
        'selected': function (now, pre) {
            console.log(now, pre);
        },
        'route2index': function () {
            let indexConfig = JSON.parse(JSON.stringify(this.indexConfig));
            let indexStack = [];
            let indices = {};
            let route2index = {};
            indexWalker(indexConfig, indexStack, indices, route2index);
            this.indexConfig = indexConfig;
            // this.indices = indices;
            // this.route2index = route2index;
        }
    },
    mutations: {
        inverseLoaded(state, uid) {
            // 变更状态
            console.log(state, uid);
            state.indices[uid]['loaded'] = !state.indices[uid]['loaded']
        },
        select(state, uid) {
            state['selected'] = uid;
        }
    },
    actions: {},
    modules: {}
})
