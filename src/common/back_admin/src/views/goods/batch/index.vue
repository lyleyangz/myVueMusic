<template>
    <div>
        <Row :gutter="10">
            <Col span="24">
                <Card>
                    <p slot="title">
                        商品批次
                    </p>
                    <Row class="search">
                        <span class="lb">商品批次</span>
                        <Input v-model.trim="searchParams.name" style="width: 200px" />
                        <span class="btn">
                            <Button type="primary" icon="search" @click="search">搜索</Button>
                        </span>
                    </Row>
                    <div v-if="auth && globalFun.userAuth.checkAuth(auth,'3032')">
                        <Button type="primary" icon="plus-round" @click="add()">添加</Button>
                    </div>
                    <Row class="margin-top-10 searchable-table-con1">
                        <Table :columns="columns" :data="list" ></Table>
                    </Row>
                    <Page v-if="pageTotal>0" :current.sync="searchParams.pageNo"  :total="pageTotal" :page-size="searchParams.pageSize"  @on-change="convertPage" @on-page-size-change="convertPageSize" show-elevator show-total show-sizer :page-size-opts="[10,20,50]" placement="top"></Page>
                </Card>
            </Col>
        </Row>
        <Modal :width="500" class="modal" v-model="modal.is" title="添加批次">
            <Row>
                <Col>
                    <span class="lb"><em>*</em>商品批次：</span>
                    <span><Input v-model.trim="params.name" style="width: 300px" :maxlength="50" placeholder="限制50字" /></span>
                </Col>
            </Row>
            <div slot="footer">
                <Button @click="modal.is=false">取消</Button>
                <Button type="primary" @click="save">提交</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
import {batchList,addBatch } from '../../../api/api_goods.js';
export default {
    data () {
        return {
            columns:[],
            list: [],
            page:1,
            pageTotal:0,            
            searchParams:{
                name: "",
                pageNo: 1,
                pageSize: 10
            },
            params:{
                name:""
            },
            modal:{
                is: false
            },
            auth: ""
        };
    },
    mounted () {
        this.globalFun.userAuth.getAuth(data=>{
            this.auth = data;
            this.setColumns();
            this.getList();
        });
    },
    methods: {
        setColumns(){
            this.columns = [{
                key: 'seq',
                title: '序号',
                width: 62,
                render: (h, params) => {
                    return h('div', [
                        h('span', {}, (this.page-1)*this.searchParams.pageSize + params.index+1)
                    ]);
                }
            },{
                key: 'name',
                title: '商品批次'
            },{
                key: 'createTime',
                title: '创建日期',
                width: 160,
                render: (h, params) => {
                    return h('div', [
                        h('span', {}, this.globalFun.dateFormat(params.row.createTime, 'yyyy-MM-dd hh:mm:ss'))
                    ]);
                }
            }];
        },
        getList(callback){
            this.$Spin.show();
            batchList(this.searchParams).then(res =>{
                if(res.code == 200){
                    this.list = res.data.entities;
                    this.pageTotal = res.data.count;
                    if(callback){
                        callback();
                    }
                }
                this.$Spin.hide();
            });
        },
        add(){
            this.params.name = "";
            this.modal.is = true;
        },
        save(){
            if(!this.params.name){
                this.$Message.error('批次名称不能为空');
                return false;
            }
            addBatch(this.params).then(res => {
                if(res.code == 200){
                    this.modal.is = false;
                    this.$Message.success('添加成功');
                    this.search();
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
        }
    },
    
};
</script>
<style lang="less">
    @import '../../../common/styles/common.less';
    @import './index.less';
</style>