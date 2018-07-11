import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

const generalLayout = (resolve) => {
  import('@/components/generalLayout').then((module) => {
    resolve(module)
  })
}
const bottomBar = (resolve) => {
  import('@/components/bottomBar/bottomBar').then((module) => {
    resolve(module)
  })
}
const bottomItems = (resolve) => {
  import('@/components/bottomBar/bottomItems').then((module) => {
    resolve(module)
  })
}
const topBar = (resolve) => {
  import('@/components/topBar/topBar').then((module) => {
    resolve(module)
  })
}
const topItems = (resolve) => {
  import('@/components/topBar/topItems').then((module) => {
    resolve(module)
  })
}
const player = (resolve) => {
  import('@/components/player/player').then((module) => {
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
      children: [
        {
          path: 'bottomBar', component: bottomBar,
          children: [
            { path: 'bottomItems', component: bottomItems }
          ]
        },
        {
          path: 'topBar', component: topBar,
          children: [
            { path: 'topItems', component: topItems }
          ]
        },
      ],
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