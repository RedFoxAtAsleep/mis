import Vue from 'vue'
import VueRouter from 'vue-router'
import Frame from "../components/Frame";

Vue.use(VueRouter);

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
};

const routes = [
  {
    path: '/',
    name: 'Home',
    redirect: '/navigation',
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
    path: '/navigation',
    name: 'navigation',
    component: Frame,
    children: [
      {
        path:'tab-list',
        name:'tab-list',
        component:()=>import("@/components/List")
      },
      {
        path:'tab-commit',
        name:'tab-commit',
        component:() => import(/* webpackChunkName: "about" */ '../components/Form.vue')
      },
    ]
  },
];

const router = new VueRouter({
  routes
});

export default router
