import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

function mapWalker(map, page, pages) {
    console.log('map', map);
    for (let i in map) {
        let sub = map[i];
        page.push(sub['name']);
        let path = page.join('-');
        sub['path'] = path;
        sub['uid'] = 'menu-' + path;
        if (sub['children'].length === 0) {
            // pages.push({
            //   'uid': 'page-' + path,
            //   'path': path,
            //   'label': sub['name'],
            //   'content': sub['name'],
            //   'loaded': false,
            // });
            pages['page-' + path] = {
                'uid': 'page-' + path,
                'path': path,
                'name': sub['name'],
                'label': sub['name'],
                'content': sub['name'],
                'loaded': sub['loaded'],
                'route': sub['route'],
              'show':sub['show'],
            }
        } else {
            mapWalker(sub['children'], page, pages);
        }
        page.pop();
    }
    return map
}

let map = [
    // {
    //     'name': 'someapp',
    //     'label': 'someapp',
    //     'singleton': true,
    //     'weight': 0,
    //     'show': true,
    //     'children': [
    //         {
    //
    //             'name': 'list',
    //             'label': 'list',
    //             'singleton': true,
    //             'weight': 0,
    //             'route': '/someapp/list',
    //             'show': true,
    //           'loaded': false,
    //             'children': []
    //         },
    //         {
    //             'name': 'detail',
    //             'label': 'detail',
    //             'singleton': true,
    //             'weight': 0,
    //             'route': '/someapp/detail',
    //             'show': true,
    //           'loaded': false,
    //             'children': []
    //         },
    //       {
    //             'name': 'post',
    //             'label': 'post',
    //             'singleton': true,
    //             'weight': 0,
    //             'route': '/someapp/post',
    //             'show': true,
    //           'loaded': false,
    //             'children': []
    //         },
    //     ]
    // },
    {
        'name': 'vt',
        'label': 'vt',
        'singleton': true,
        'weight': 0,
        'show': true,
        'children': [
            {

                'name': 'list',
                'label': 'list',
                'singleton': true,
                'weight': 0,
                'route': '/navigation/tab-list',
                'show': true,
              'loaded': false,
                'children': []
            },
          {
                'name': 'commit',
                'label': 'commit',
                'singleton': true,
                'weight': 0,
                'route': '/navigation/tab-commit',
                'show': true,
              'loaded': false,
                'children': []
            },
        ]
    },
    {
        'name': 'hidden',
        'label': 'hidden',
        'singleton': true,
        'weight': 0,
        'show': false,
      'loaded': false,
      'route': '/navigation',
        'children': []
    }
];
let page = [];
let pages = {};
map = mapWalker(map, page, pages);


export default new Vuex.Store({
    state: {
        'pageMap': map,
        'pages': pages,
        'selectedPath': '',
    },
    watch: {
        'selectedPath': function (now, pre) {
            console.log('store', now, pre);
        }
    },
    mutations: {
        inverseLoaded(state, pageUid) {
            // 变更状态
            state['pages'][pageUid]['loaded'] = !state.pages[pageUid]['loaded']
        },
        selectPath(state, path) {
            console.log('path', path);
            state['selectedPath'] = path;
        }
    },
    actions: {},
    modules: {}
})
