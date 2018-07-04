import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

const musicBoot = (resolve) => {
  import('@/components/musicBoot').then((module) => {
    resolve(module)
  })
}

const routerGroup = new Router({
  routes: [
    {
      path: '/',
      redirect: '/musicBoot'
    },
    // ============================================= other ===================================================
    // 注册
    {
      path: '/musicBoot',
      component: musicBoot,
      meta: {
        title: '音乐播放器',
      }
    }
  ]
})

// index
export default {
  routerGroup
}