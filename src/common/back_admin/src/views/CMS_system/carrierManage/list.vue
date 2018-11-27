<template>
    <div>
        <Row :gutter="10">
            <Col span="24">
                <Card>
                    <p slot="title">
                        承运人
                    </p>
                    <Row class="search">
                        <span class="lb">承运人ID</span>
                        <input v-limitNum class="ivu-input" v-model.trim="searchParams.id" style="width: 200px" />
                        
                        <span class="lb">承运人性别</span>
                        <Select style="width:200px" v-model="searchParams.sex" placeholder="全部">
                            <Option :value="``" >全部</Option>
                            <Option v-for="(value,key) of sexList" :value="key" :key="key">{{ value }}</Option>
                        </Select>
                        <span class="lb">承运人名称</span>
                        <Input v-model.trim="searchParams.name" style="width: 200px" />
                        <span class="btn">
                            <Button type="primary" icon="search" @click="search">搜索</Button>
                        </span>
                    </Row>
                    <div v-if="auth && globalFun.userAuth.checkAuth(auth,'4032')">
                        <Button type="primary" icon="plus-round" @click="add()">添加</Button>
                    </div>
                    <Row class="margin-top-10 searchable-table-con1">
                        <Table :columns="columns" :data="list" ></Table>
                    </Row>
                    <Page v-if="pageTotal>0" :current.sync="searchParams.pageNo"  :total="pageTotal" :page-size="searchParams.pageSize"  @on-change="convertPage" @on-page-size-change="convertPageSize" show-sizer :page-size-opts="[10,20,50]" placement="top"  show-elevator show-total></Page>
                </Card>
            </Col>
        </Row>
        
        <Modal :width="500" class="preview-modal" class-name="vertical-center-modal" v-model="modal.is" title="预览">
            <Row>
                <Col class="preview">
                    <div class="preview-block">
                        <img src="../../../common/images/shell.png">
                        <div class="preview-cnt">
                            <iframe src="http://120.77.243.133:8083" width="100%" height="100%" frameborder="0"  scrolling="auto"></iframe>
                        </div>
                    </div>
                </Col>
            </Row>
            <div slot="footer" style="height:0"></div>
        </Modal>
    </div>
</template>

<script>
import { carrierList,delCarrier } from '../../../api/api_carrierManage.js';
export default {
    data () {
        return {
            columns:[],
            list: [],
            page:1,
            pageTotal:0,            
            searchParams:{
                id: null,
                name: "",
                sex: "",
                pageNo: 1,
                pageSize: 10
            },
            sexList:{
                "0": "男",
                "1": "女"
            },
            modal:{
                is: false
            },
            auth:"",
        };
    },
    mounted () {
        this.globalFun.userAuth.getAuth(data => {
            this.auth = data;
            this.init();
        })
        
    },
    methods: {
        init() {
            this.setColumns();
            this.getList();
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
                key: 'id',
                title: '承运人ID',
                width: 100
            },{
                key: 'name',
                title: '承运人姓名'
            },{
                key: 'sex',
                title: '性别',
                render: (h, params) => {
                    return h('div', [
                        h('span', {}, this.sexList[params.row.sex])
                    ]);
                }
            },{
                key: 'drivingLicenseType',
                title: '驾驶证类型'
            },{
                key: 'sendStatus',
                title: '操作',
                width: 250,
                render: (h, params) => {
                    let buttonList = [];
                    if(this.globalFun.userAuth.checkAuth(this.auth,"4033")) {
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
                                        name: 'carrier_edit',
                                        params:{
                                            id: params.row.id
                                        }
                                    });
                                }
                            }
                        }, '编辑'))
                    }
                   if(this.globalFun.userAuth.checkAuth(this.auth,"4034")) {
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
            carrierList(this.searchParams).then(res=>{
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
            this.$router.push({
                name: 'carrier_add'
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
        del(id){
            this.$Modal.confirm({
                content: '是否要删除当前记录?',
                onOk: () => {
                    delCarrier({id: id}).then(res=>{
                        if(res.code == 200){
                            this.$Message.success('删除成功');
                            this.search();
                        }
                    })
                }
            });
        }
    }
};
</script>
<style lang="less">
    @import '../../../common/styles/common.less';
</style>