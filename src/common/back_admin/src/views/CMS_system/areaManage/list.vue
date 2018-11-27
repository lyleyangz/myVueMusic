
<template>
    <div>
        <Row :gutter="10">
            <Col span="24">
                <Card>
                    <p slot="title">
                        场地管理
                    </p>
                    <Row class="search">
                        <span class="lb">场地ID</span>
                        <input v-limitNum class="ivu-input" v-model.trim="searchParams.locNum" maxlength="11" style="width: 200px" />
                        <span class="lb">场地名称</span>
                        <Input v-model.trim="searchParams.locName" style="width: 200px" />
                        <span class="btn">
                            <Button type="primary" icon="search" @click="search">搜索</Button>
                        </span>
                    </Row>
                    <div v-if="auth && globalFun.userAuth.checkAuth(auth,'4012')">
                        <Button type="primary" icon="plus-round" @click="add()">添加</Button>
                    </div>
                    <Row class="margin-top-10 searchable-table-con1">
                        <Table :columns="columns" :data="list"></Table>
                    </Row>
                    <Page v-if="pageTotal>0" :current.sync="page"  :total="pageTotal" :page-size="searchParams.count"  @on-change="convertPage" @on-page-size-change="convertPageSize" show-sizer :page-size-opts="[10,20,50]" placement="top"  show-elevator show-total></Page>
                </Card>
            </Col>
        </Row>
    </div>
</template>

<script>
import { getList,del } from '@/api/api_areaManage.js'
export default {
    data () {
        return {
            columns:[],
            list: [],
            page:1,
            pageTotal:0,
            searchParams:{
                locNum: null,
                locName: "",
                pageNo: 1,
                pageSize: 10
            },
            auth:"",
        };
    },
    methods: {
        init () {
            this.setColumns();
            this.getList();
        },
        setColumns(){
            this.columns = [
            {
                key: 'seq',
                title: '序号',
                width: 100,
                render: (h, params) => {
                    return h('div', [
                        h('span', {}, (this.page-1)*this.searchParams.pageNo + params.index+1)
                    ]);
                }
            },
            {
                key: 'id',
                title: '场地ID'
            },
            {
                key: 'locName',
                title: '场地名称',
            },
            {
                key: 'chargePerson',
                title: '场地负责人',
            },
            {
                key: 'status',
                title: '操作',
                render: (h, params) => {
                    let buttonList = [];
                    if(this.globalFun.userAuth.checkAuth(this.auth,"4013")){
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
                                        path: '/areaManage/edit/' + params.row.id
                                    });
                                }
                            }
                        }, '编辑'))
                    }
                    if(this.globalFun.userAuth.checkAuth(this.auth,"4014")){
                         buttonList.push(h('Button', {
                            props: {
                                type: 'error',
                                size: 'small'
                            },
                            style: {
                                marginRight: '5px'
                            },
                            on: {
                                click: () => {
                                   this.del(params.row.id)
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
        getList(callback){
            this.$Spin.show();
            getList(this.searchParams).then(res => {
                if(res.code == 200) {
                    this.list = res.data.entities;
                    this.pageTotal = res.data.count;
                    if(callback){
                        callback();
                    }
                }
                this.$Spin.hide();
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
        add(){
            this.$router.push({
                path: '/areaManage/add'
            });
        },
        del(id){
            this.$Modal.confirm({
                content: '是否要删除当前记录?',
                onOk: () => {
                    del({id: id}).then(res=>{
                        if(res.code == 200){
                            this.$Message.success('删除成功');
                            this.search();
                        }
                    })
                }
            });
        }

    },
    mounted () {
        this.globalFun.userAuth.getAuth(data => {
            this.auth = data;
            this.init();
        })
    }
};
</script>
<style lang="less">
    @import '../../../common/styles/common.less';
</style>