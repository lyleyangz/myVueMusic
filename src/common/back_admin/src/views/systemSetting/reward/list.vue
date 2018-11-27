<template>
    <div>
        <Row :gutter="10">
            <Col span="24">
                <Card>
                    <p slot="title">
                        token奖励设置
                    </p>
                    <Row class="search">
                        <span class="lb">类型</span>
                        <Input v-model.trim="searchParams.paramName"  style="width: 200px" />
                        
                        <span class="btn">
                            <Button type="primary" icon="search" @click="search">搜索</Button>
                        </span>
                    </Row>
                    <Row class="margin-top-10 searchable-table-con1">
                        <Table :columns="columns" :data="list" ></Table>
                    </Row>
                    <Page v-if="pageTotal>0" :current.sync="searchParams.pageNo"  :total="pageTotal" :page-size="searchParams.pageSize"  @on-change="convertPage" @on-page-size-change="convertPageSize" show-sizer :page-size-opts="[10,20,50]" placement="top" show-elevator show-total></Page>
                </Card>
            </Col>
        </Row>

      
        
    </div>
</template>

<script>
import { scoreList,updateStatus } from '@/api/api_syetemParams.js'
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
                paramName:"",
                paramUrl:"",
                id:"",
            },
            modal:{
                is: false
            },
            auth: ""
        };
    },
    methods: {
        init () {
            
            this.setColumns();
            this.getList();
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
                key: 'name',
                title: '类型'
            },{
                key: 'detail',
                title: '详解'
            },{
                key: 'score',
                title: '奖励数值'
            },{
                key: 'createTime',
                title: '创建时间',
                width: 140,
            },{
                key: 'updateTime',
                title: '最近编辑时间',
                width: 140,
            },{
                key: 'status',
                title: '操作',
                width: 200,
                render: (h, params) => {
                    let buttonList = [];
                   if(this.globalFun.userAuth.checkAuth(this.auth,"6023")){
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
                                        name: 'reward_edit',
                                        params:{
                                            id: params.row.id
                                        }
                                    });
                                }
                            }
                        }, '修改奖励值'))
                   }
                   if(this.globalFun.userAuth.checkAuth(this.auth,"6024")){
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
                                    this.updateStatus(params.row);
                                }
                            }
                        }, params.row.status==1?'关闭':'开启'))
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
            scoreList(this.searchParams).then(res=>{
                this.$Spin.hide();
                if (res.code == '200') {
                    this.list = res.data.entities
                    this.pageTotal = res.data.count;
                    if(callback){
                        callback();
                    }
                }
            })
        },
        updateStatus(item){
            var status = item.status == 1?2:1;
            this.$Modal.confirm({
                content: '是否要'+(status==1?'开启':'关闭')+'当前记录?',
                onOk: () => {
                    updateStatus({
                        id: item.id,
                        status: status
                    }).then(res=>{
                        if(res.code == 200){
                            this.$Message.success('提交成功');
                            this.search();
                        }
                    })
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