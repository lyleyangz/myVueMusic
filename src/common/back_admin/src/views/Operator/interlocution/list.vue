
<template>
    <div>
        <Row :gutter="10">
            <Col span="24">
                <Card>
                    <p slot="title">
                        百问百答
                    </p>
                    <Row class="search">
                        <span class="lb">分类</span>
                        <Input v-model.trim="params.questionType" placeholder="请输入分类搜索..." style="width: 350px" />
                        <span class="lb">标题</span>
                        <Input v-model.trim="params.title" placeholder="请输入标题搜索..." style="width: 350px" />
                        <span class="btn"><Button type="primary" icon="search" @click="search">搜索</Button></span>
                    </Row>
                    <div v-if="auth && globalFun.userAuth.checkAuth(auth,'5012')">
                        <Button type="primary" icon="plus-round" @click="redirect()">添加</Button>
                    </div>
                    <Row class="margin-top-10 searchable-table-con1">
                        <Table :columns="columns" :data="list"></Table>
                    </Row>
                    <Page v-if="pageTotal>0" :current.sync="page"  :total="pageTotal" :page-size="params.pageSize"  @on-change="convertPage" @on-page-size-change="convertPageSize" show-sizer :page-size-opts="[10,20,50]" placement="top" show-elevator show-total></Page>
                </Card>
            </Col>
        </Row>
    </div>
</template>

<script>
import { getList , deleteInterlocution} from '@/api/api_interlocution.js'
export default {
    data () {
        return {
            columns:[],
            list: [],
            page:1,
            pageTotal:0,
            params:{
                title:"",
                questionType:"",
                pageNo: 1,
                pageSize: 10
            },
            statusList:{
                0: "是",
                1: "否"               
            },
            auth: ""
        };
    },
    methods: {
        init () {
            this.getList()
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
                        h('span', {}, (this.page-1)*this.params.pageSize + params.index+1)
                    ]);
                }
            },{
                key: 'questionType',
                title: '分类'
            },{
                key: 'title',
                title: '标题',
            },{
                key: 'questionNumber',
                title: '分类排序',
            },{
                key: 'status',
                title: '操作',
                render: (h, params) => {
                    let buttonList = [];
                    if(this.globalFun.userAuth.checkAuth(this.auth,"5013")){
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
                                        name:'interlocution_edit',query:{
                                            id:params.row.id
                                        }
                                    })
                                }
                            }
                        }, '编辑'))
                    }
                    if(this.globalFun.userAuth.checkAuth(this.auth,"5014")){
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
                                    this.delete(params.row.id)
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
            this.$Spin.show()
            getList(this.params).then(res => {
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
        delete(id){
            this.$Modal.confirm({
                content: "是否要删除当前问答？",
                loading: false,
                onOk: () => {
                    this.$Spin.show();
                    deleteInterlocution({
                        id: id,
                    }).then(res => {
                        this.$Spin.hide();
                        if(res.code == 200){
                            this.$Message.success('删除成功');
                            this.getList();
                        }
                    });
                }
            }); 
        },
        // 搜索
        search(){
            this.params.pageNo = 1;
            this.getList(() => {
                this.page = 1;
            });
        },
        // 选择页数
        convertPage(index){ 
            this.params.pageNo = index;
            this.getList(() => {
                this.page = index;
            });
        },
        convertPageSize(size){
            this.params.pageSize = size;
            this.getList();
        },
        //  页面跳转
        redirect(path) {
            this.$router.push({
                path: '/interlocution/add'
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