import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

function indexWalker(indexConfig, indexStack, indices, route2index) {
    for (let k in Object.keys(indexConfig)) {
        let item = indexConfig[k];
        indexStack.push(item['name']);
        item['path'] = Object.assign([], indexStack);
        item['uid'] = indexStack.join('-');
        if (item['children'].length === 0) {
            item['route']['uid'] = item['uid'];
            indices[item['uid']] = Object.assign({}, item);
            route2index[item['route']['name']] = item['uid']
        } else {
            indexWalker(item['children'], indexStack, indices, route2index);
        }
        indexStack.pop();
    }
    return [indexConfig, indices, route2index]
}

let indexConfig = [
    {
        name: 'navigation',
        label: 'navigation',
        singleton: true,
        weight: 0,
        show: true,
        icon: '',
        roles: [],
        cache: true,
        children: [
            {

                name: 'file',
                label: 'file',
                singleton: true,
                weight: 0,
                route: {
                    'name': 'File'
                },
                show: true,
                icon: '',
                roles: [],
                cache: true,
                loaded: false,
                children: []
            },
            {
                name: 'datetime',
                label: 'datetime',
                singleton: true,
                weight: 0,
                route: {
                    'name': 'Datetime'
                },
                show: true,
                icon: '',
                roles: [],
                cache: true,
                loaded: false,
                children: []
            },
            {
                name: 'baidu',
                label: 'baidu',
                src: 'https://www.baidu.com/',
                singleton: true,
                weight: 0,
                route: {
                    'name': 'NavigationIframe',
                    'params': {
                        'uid': 'navigation-baidu'
                    }
                },
                show: true,
                icon: '',
                roles: [],
                cache: true,
                loaded: false,
                children: []
            },
            {
                name: 'sogou',
                label: 'sogou',
                src: 'https://www.sogou.com',
                singleton: true,
                weight: 0,
                route: {
                    'name': 'NavigationIframe',
                    'params': {
                        'uid': 'navigation-sogou'
                    }
                },
                show: true,
                icon: '',
                roles: [],
                cache: true,
                loaded: false,
                children: []
            },
        ]
    },
    {
        name: 'baidu',
        label: 'baidu',
        src: 'https://www.baidu.com/',
        weight: 0,
        show: true,
        icon: '',
        roles: [],
        cache: true,
        loaded: false,
        route: {
            name: 'Iframe',
            params: {
                uid: 'baidu'
            }
        },
        children: []
    },
    {
        name: 'sogou',
        label: 'sogou',
        src: 'https://www.sogou.com',
        weight: 0,
        show: true,
        icon: '',
        roles: [],
        cache: true,
        loaded: false,
        route: {
            name: 'Iframe',
            params: {
                uid: 'sogou'
            }
        },
        children: []
    },
];
let indexStack = [];
let indices = {};
let route2index = {};
indexWalker(indexConfig, indexStack, indices, route2index);

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
