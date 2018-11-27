<template>
    <div>
        <Row :gutter="10">
            <Col span="24">
                <Card>
                    <p slot="title">
                        商品列表
                    </p>
                    <Row class="search">
                        <span class="lb">商品名称</span>
                        <Input v-model.trim="searchParams.name" style="width: 200px" />
                        
                        <span class="lb">商品分类</span>
                        <Select style="width:200px" v-model="searchParams.classLfyId" placeholder="全部">
                            <Option :value="``" >全部</Option>
                            <Option v-for="(item,index) of classifyList" :value="item.id" :key="index">{{ item.name }}</Option>
                        </Select>

                        <span class="btn">
                            <Button type="primary" icon="search" @click="search">搜索</Button>
                        </span>
                    </Row>
                    <div v-if="auth && globalFun.userAuth.checkAuth(auth,'3013')">
                        <Button type="primary" icon="plus-round" @click="add()">添加</Button>
                    </div>
                    <Row class="margin-top-10 searchable-table-con1">
                        <Table :columns="columns" :data="list" ></Table>
                    </Row>
                    <Page v-if="pageTotal>0" :current.sync="searchParams.pageNo"  :total="pageTotal" :page-size="searchParams.pageSize"  @on-change="convertPage" @on-page-size-change="convertPageSize" show-elevator show-total show-sizer :page-size-opts="[10,20,50]" placement="top"></Page>
                </Card>
            </Col>
        </Row>
        
        <Modal :width="500" class="preview-modal" class-name="vertical-center-modal" @on-cancel="cancel" v-model="modal.is" title="预览">
            <Row>
                <Col class="preview">
                    <div class="preview-block">
                        <img src="../../../common/images/shell.png">
                        <div class="preview-cnt">
                            <iframe :src="url" width="100%" height="100%" frameborder="0"  scrolling="auto"></iframe>
                        </div>
                    </div>
                </Col>
            </Row>
            <div slot="footer" style="height:0"></div>
        </Modal>
    </div>
</template>

<script>
import { goodsList,comboBoxClassLfy } from '../../../api/api_goods.js';
export default {
    data () {
        return {
            url:'',
            columns:[],
            list: [],
            page:1,
            pageTotal:0,            
            searchParams:{
                name: "",
                classLfyId: "",
                pageNo: 1,
                pageSize: 10
            },
            classifyList:[],
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
            this.getClassLfyList();
        });
    },
    methods: {
        getClassLfyList(){
            comboBoxClassLfy().then(res=>{
                if(res.code == 200){
                    this.classifyList = res.data;
                }
            })
        },
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
                key: 'address',
                title: '区块ID',
                width: 300
            },{
                key: 'name',
                title: '商品名称'
            },{
                key: 'classLfyName',
                title: '商品分类'
            },{
                key: 'sendStatus',
                title: '操作',
                width: 150,
                render: (h, params) => {
                    let buttonList = [];
                    if(this.globalFun.userAuth.checkAuth(this.auth,"3012")){
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
                                    this.preview(params.row)
                                }
                            }
                        }, '预览'))
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
            goodsList(this.searchParams).then(res=>{
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
        preview(params){
            //  http://testalb.xsl.one/#/NFC  开发
            //  http://120.77.243.133:8083/#/NFC  测试
            this.url = `http://120.77.243.133:8083/#/NFC?id=${params.address}`
            this.modal.is = true
        },
        cancel(){
            this.url = ''
        },
        add(){
            this.$router.push({
                name: 'goodsAdd'
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
        }
    }
};
</script>
<style lang="less">
    @import '../../../common/styles/common.less';
    @import './index.less';
</style>