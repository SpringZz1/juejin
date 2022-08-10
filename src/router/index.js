import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    // 默认进入的就是推荐界面
    path: '/',
    name: 'Home',
    component: () =>
      import('../views/home/index.vue'),
    redirect: '/recommand',
    // 增加子目录: 分别是最新和热榜
    children: [{
      path: '/recommand',
      name: 'Recommand',
      component: () =>
        import('../components/recommand/index.vue')
    },
    {
      path: '/newest',
      name: 'Newest',
      component: () =>
        import('../components/newest/index.vue')
    },
    {
      path: 'hotList',
      name: 'HotList',
      component: () =>
        import('../components/hotList/index.vue')
    }
    ]
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
