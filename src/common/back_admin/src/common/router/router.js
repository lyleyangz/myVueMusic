import Main from '@/views/Main.vue';

// 不作为Main组件的子页面展示的页面单独写，如下
export const loginRouter = {
    path: '/login',
    name: 'login',
    meta: {
        title: 'Login - 登录'
    },
    component: () => import('@/views/others/login.vue')
};
export const page404 = {
    path: '/*',
    name: 'error-404',
    meta: {
        title: '404-页面不存在'
    },
    component: () => import('@/views/error-page/404.vue')
};

export const page403 = {
    path: '/403',
    meta: {
        title: '403-权限不足'
    },
    name: 'error-403',
    component: () => import('@//views/error-page/403.vue')
};

export const page500 = {
    path: '/500',
    meta: {
        title: '500-服务端错误'
    },
    name: 'error-500',
    component: () => import('@/views/error-page/500.vue')
};


export const locking = {
    path: '/locking',
    name: 'locking',
    component: () => import('@/views/main-components/lockscreen/components/locking-page.vue')
};

// 作为Main组件的子页面展示但是不在左侧菜单显示的路由写在otherRouter里
export const otherRouter = {
    path: '/',
    name: 'otherRouter',
    redirect: '/login',
    component: Main,
    children: [
        { 
            path: 'home', 
            title: '首页', 
            name: 'home_index', 
            component: () => import('@/views/home/home.vue') 
        },
        { 
            path: 'goods/list/add', 
            title: '添加商品', 
            name: 'goodsAdd', 
            component: () => import('@/views/goods/list/add.vue') 
        },
        { 
            path: '/user/edit', 
            title: '编辑用户', 
            name: 'user_edit', 
            component: () => import('@/views/account/user/edit.vue') 
        },
        { 
            path: '/user/add', 
            title: '添加用户', 
            name: 'user_add', 
            component: () => import('@/views/account/user/edit.vue') 
        },
        { 
            path: '/role/authority', 
            title: '处理意见反馈', 
            name: 'role_authority', 
            component: () => import('@/views/account/role/authority.vue') 
        },
        { 
            path: '/areaManage/add', 
            title: '添加场地', 
            name: 'areaManage_add', 
            component: () => import('@/views/CMS_system/areaManage/edit.vue') 
        },
        { 
            path: '/areaManage/edit/:id', 
            title: '编辑场地', 
            name: 'areaManage_edit', 
            component: () => import('@/views/CMS_system/areaManage/edit.vue') 
        },
        { 
            path: '/greatMasterManage/edit', 
            title: '编辑珠宝大师', 
            name: 'greatMasterManage_edit', 
            component: () => import('@/views/CMS_system/greatMasterManage/edit.vue') 
        },
        { 
            path: '/greatMasterManage/add', 
            title: '添加珠宝大师', 
            name: 'greatMasterManage_add', 
            component: () => import('@/views/CMS_system/greatMasterManage/edit.vue') 
        },
        { 
            path: '/goodsProcessManage/edit', 
            title: '编辑加工轨迹', 
            name: 'goodsProcessManage_edit', 
            component: () => import('@/views/CMS_system/goodsProcessManage/edit.vue') 
        },
        { 
            path: '/goodsProcessManage/add', 
            title: '添加加工轨迹', 
            name: 'goodsProcessManage_add', 
            component: () => import('@/views/CMS_system/goodsProcessManage/edit.vue') 
        },
        { 
            path: '/notice/edit', 
            title: '编辑公告', 
            name: 'notice_edit', 
            component: () => import('@/views/Operator/notice/edit.vue') 
        },
        { 
            path: '/notice/add', 
            title: '添加公告', 
            name: 'notice_add', 
            component: () => import('@/views/Operator/notice/edit.vue') 
        },
        { 
            path: '/carrier/add', 
            title: '添加承运人', 
            name: 'carrier_add', 
            component: () => import('@/views/CMS_system/carrierManage/edit.vue') 
        },
        { 
            path: '/carrier/edit/:id', 
            title: '编辑承运人', 
            name: 'carrier_edit', 
            component: () => import('@/views/CMS_system/carrierManage/edit.vue') 
        },
        { 
            path: '/interlocution/edit', 
            title: '编辑百问百答', 
            name: 'interlocution_edit', 
            component: () => import('@/views/Operator/interlocution/edit.vue') 
        },
        { 
            path: '/interlocution/add', 
            title: '添加百问百答', 
            name: 'interlocution_add', 
            component: () => import('@/views/Operator/interlocution/edit.vue') 
        },
        { 
            path: '/feedback/deal/:id', 
            title: '处理意见反馈', 
            name: 'feedback_deal', 
            component: () => import('@/views/Operator/feedback/edit.vue') 
        },
        { 
            path: '/goodsOrder/detail', 
            title: '商品订单详情', 
            name: 'goodsOrder_detail', 
            component: () => import('@/views/orderManage/goodsOrder/detail.vue') 
        },
        { 
            path: '/goodsManage/edit', 
            title: '编辑商品', 
            name: 'goods_edit', 
            component: () => import('@/views/goodsManage/list/edit.vue') 
        },
        { 
            path: '/goodsManage/add', 
            title: '添加商品', 
            name: 'goods_add', 
            component: () => import('@/views/goodsManage/list/edit.vue') 
        },
        //########################
        { 
            path: '/systemSetting/reward/edit/:id', 
            title: '修改奖励值', 
            name: 'reward_edit', 
            component: () => import('@/views/systemSetting/reward/edit.vue') 
        },
        //########################
        { 
            path: '/systemSetting/worth/edit/:id', 
            title: '修改token价值', 
            name: 'worth_edit', 
            component: () => import('@/views/systemSetting/worth/edit.vue') 
        },
    ]
};
// 作为Main组件的子页面展示并且在左侧菜单显示的路由写在appRouter里
export const appRouter = [
    { 
        path: '/',
        name: 'home',
        icon: 'ios-home',
        component: Main,
        title:'首页',
        children: [
            { 
                path: '/home', 
                title: '首页', 
                name: 'home_index', 
                component: () => import('@/views/home/home.vue') 
            },
            { 
                path: '/loginLog', 
                title: '登录日志', 
                name: 'login_log', 
                component: () => import('@/views/home/loginLog.vue') 
            },
        ]
    },
    {
        path: '/',
        name: 'account_manage',
        component: Main,
        icon: 'person',
        title: '账户管理',
        children: [
            {
                path: '/account/user',
                name: 'accountUser',
                title: '用户管理',
                component: () => import('@/views/account/user/index.vue')
            },
            {
                path: '/account/role',
                name: 'accountRole',
                title: '角色管理',
                component: () => import('@/views/account/role/index.vue')
            },
            {
                path: '/account/member',
                name: 'accountMember',
                title: '会员管理',
                component: () => import('@/views/account/member/index.vue')
            }
        ]
    }, 
    {
        path: '/',
        name: 'goodsManage',
        component: Main,
        title: '商品管理',
        icon: 'ios-cart',
        children: [
            {
                path: '/goodsManage/list',
                name: 'goodsManageList',
                title: '商品列表',
                component: () => import('@/views/goodsManage/list/list.vue')
            }
        ]
    }, 
    {
        path: '/',
        name: 'goods_manage',
        component: Main,
        title: '商品管理',
        icon: 'ios-cart',
        children: [
            {
                path: '/goods/list',
                name: 'goodsList',
                title: '溯源商品列表',
                component: () => import('@/views/goods/list/index.vue')
            },
            {
                path: '/goods/classify',
                name: 'goodsClassify',
                title: '溯源商品分类',
                component: () => import('@/views/goods/classify/index.vue')
            },
            {
                path: '/goods/batch',
                name: 'goodsBatch',
                title: '溯源商品批次',
                component: () => import('@/views/goods/batch/index.vue')
            },
            {
                path: '/goods/templet',
                name: 'goodsTemplet',
                title: '溯源商品模板',
                component: () => import('@/views/goods/templet/index.vue')
            }
        ]
    },  
    {
        path: '/',
        name: 'CMS_system',
        component: Main,
        title: '系统管理',
        icon: 'android-settings',
        children: [
            {
                path: '/CMS_system/areaManage',
                name: 'areaManage',
                title: '场地管理',
                component: () => import('@/views/CMS_system/areaManage/list.vue')
            },
            {
                path: '/CMS_system/greatMasterManage',
                name: 'greatMasterManage',
                title: '珠宝大师管理',
                component: () => import('@/views/CMS_system/greatMasterManage/list.vue')
            },
            {
                path: '/CMS_system/carrierManage',
                name: 'carrierManage',
                title: '承运人管理',
                component: () => import('@/views/CMS_system/carrierManage/list.vue')
            },
            {
                path: '/CMS_system/goodsProcessManage',
                name: 'goodsProcessManage',
                title: '商品加工轨迹管理',
                component: () => import('@/views/CMS_system/goodsProcessManage/list.vue')
            },
            {
                path: '/CMS_system/monitor',
                name: 'monitor',
                title: '现场监控',
                component: () => import('@/views/CMS_system/monitor/list.vue')
            },
            {
                path: '/systemSetting/syetemParams',
                name: 'syetemParams',
                title: '系统参数',
                component: () => import('@/views/systemSetting/syetemParams/list.vue')
            },
            {
                path: '/systemSetting/reward',
                name: 'reward',
                title: 'token奖励设置',
                component: () => import('@/views/systemSetting/reward/list.vue')
            },
            {
                path: '/systemSetting/worth',
                name: 'worth',
                title: 'token价值',
                component: () => import('@/views/systemSetting/worth/list.vue')
            }

            
        ]
    },{
        path: '/',
        name: 'orderManage',
        title: '订单管理',
        component: Main,
        icon: 'ios-cart',
        children: [
            // {
            //     path: '/orderManage/consumeOrder',
            //     name: 'consumeOrder',
            //     title: '消费订单列表',
            //     component: () => import('@/views/orderManage/consumeOrder/list.vue')
            // },
            {
                path: '/orderManage/goodsOrder',
                name: 'goodsOrder',
                title: '商品订单列表',
                component: () => import('@/views/orderManage/goodsOrder/list.vue')
            },
        ]
    },{
        path: '/',
        name: 'Operator',
        title: '运营中心',
        component: Main,
        icon: 'chatbubbles',
        children: [
            {
                path: '/Operator/interlocution',
                name: 'interlocution',
                title: '百问百答',
                component: () => import('@/views/Operator/interlocution/list.vue')
            },
            {
                path: '/Operator/feedback',
                name: 'feedback',
                title: '意见反馈',
                component: () => import('@/views/Operator/feedback/list.vue')
            },
            {
                path: '/Operator/notice',
                name: 'notice',
                title: '公告管理',
                component: () => import('@/views/Operator/notice/list.vue')
            },
        ]
    }

];

// 所有上面定义的路由都要写在下面的routers里
export const routers = [
    loginRouter,
    otherRouter,
    locking,
    ...appRouter,
    page500,
    page403,
    page404
];
