<template>
    <div>
        <Row :gutter="10">
            <Col span="24">
                <Card>
                    <p slot="title">
                        商品模板
                    </p>
                    <Row class="search">
                        <span class="lb">模板类型</span>
                        <Select style="width:200px" v-model="searchParams.classlfyId" placeholder="请选择">
                            <Option :value="``" >请选择</Option>
                            <Option v-for="(item,index) of classifyList" :value="item.id" :key="index">{{ item.name }}</Option>
                        </Select>

                        <span class="lb">模板名称</span>
                        <Input v-model.trim="searchParams.name" placeholder="请输入模板名称搜索..." style="width: 200px" />

                        <span class="btn">
                            <Button type="primary" icon="search" @click="search">搜索</Button>
                        </span>
                    </Row>
                    <Row class="margin-top-10 searchable-table-con1">
                        <Table :columns="columns" :data="list" ></Table>
                    </Row>
                    <Page v-if="pageTotal>0" :current.sync="searchParams.pageNo"  :total="pageTotal" :page-size="searchParams.pageSize"  @on-change="convertPage" @on-page-size-change="convertPageSize"  show-elevator show-total show-sizer :page-size-opts="[10,20,50]" placement="top"></Page>
                </Card>
            </Col>
        </Row>
        
    </div>
</template>

<script>
import { templetList,addTemplet,delTemplet,comboBoxClassLfy } from '../../../api/api_goods.js';
export default {
    data () {
        return {
            columns:[],
            list: [],
            page:1,
            pageTotal:0,            
            searchParams:{
                name: "",
                classlfyId: "",
                pageNo: 1,
                pageSize: 10
            },
            classifyList:[]
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
                key: 'classlfyName',
                title: '模板类型',
                width: 200,
            },{
                key: 'name',
                title: '模板名称'
            },{
                key: 'createTime',
                title: '创建日期',
                width: 160,
                render: (h, params) => {
                    return h('div', [
                        h('span', {}, this.globalFun.dateFormat(params.row.createTime, 'yyyy-MM-dd hh:mm:ss'))
                    ]);
                }
            },{
                key: 'sendStatus',
                title: '操作',
                width: 250,
                render: (h, params) => {
                    let buttonList = [];
                    if(this.globalFun.userAuth.checkAuth(this.auth,'3042')){
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
            templetList(this.searchParams).then(res=>{
                if(res.code == 200){
                    this.list = res.data.entities;
                    this.pageTotal = res.data.count;
                    if(callback){
                        callback();
                    }
                }
                this.$Spin.hide();
            });
            
            // this.selectionsArr.length = 0;
            // getNoticeList(this.searchParams).then(res => {
            //     this.$Spin.hide();
            //     if (res.code == '200') {
            //         this.list = res.data? res.data.entities: [];
            //         this.list.forEach((element) => {
            //             element.checked = true;
            //             element.createBy = element.createBy? element.createBy: '--';
            //             element.channel = element.channel? this.moduleType[element.channel]: '--'
            //         });
            //         this.pageTotal = res.data.count;
            //         if(callback){
            //             callback();
            //         }
            //     }
            // });
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
        del(id){
            this.$Modal.confirm({
                content: '是否要删除当前记录?',
                onOk: () => {
                    delTemplet({id: id}).then(res=>{
                        if(res.code == 200){
                            this.$Message.success('删除成功');
                            this.search();
                        }
                    })
                }
            });
        },
        
    }
};
</script>
<style lang="less">
    @import '../../../common/styles/common.less';
    @import './index.less';
</style>