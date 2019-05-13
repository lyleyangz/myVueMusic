import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

const generalLayout = (resolve) => {
  import('@/components/generalLayout').then((module) => {
    resolve(module)
  })
}
// 子页面入口
const Entrance = (resolve) => {
  import('@/components/Entrance/index').then((module) => {
    resolve(module)
  })
}
const player = (resolve) => {
  import('@/components/player/index').then((module) => {
    resolve(module)
  })
}
const routerGroup = new Router({
  routes: [
    {
      path: '/',
      redirect: '/generalLayout',
    },
    // ============================================= other ===================================================
    // 注册
    {
      path: '/generalLayout',
      component: generalLayout,
      meta: {
        title: '音乐播放器',
      }
    },
    {
      path: "/player",
      component: player
    }
  ]
})

// index
export default {
  routerGroup
}