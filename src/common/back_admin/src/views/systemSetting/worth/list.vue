<template>
    <div>
        <Row :gutter="10">
            <Col span="24">
                <Card>
                    <p slot="title">
                        token价值
                    </p>
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
import { } from '@/api/api_syetemParams.js'
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
                title: '名称'
            },{
                key: 'tokenWorth',
                title: '价值(元)',
            },{
                key: 'tokenNumber',
                title: '矿池量',
            },{
            key: 'updateTime',
            title: '修改时间',
            },{
                key: 'status',
                title: '操作',
                width: 200,
                render: (h, params) => {
                    let buttonList = [];
                   if(this.globalFun.userAuth.checkAuth(this.auth,"6031")){
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
                                        name: 'worth_edit',
                                        params:{
                                            id: params.row.id
                                        }
                                    });
                                }
                            }
                        }, '编辑'))
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
            // this.$Spin.show();
            this.list = [
                {
                    tokenWorth: "0.01",
                    tokenNumber: "66.123456",
                    id: 19,
                    name: "token价值",
                    updateTime:'2018-11-27 16:11'
                }
            ]
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