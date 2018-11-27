
<template>
    <div>
        <Row :gutter="10">
            <Col span="24">
                <Card>
                    <p slot="title">
                        商品加工轨迹
                    </p>
                    <Row class="search">
                        <span class="lb">轨迹名称</span>
                        <Input v-model.trim="searchParams.traName" placeholder="请输入轨迹名称搜索..." style="width: 200px" />
                        <span class="lb">商品批次</span>
                        <Select style="width:200px" v-model="searchParams.traBatch" placeholder="全部">
                            <Option :value="``" >全部</Option>
                            <Option v-for="(val,key) of statusList" :value="key" :key="key">{{ val }}</Option>
                        </Select>
                        <span class="btn">
                            <Button type="primary" icon="search" @click="search">搜索</Button>
                            
                        </span>
                    </Row>
                    <Row v-if="auth && globalFun.userAuth.checkAuth(auth,'4042')">
                        <Col>
                            <Button type="primary" icon="plus-round" @click="redirect()">添加</Button>
                        </Col>
                    </Row>
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
import { getList,comboBoxBatch,deleteEdit } from '@/api/api_processManage.js'
export default {
    data () {
        return {
            columns:[],
            list: [],
            page:1,
            pageTotal:0,
            searchParams:{
                traName: "",
                traBatch: "",
                pageNo: 1,
                pageSize: 10
            },
            statusList:[],
            auth:"",
        };
    },
    methods: {
        init () {
            this.comboBoxBatch()
            this.getList();
            this.setColumns();
        },
        setColumns(){
            this.columns = [
            {
                key: 'seq',
                title: '序号',
                width: 100,
                render: (h, params) => {
                    return h('div', [
                        h('span', {}, (this.page-1)*this.searchParams.pageSize + params.index+1)
                    ]);
                }
            },
            {
                key: 'traName',
                title: '轨迹名称'
            },
            {
                key: 'traBatch',
                title: '加工批次',
                render:(h,params) => {
                    return h('div',[
                        h('span', {}, this.statusList[params.row.traBatch])
                    ])
                }
            },
            {
                key: 'status',
                title: '操作',
                render: (h, params) => {
                    let buttonList = [];
                    if(this.globalFun.userAuth.checkAuth(this.auth,"4043")){
                        buttonList.push(
                            h('Button', {
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
                                        name:"goodsProcessManage_edit",query:{
                                            id:params.row.id
                                        }
                                    })
                                }
                            }
                        }, '编辑'))
                    }
                    if(this.globalFun.userAuth.checkAuth(this.auth,"4044")){
                        buttonList.push(
                            h('Button', {
                            props: {
                                type: 'error',
                                size: 'small'
                            },
                            style: {
                                marginRight: '5px'
                            },
                            on: {
                                click: () => {
                                    this.deleteEdit(params.row.id)
                                }
                            }
                        }, '删除'))
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
        comboBoxBatch(){
          comboBoxBatch().then(res => {
              if(res.code == 200) {
                   var list = res.data || [];
                    var map = {};
                    list.forEach((item)=>{
                        map[item.id] = item.name;
                    })
                    this.statusList = map;
              }
          })
      },
        getList(callback){
            this.$Spin.show()
            getList(this.searchParams).then(res => {
                this.$Spin.hide()
                if(res.code == 200) {
                    this.list = res.data.entities
                    this.pageTotal = res.data.count
                    if(callback){
                        callback();
                    }
                }
            })
        },
        deleteEdit(id){
            this.$Modal.confirm({
                content: "是否要删除当前商品轨迹？",
                loading: false,
                onOk: () => {
                    this.$Spin.show();
                    deleteEdit({
                        id: id
                    }).then(res => {
                        this.$Spin.hide();
                        if(res.code == 200 ){
                            this.$Message.success('删除成功');
                            this.getList();
                        }
                    });
                }
            }); 
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
        redirect() {
            this.$router.push({
                path: '/goodsProcessManage/add'
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