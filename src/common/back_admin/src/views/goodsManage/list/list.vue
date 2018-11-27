
<template>
    <div>
        <Row :gutter="10">
            <Col span="24">
                <Card>
                    <p slot="title">商品管理</p>
                    <Row class="search">
                        <span class="lb">商品名称</span>
                        <Input v-model.trim="searchParams.proName" placeholder="请输入商品名称搜索..." style="width: 200px" />
                        <span class="lb">商品分类</span>
                        <Select style="width:200px" v-model="searchParams.proClassify" placeholder="全部">
                            <Option :value="``" >全部</Option>
                            <Option v-for="(val,key) of classifyList" :value="val" :key="key">{{ val }}</Option>
                        </Select>
                        <span class="lb">是否上架</span>
                        <Select style="width:200px" v-model="searchParams.updownStatus" placeholder="全部">
                            <Option v-for="(val,key) of statusList" :value="key" :key="key">{{ val }}</Option>
                        </Select>
                        <span class="btn"><Button type="primary" icon="search" @click="search">搜索</Button></span>
                    </Row>
                    <div v-if="auth && globalFun.userAuth.checkAuth(auth,'7012')">
                        <Button type="primary" icon="plus-round" @click="redirect()">添加</Button>
                    </div>
                    <Row class="margin-top-10 searchable-table-con1">
                        <Table :columns="columns" :data="list"></Table>
                    </Row>
                    <Page v-if="pageTotal>0" :current.sync="page"  :total="pageTotal" :page-size="searchParams.pageSize"  @on-change="convertPage" @on-page-size-change="convertPageSize" show-sizer :page-size-opts="[10,20,50]" placement="top" show-elevator show-total></Page>
                </Card>
            </Col>
        </Row>
    </div>
</template>

<script>
import { getList,updown,updataVerify } from '@/api/api_goodsManage.js'
import { comboBoxClassLfy } from '@/api/api_goods.js'

export default {
    data () {
        return {
            columns:[],
            list: [],
            page:1,
            pageTotal:0,
            searchParams:{
                proName:"",
                proClassify:"",
                updownStatus:0,
                pageNo: 1,
                pageSize: 10
            },
            statusList:{
                0:"全部",
                1: "否",
                2: "是"               
            },
            checkStatusList: {
                '-1':'未提交审核',
                1:'未审核',
                2:'不通过',
                3:'通过'
            },
            classifyList:{},
            auth:"",
        };
    },
    methods: {
        init () {
            this.comboBoxClassLfy()
            this.getList()
            this.setColumns();
        },
        setColumns(){
            this.columns = [
            {
                key: 'seq',
                title: '序号',
                width: 62,
                render: (h, params) => {
                    return h('div', [
                        h('span', {}, (this.page-1)*this.searchParams.pageSize + params.index+1)
                    ]);
                }
            },{
                key: 'proName',
                title: '商品名称'
            },{
                key: 'proClassify',
                title: '商品分类',
            },{
                key: 'inventory',
                title: '库存'
            },{
                key: 'updownStatus',
                title: '是否上架',
                render: (h,params) => {
                    return h('div',[
                        h('span',{},params.row.updownStatus == 1 ? '否':'是')
                    ])
                }
            },{
                key: 'checkStatus',
                title: '审核状态',
                render: (h,params) => {
                    return h('div',[
                        h('span',{},this.checkStatusList[params.row.checkStatus])
                    ])
                }
            },{
                key: 'status',
                title: '操作',
                render: (h, params) => {
                    let buttonList = [];
                    if(this.globalFun.userAuth.checkAuth(this.auth,"7013")){
                        buttonList.push(h('Button', {
                            props: {
                                type: 'primary',
                                size: 'small'
                            },
                            style: {
                                marginRight: '5px'
                            },
                            on: {
                                click: () => {
                                    this.$router.push({
                                        name:'goods_edit',query:{
                                            id:params.row.id
                                        }
                                    })
                                }
                            }
                        }, '编辑'))
                    }
                    if(this.globalFun.userAuth.checkAuth(this.auth,"7014") && params.row.checkStatus == 3){
                        if(params.row.updownStatus == 1){
                            buttonList.push( h('Button', {
                                props: {
                                    type: 'primary',
                                    size: 'small'
                                },
                                style: {
                                    marginRight: '5px'
                                },
                                on: {
                                    click: () => {
                                        this.updown(params.row,2)
                                    }
                                }
                            }, '上架'))
                        } 
                        if(params.row.updownStatus == 2){
                            buttonList.push( h('Button', {
                                props: {
                                    type: 'error',
                                    size: 'small'
                                },
                                style: {
                                    marginRight: '5px'
                                },
                                on: {
                                    click: () => {
                                        this.updown(params.row,1)
                                    }
                                }
                            }, '下架'))
                        }
                    }
                    if(this.globalFun.userAuth.checkAuth(this.auth,"7015")){
                        if(params.row.checkStatus == 1){
                            buttonList.push( h('Button', {
                                props: {
                                    type: 'primary',
                                    size: 'small'
                                },
                                style: {
                                    marginRight: '5px'
                                },
                                on: {
                                    click: () => {
                                          this.$router.push({
                                        name:'goods_edit',query:{
                                            id:params.row.id,
                                            status:params.row.checkStatus
                                        }
                                    })
                                    }
                                }
                            }, '待审核'))
                        }
                        if(params.row.checkStatus == 2 || params.row.checkStatus == -1){
                            buttonList.push( h('Button', {
                                props: {
                                    type: 'primary',
                                    size: 'small',
                                    // disabled:'disabled'
                                },
                                style: {
                                    marginRight: '5px'
                                },
                                on: {
                                    click: () => {
                                        this.updataVerify(params.row.id)
                                    }
                                }
                            }, '提交审核'))
                        }
                    }
                    return h('div', {
                        style: {
                            width: '100%',
                            textAlign: 'center'
                        }
                    }, buttonList);
                }
            }];
        },
        comboBoxClassLfy() {
            comboBoxClassLfy().then(res => {
                if(res.code == 200) {
                     var list = res.data || [];
                    var map = {};
                    list.forEach((item)=>{
                        map[item.id] = item.name;
                    })
                    this.classifyList = map;
                }
            })
        },
        getList(callback){
            this.$Spin.show()
            getList(this.searchParams).then(res => {
                if(res.code == 200) {
                    this.$Spin.hide()
                    this.list = res.data.entities || []
                    this.pageTotal = res.data.count
                    if(callback){
                        callback();
                    }
                }else {
                    this.$Spin.hide()
                }
            })
        },
        updown(item,status){
            let type = status == 1? '下架':'上架'
            this.$Modal.confirm({
                content: `是否要${type}当前商品？`,
                loading: false,
                onOk: () => {
                    this.$Spin.show();
                    updown({
                        id: item.id,
                        updownStatus:status
                    }).then(res => {
                        this.$Spin.hide();
                        if(res.code == 200){
                            this.$Message.success(`${type}成功`);
                            this.getList();
                        }
                    });
                }
            }); 
        },
        updataVerify(id) {
            this.$Modal.confirm({
                content: `是否要提交审核当前商品？`,
                loading: false,
                onOk: () => {
                    this.$Spin.show();
                    updataVerify({
                        id:id,
                        checkStatus:'1'
                    }).then(res => {
                        this.$Spin.hide();
                        if(res.code == 200){
                            this.$Message.success(`提交成功`);
                            this.getList();
                        }
                    });
                }
            })
        },
        // 搜索
        search(){
            this.searchParams.pageNo = 1;
            this.getList(() => {
                this.page = 1;
            });
        },
        // 选择页数
        convertPage(index){ 
            this.searchParams.pageNo = index;
            this.getList(() => {
                this.page = index;
            });
        },
        convertPageSize(size){
            this.searchParams.pageSize = size;
            this.getList();
        },
        //  页面跳转
        redirect(path) {
            this.$router.push({
                path: '/goodsManage/add'
            });
        },

    },
    mounted () {
        this.globalFun.userAuth.getAuth(data=>{
            this.auth = data;
            this.init();
        });
    }
};
</script>
<style lang="less">
    @import '../../../common/styles/common.less';
</style>