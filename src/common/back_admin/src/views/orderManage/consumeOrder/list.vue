
<template>
    <div>
        <Row :gutter="10">
            <Col span="24">
                <Card>
                    <p slot="title">
                        订单列表
                    </p>
                    <Row class="search">
                        <span class="lb">买家账号</span>
                        <Input v-model.trim="searchParams.title" placeholder="请输入商品名称搜索..." style="width: 200px" />
                        <!-- <span class="lb">商品分类</span>
                        <Select style="width:200px" v-model="searchParams.top" placeholder="全部">
                            <Option :value="``" >全部</Option>
                            <Option v-for="(val,key) of statusList" :value="key" :key="key">{{ val }}</Option>
                        </Select>
                        <span class="lb">商品状态</span>
                        <Select style="width:200px" v-model="searchParams.top" placeholder="全部">
                            <Option :value="``" >全部</Option>
                            <Option v-for="(val,key) of statusList" :value="key" :key="key">{{ val }}</Option>
                        </Select>
                        <span class="lb">是否上架</span>
                        <Select style="width:200px" v-model="searchParams.top" placeholder="全部">
                            <Option :value="``" >全部</Option>
                            <Option v-for="(val,key) of statusList" :value="key" :key="key">{{ val }}</Option>
                        </Select> -->
                        <span class="btn"><Button type="primary" icon="search" @click="search">搜索</Button></span>
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
import { getList,deleteNotice } from '@/api/api_notice.js'
export default {
    data () {
        return {
            columns:[],
            list: [],
            page:1,
            pageTotal:0,
            searchParams:{
                title:"",
                top:"",
                pageNo: 1,
                pageSize: 10
            },
            statusList:{
                0: "是",
                1: "否"               
            },
            auth:"",
        };
    },
    methods: {
        init () {
            // this.getList()
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
            },{
                key: 'title',
                title: '订单号'
            },{
                key: 'subTitle',
                title: '商品名称',
            },{
                key: 'top',
                title: '商品分类',
                render: (h,params) => {
                    return h('div',[
                        h('span',{},params.row.top == 0 ? '是':'否')
                    ])
                }
            },{
                key: 'subTitle',
                title: '订单总价',
            },{
                key: 'top',
                title: '买家',
            },{
                key: 'top',
                title: '订单状态',
                render: (h,params) => {
                    return h('div',[
                        h('span',{},params.row.top == 0 ? '是':'否')
                    ])
                }
            },{
                key: 'status',
                title: '下单时间',
            }];
        },
        getList(callback){
            this.$Spin.show()
            getList(this.searchParams).then(res => {
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
        deleteNotice(id){
            this.$Modal.confirm({
                content: "是否要删除当前公告信息？",
                loading: false,
                onOk: () => {
                    this.$Spin.show();
                    deleteNotice({
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
        redirect(path) {
            this.$router.push({
                path: '/notice/add'
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