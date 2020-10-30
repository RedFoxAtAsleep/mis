import Vue from 'vue'
import VueRouter from 'vue-router'
import NavigationIndex from "@/views/Navigation/index.vue"
import IframeIndex from "@/views/Iframe/index.vue"
import JsonQuery from "@/views/JsonQuery.vue"
import VtsSubmitRequire from "@/views/VtsSubmitRequire";
import VtsSubmitRequireTest from "@/views/VtsSubmitRequireTest";
import VtsDownloadPackage from "@/views/VtsDownloadPackage";
import Page404 from "@/components/Page404.vue"
// import Home from "@/views/Home.vue"
// import About from "@/views/About.vue"

// import HelloWorld from "../components/HelloWorld";

Vue.use(VueRouter);

import UserSettings from "../views/UserSettings";
import UserEmailsSubscriptions from "../views/UserEmailsSubscriptions"
import UserProfile from "../views/UserProfile";
import UserProfilePreview from "../views/UserProfilePreview";
import UserProfilePreviewA from "../views/UserProfilePreviewA";
import UserProfilePreviewB from "../views/UserProfilePreviewB";
import UserProfilePreviewC from "../views/UserProfilePreviewC";

const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
};

const routes = [

    {
        path: '/',
        name: 'Home',
        redirect: '/navigation',
        meta: {requiresAuth: true}
    },
    { path: '/router/demo',
        // You could also have named views at tho top
        component: UserSettings,
        children: [{
            path: 'emails',
            component: UserEmailsSubscriptions,
            children:[
                {
                    path: 'a',
                    components: {
                        default: UserProfilePreviewA
                    }
                },
                {
                    path: 'ab',
                    components: {
                        default: UserProfilePreviewA,
                        x: UserProfilePreviewB
                    }
                },
                {
                    path: 'cba',
                    components: {
                        default: UserProfilePreviewC,
                        x: UserProfilePreviewB,
                        y: UserProfilePreviewA,
                    }
                }
            ]
        },
            {
                path: 'profile',
                components: {
                    default: UserProfile,
                    helper: UserProfilePreview
                },
                children:[
                    {
                        path: 'a',
                        components: {
                            default: UserProfilePreviewA
                        }
                    },
                    {
                        path: 'ab',
                        components: {
                            default: UserProfilePreviewA,
                            x: UserProfilePreviewB
                        }
                    },
                    {
                        path: 'cba',
                        components: {
                            default: UserProfilePreviewC,
                            x: UserProfilePreviewB,
                            y: UserProfilePreviewA,
                        }
                    }
                ]
            }]
    },
    {
        path: '/about',
        name: 'About',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
    },
    {
        path: '/iframe/:uid',
        name: 'Iframe',
        component: IframeIndex,
        props: true
    },
    {
        path: '/navigation',
        name: 'Navigation',
        component: NavigationIndex,
        props: true,
        children: [
            {
                path: 'vt-commit',
                name: 'VtCommit',
                component: VtsSubmitRequire
            },
            {
                path: 'vt-commit-test',
                name: 'VtCommitTest',
                component: VtsSubmitRequireTest
            },
            {
                path: 'vt-query',
                name: 'VtQuery',
                component: JsonQuery
            },
            {
                path: 'vt-download',
                name: 'VtDownload',
                component: VtsDownloadPackage,
                props: true
            },
            {
                path: 'vt-statistic-require',
                name: 'VtStatisticRequire',
                component: () => import('@/views/VtsStatisticRequire'),
            },
            {
                path: 'vt-statistic-apikey',
                name: 'VtStatisticApiKey',
                component: () => import('@/views/VtsStatisticApiKey'),
            },
            {
                path: 'vt-statistic-sample',
                name: 'VtStatisticSample',
                component: () => import('@/views/VtsStatisticSample'),
            },
            {
                path: 'vt-require',
                name: 'VtRequire',
                component: () => import('@/views/EchartSimpleBar'),
                props: true
            },
            {
                path: 'iframe/:uid',
                name: 'NavigationIframe',
                component: () => import('@/views/Navigation/Iframe'),
                props: true
            },
            {
                path: 'iframe/:uid',
                name: 'NavigationIframe',
                component: () => import('@/views/Navigation/Iframe'),
                props: true
            },
            {
                path: 'hc-basic-bar',
                name: 'HcBasicBar',
                props: true,
                component: () => import('@/views/HcBasicBar'),
            },
        ]
    },
    {
        path: '/component',
        name: 'Component',
        component: () => import('@/views/Component/index'),
        props: true,
        children: []
    },
    {path: '*', Page404},
];

// 路由和页面 空间层次划分
// 导航

const router = new VueRouter({
    // mode: 'history',
    routes: routes
});

export default router
