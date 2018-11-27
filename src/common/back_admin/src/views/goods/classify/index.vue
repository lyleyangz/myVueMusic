<template>
    <div>
        <Row :gutter="10">
            <Col span="24">
                <Card>
                    <p slot="title">
                        商品分类
                    </p>
                    <Row class="search">
                        <span class="lb">分类名称</span>
                        <Input v-model.trim="searchParams.name" style="width: 200px" />
                        
                        <span class="btn">
                            <Button type="primary" icon="search" @click="search">搜索</Button>
                        </span>
                    </Row>
                    <div v-if="auth && globalFun.userAuth.checkAuth(auth,'4062')">
                        <Button type="primary" icon="plus-round" @click="add()">添加</Button>
                    </div>
                    <Row class="margin-top-10 searchable-table-con1">
                        <Table :columns="columns" :data="list" ></Table>
                    </Row>
                    <Page v-if="pageTotal>0" :current.sync="page"  :total="pageTotal" :page-size="searchParams.pageSize"  @on-change="convertPage" @on-page-size-change="convertPageSize" show-elevator show-total show-sizer :page-size-opts="[10,20,50]" placement="top"></Page>
                </Card>
            </Col>
        </Row>

        <Modal :width="500" class="modal" class-name="vertical-center-modal" v-model="modal.is" title="添加分类">
            <Row>
                <Col>
                    <span class="lb"><em>*</em>分类名称：</span>
                    <span><Input v-model.trim="params.name" style="width: 300px" placeholder="限制50字" :maxlength="50"/></span>
                </Col>
                <Col>
                    <span class="lb"><em>*</em>分类排序：</span>
                    <span><InputNumber :max="20" :min="1" v-model="params.sort" style="width:300px" placeholder="请输入1-20的数字"></InputNumber></span>
                </Col>
                <Col >
                    <span class="lb">分类图片：</span>
                    <span><my-upload :uploadList="uploadList"></my-upload></span>
                </Col>
                <Col>
                    <span class="lb"></span>
                    <span>图标尺寸为25*25比例，大小不能超过200KB，图片只能为jpg、png</span>
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
import {classLfyList,addClassLfy,updateClassLfy } from '../../../api/api_goods.js';
import myUpload from '@/views/my-components/my-upload/upload';
export default {
    data () {
        return {
            columns:[],
            list: [],
            page:1,
            pageTotal:0,     
            uploadList: [],       
            searchParams:{
                name: "",
                pageNo: 1,
                pageSize: 10
            },
            params:{
                name: "",
                sort:null
            },
            modal:{
                is: false
            },
            auth: ""
        };
    },
    components: {
        myUpload
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
                title: '分类名称'
            },{
                key: 'sendStatus',
                title: '操作',
                width: 250,
                render: (h, params) => {
                    let buttonList = [];
                    if(this.globalFun.userAuth.checkAuth(this.auth,'4063')){
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
                                    this.edit(params.row);
                                }
                            }
                        }, '编辑'));
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
            classLfyList(this.searchParams).then(res => {
                if(res.code == 200){
                    this.list = res.data.entities;
                    this.pageTotal = res.data.count;
                    if(callback){
                        callback();
                    }
                }
                this.$Spin.hide();
            })
        },
        add(){
            this.params = {};
            this.uploadList = [];
            this.modal.is = true;
        },
        save(){
            if(!this.params.name){
                this.$Message.error('分类名称不能为空');
                return false;
            }

            if(this.uploadList.length>0){
                var uploadList = [];
                this.uploadList.forEach((item,index)=>{
                    uploadList.push(item.url)
                })
                this.params.icon = uploadList.join(",");
            }
            if(this.params.id){
                updateClassLfy(this.params).then(res => {
                    if(res.code == 200){
                        this.modal.is = false;
                        this.$Message.success('修改成功');
                        this.getList();
                    }
                })
            }else{
                addClassLfy(this.params).then(res => {
                    if(res.code == 200){
                        this.modal.is = false;
                        this.$Message.success('添加成功');
                        this.search();
                    }
                })
            }
        },
        edit(item){
            var icon = item.icon
            this.params = {
                id: item.id,
                name: item.name,
                icon: icon
            }
            this.uploadList = [];
            if(icon){
                var uploadList = [];
                icon.split(",").forEach((item,index)=>{
                    uploadList.push({url:item})
                })
                this.uploadList = uploadList;
            }
            this.modal.is = true;
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