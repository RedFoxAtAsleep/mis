import Vue from 'vue'
import VueRouter from 'vue-router'
import Frame from "../components/Frame";

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import("@/components/HelloWorld")
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
    path: '/someapp',
    name: 'someapp',
    component: Frame,
    children: [
      {
        path:'list',
        name:'list',
        component:()=>import("@/components/HelloWorld")
      },
      {
        path:'detail',
        name:'detail',
        component:() => import(/* webpackChunkName: "about" */ '../views/About.vue')
      },
      {
        path:'post',
        name:'post',
        component:() => import(/* webpackChunkName: "about" */ '../components/Form.vue')
      },

    ]
  }
];

const router = new VueRouter({
  routes
});

export default router
