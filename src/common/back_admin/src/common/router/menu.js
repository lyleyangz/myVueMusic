const menuList = [{
    title: "首页",
    icon: "ios-home",
    key: "100",
    sub: [{
        title: "系统首页",
        url: "/home",
        key: "1010",
        sub: [{
            title: "溯源商品统计",
            key: "1011",
        },{
            title: "NFC使用次数统计",
            key: "1012",
        }]
    },{
        title: "登录日志",
        url: "/loginLog",
        key: "102",
    }]
},{
    title: "账户管理",
    icon: "person",
    key: "200",
    sub: [{
        title: "用户管理",
        url: "/account/user",
        key: "2010",
        sub: [{
            title: "查看",
            key: "2011",
        },{
            title: "新增",
            key: "2012",
        },{
            title: "修改",
            key: "2013",
        },{
            title: "启用/禁用",
            key: "2014",
        }]
    },{
        title: "角色管理",
        url: "/account/role",
        key: "2020",
        sub: [{
            title: "查看",
            key: "2021",
        },{
            title: "新增",
            key: "2022",
        },{
            title: "修改",
            key: "2023",
        },{
            title: "权限分配",
            key: "2024",
        }]
    },{
        title: "会员管理",
        url: "/account/member",
        key: "2030",
        sub: [{
            title: "查看",
            key: "2031",
        },{
            title: "启用/禁用",
            key: "2032",
        }]
    }]
},{
    title: "溯源商品管理",
    icon: "ios-cart",
    key: "300",
    sub: [{
        title: "溯源商品列表",
        url: "/goods/list",
        key: "3010",
        sub: [{
            title: "查看",
            key: "3011",
        },{
            title: "预览",
            key: "3012",
        },{
            title: "添加",
            key: "3013",
        }]
    },{
        title: "溯源商品批次",
        url: "/goods/batch",
        key: "3030",
        sub: [{
            title: "查看",
            key: "3031",
        },{
            title: "添加",
            key: "3032",
        }]
    },{
        title: "溯源商品模板",
        url: "/goods/templet",
        key: "3040",
        sub: [{
            title: "查看",
            key: "3041",
        },{
            title: "删除",
            key: "3042",
        }]
    }]
},{
    title: "系统管理",
    icon: "android-settings",
    key: "400",
    sub: [{
        title: "商品分类",
        url: "/goods/classify",
        key: "4060",
        sub: [{
            title: "查看",
            key: "4061",
        },{
            title: "添加",
            key: "4062",
        },{
            title: "编辑",
            key: "4063",
        }]
    },{
        title: "场地管理",
        url: "/CMS_system/areaManage",
        key: "4010",
        sub: [{
            title: "查看",
            key: "4011",
        },{
            title: "添加",
            key: "4012",
        },{
            title: "编辑",
            key: "4013",
        },{
            title: "删除",
            key: "4014",
        }]
    },{
        title: "珠宝大师管理",
        url: "/CMS_system/greatMasterManage",
        key: "4020",
        sub: [{
            title: "查看",
            key: "4021",
        },{
            title: "添加",
            key: "4022",
        },{
            title: "编辑",
            key: "4023",
        },{
            title: "删除",
            key: "4024",
        }]
    },{
        title: "承运人管理",
        url: "/CMS_system/carrierManage",
        key: "4030",
        sub: [{
            title: "查看",
            key: "4031",
        },{
            title: "添加",
            key: "4032",
        },{
            title: "编辑",
            key: "4033",
        },{
            title: "删除",
            key: "4034",
        }]
    },{
        title: "商品加工轨迹管理",
        url: "/CMS_system/goodsProcessManage",
        key: "4040",
        sub: [{
            title: "查看",
            key: "4041",
        },{
            title: "添加",
            key: "4042",
        },{
            title: "编辑",
            key: "4043",
        },{
            title: "删除",
            key: "4044",
        }]
    },{
        title: "现场监控",
        url: "/CMS_system/monitor",
        key: "4050",
        sub: [{
            title: "查看",
            key: "4051",
        },{
            title: "添加",
            key: "4052",
        },{
            title: "编辑",
            key: "4053",
        },{
            title: "删除",
            key: "4054",
        }]
    }]
},{
    title: "系统设置",
    icon: "android-settings",
    key: "600",
    sub: [{
        title: "系统参数",
        url: "/systemSetting/syetemParams",
        key: "6010",
        sub: [{
            title: "查看",
            key: "6011",
        },{
            title: "添加",
            key: "6012",
        },{
            title: "编辑",
            key: "6013",
        },{
            title: "删除",
            key: "6014",
        }]
    },{
        title: "token奖励设置",
        url: "/systemSetting/reward",
        key: "6020",
        sub: [{
            title: "查看",
            key: "6021",
        },{
            title: "修改奖励值",
            key: "6023",
        },{
            title: "开启/关闭",
            key: "6024",
        }]
    },{
        title: "token价值",
        url: "/systemSetting/worth",
        key: "6030",
        sub: [{
            title: "编辑",
            key: "6031",
        }]
    }]
},{
    title: "运营中心",
    icon: "chatbubbles",
    key: "500",
    sub: [{
        title: "百问百答",
        url: "/Operator/interlocution",
        key: "5010",
        sub: [{
            title: "查看",
            key: "5011",
        },{
            title: "添加",
            key: "5012",
        },{
            title: "编辑",
            key: "5013",
        },{
            title: "删除",
            key: "5014",
        }]
    },{
        title: "意见反馈",
        url: "/Operator/feedback",
        key: "5020",
        sub: [{
            title: "查看",
            key: "5021",
        },{
            title: "处理",
            key: "5022",
        },{
            title: "详情",
            key: "5023",
        }]
    },{
        title: "公告管理",
        url: "/Operator/notice",
        key: "5030",
        sub: [{
            title: "查看",
            key: "5031",
        },{
            title: "添加",
            key: "5032",
        },{
            title: "编辑",
            key: "5033",
        },{
            title: "删除",
            key: "5034",
        }]
    }]
},{
    title: "订单管理",
    icon: "ios-cart",
    key: "800",
    sub: [
    //     {
    //     title: "消费订单列表",
    //     url: "/orderManage/consumeOrder",
    //     key: "8010",
    //     sub: [{
    //         title: "查看",
    //         key: "8011",
    //     },{
    //         title: "添加",
    //         key: "8012",
    //     },{
    //         title: "编辑",
    //         key: "8013",
    //     },{
    //         title: "删除",
    //         key: "8014",
    //     }]
    // },
    {
        title: "商品订单列表",
        url: "/orderManage/goodsOrder",
        key: "8020",
        sub: [{
            title: "查看",
            key: "8021",
        },{
            title: "添加",
            key: "8022",
        },{
            title: "编辑",
            key: "8023",
        },{
            title: "删除",
            key: "8024",
        }]
    }]
},{
    title: "商品管理",
    icon: "ios-cart",
    key: "700",
    sub: [{
        title: "商品管理",
        url: "/goodsManage/list",
        key: "7010",
        sub: [{
            title: "查看",
            key: "7011",
        },{
            title: "添加",
            key: "7012",
        },{
            title: "编辑",
            key: "7013",
        },{
            title: "上架/下架",
            key: "7014",
        },{
            title: "审核/提交审核",
            key: "7015",
        }]
    }]
}];

export default menuList;