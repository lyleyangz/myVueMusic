<template>
    <div>
        <Row :gutter="10">
            <Col span="24">
                <Card>
                    <p slot="title">
                        现场监控
                    </p>
                    <Row class="search">
                        <span class="lb">监控名称</span>
                        <Input v-model.trim="searchParams.monitorName" placeholder="请输入监控名称搜索..." style="width: 200px" />
                        
                        <span class="btn">
                            <Button type="primary" icon="search" @click="search">搜索</Button>
                        </span>
                    </Row>
                    <div v-if="auth && globalFun.userAuth.checkAuth(auth,'4052')">
                        <Button type="primary" icon="plus-round" @click="add()">添加</Button>
                    </div>
                    <Row class="margin-top-10 searchable-table-con1">
                        <Table :columns="columns" :data="list" ></Table>
                    </Row>
                    <Page v-if="pageTotal>0" :current.sync="searchParams.pageNo"  :total="pageTotal" :page-size="searchParams.pageSize"  @on-change="convertPage" @on-page-size-change="convertPageSize" show-sizer :page-size-opts="[10,20,50]" placement="top" show-elevator show-total></Page>
                </Card>
            </Col>
        </Row>

        <Modal :width="600" class="modal" v-model="modal.is" :title="params.id?'编辑监控':'添加监控'">
            <Row>
                <Col>
                    <span class="lb"><em>*</em>监控地点名称：</span>
                    <span><Input v-model="params.monitorName" :maxlength="100" placeholder="限制100个字" style="width: 400px" /></span>
                </Col>
                <Col>
                    <span class="lb"><em>*</em>监控路径：</span>
                    <span><Input v-model="params.monitorUrl" :maxlength="300" placeholder="限制300个字" style="width: 400px" /></span>
                </Col>
            </Row>
            <div slot="footer">
                <Button @click="modal.is=false">取消</Button>
                <Button @click="submit()" type="primary">提交</Button>
            </div>
        </Modal>
        
    </div>
</template>

<script>
import { getList,addMonitor,editMonitor,delMonitor } from '@/api/api_monitor.js'
export default {
    data () {
        return {
            columns:[],
            list: [],
            page:1,
            pageTotal:0,
            searchParams:{
                monitorName: "",
                pageNo: 1,
                pageSize: 10
            },
            params:{
                monitorName:"",
                monitorUrl:"",
                id:"",
            },
            modal:{
                is: false
            },
            auth:""
        };
    },
    methods: {
        init () {
            this.getList();
            this.setColumns();
        },
        setColumns(){
            this.columns = [{
                key: 'seq',
                title: '序号',
                width: 100,
                render: (h, params) => {
                    return h('div', [
                        h('span', {}, (this.page-1)*this.searchParams.pageSize + params.index+1)
                    ]);
                }
            },{
                key: 'monitorName',
                title: '监控名称'
            },{
                key: 'monitorUrl',
                title: '监控路径'
            },{
                key: 'status',
                title: '操作',
                width: 250,
                render: (h, params) => {
                    let buttonList = [];
                   if(this.globalFun.userAuth.checkAuth(this.auth,"4053")){
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
                                    this.edit(params.row);
                                }
                            }
                        }, '编辑'))
                   }
                   if(this.globalFun.userAuth.checkAuth(this.auth,"4054")){
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
                                    this.del(params.row.id);
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
                this.$Spin.hide();
                if (res.code == '200') {
                    this.list = res.data.entities
                    this.pageTotal = res.data.count;
                    if(callback){
                        callback();
                    }
                }
            });
        },
        add(){
           this.modal.is = true;
           this.params = {};
        },
        submit() {
            if (!this.params.monitorName) {
                this.$Message.error("请输入监控地点名称");
                return false;
            }
            if (!this.params.monitorUrl) {
                this.$Message.error("请输入监控地点路径");
                return false;
            }
            if(this.params.id){
                editMonitor(this.params).then(res => {
                    if(res.code == 200) {
                        this.$Message.success('编辑成功')
                        this.modal.is = !this.modal.is;
                        this.getList();
                    }
                })
            }else{
                addMonitor(this.params).then(res => {
                    if(res.code == 200) {
                        this.$Message.success('添加成功')
                        this.modal.is = !this.modal.is;
                        this.getList();
                    }
                })
            }
        },
        edit(item){
            this.modal.is = true;
            this.params.id = item.id
            this.params.monitorName = item.monitorName
            this.params.monitorUrl = item.monitorUrl            
        },
        del(id){
            this.$Modal.confirm({
            content: "是否要删除当前用户？",
            loading: false,
            onOk: () => {
                this.$Spin.show();
                delMonitor({
                    id: id,
                }).then(res => {
                    this.$Spin.hide();
                    if(res.code == 200){
                        this.$Message.success('删除成功');
                    }
                    this.getList();
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
    @import './list.less';
</style>