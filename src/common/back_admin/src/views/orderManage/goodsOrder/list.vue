
<template>
    <div>
        <Row :gutter="10">
            <Col span="24">
                <Card>
                    <p slot="title">
                        商品订单管理
                    </p>
                    <Row class="search">
                        <span class="lb">订单号</span>
                        <Input v-model.trim="searchParams.oNum" placeholder="请输入订单号搜索..." style="width: 200px" />
                        <span class="lb">商品名称</span>
                        <Input v-model.trim="searchParams.proName" placeholder="请输入商品名称搜索..." style="width: 200px" />
                        <!-- <span class="lb">订单类型</span>
                        <Select style="width:200px" v-model="searchParams.top" placeholder="全部">
                            <Option :value="``" >全部</Option>
                            <Option v-for="(val,key) of statusList" :value="key" :key="key">{{ val }}</Option>
                        </Select> -->
                        <span class="lb">消费类型</span>
                        <Select style="width:200px" v-model="searchParams.consumeType" placeholder="全部">
                            <Option :value="0" >全部</Option>
                            <Option v-for="(val,key) of feeStatusList" :value="key" :key="key">{{ val }}</Option>
                        </Select>
                        <span class="lb">订单状态</span>
                        <Select style="width:200px" v-model="searchParams.oStatus" placeholder="全部">
                            <Option :value="0" >全部</Option>
                            <Option v-for="(val,key) of oStatusList" :value="key" :key="key">{{ val }}</Option>
                        </Select>
                        <span class="lb">下单时间</span>
                        <DatePicker type="daterange" format="yyyy-MM-dd HH:mm" :value="dateValue" confirm placement="bottom-end" placeholder="开始时间 - 结束时间" style="width: 200px" @on-change="deteChange"></DatePicker>
                        <span class="btn"><Button type="primary" icon="search" @click="search">搜索</Button></span>
                    </Row>
                    <Row class="margin-top-10 searchable-table-con1">
                        <Table :columns="columns" :data="list"></Table>
                    </Row>
                    <Page v-if="pageTotal>0" :current.sync="page"  :total="pageTotal" :page-size="searchParams.pageSize"  @on-change="convertPage" @on-page-size-change="convertPageSize" show-sizer :page-size-opts="[10,20,50]" placement="top" show-elevator show-total></Page>
                </Card>
            </Col>
        </Row>
        <Modal :width="600" class="modal" v-model="sendGoodsModal.is" title="发货">
            <Row >
                <Col class="col_item">
                    <span class="lb"><em>*</em>快递名称：</span>
                    <span><Input v-model.trim="sendGoodsParams.expressName" :maxlength="30" placeholder="请输入快递名称" style="width: 300px" /></span>
                </Col>
                <Col class="col_item">
                    <span class="lb"><em>*</em>快递单号：</span>  
                    <span><Input v-model.trim="sendGoodsParams.expressNum" :maxlength="100" placeholder="请输入快递单号" style="width: 300px" /></span>
                </Col>
            </Row>
             <div slot="footer">
                <Button @click="sendGoodsModal.is=false">取消</Button>
                <Button @click="sendGoodsSubmit()" type="primary">确定</Button>
            </div>
        </Modal>

        <Modal :width="600" class="modal" v-model="deliveryModal.is" title="修改快递信息">
            <Row >
                <Col class="col_item">
                    <span class="lb"><em>*</em>快递模板：</span>
                    <Select style="width:300px" v-model="deliveryParams.delivery" placeholder="请选择">
                        <Option :value="``" >请选择</Option>
                        <Option v-for="(item,index) of templetList" :value="index" :key="index">{{ item.name }}</Option>
                    </Select>
                    
                </Col>
                <Col class="col_item">
                    <span class="lb"><em>*</em>是否包邮：</span>  
                    <span>
                        <RadioGroup v-model="deliveryParams.fee" v-for="(value,key) of feePostage" :key="key">
                            <Radio :label="key">
                                <span>{{value}}</span>
                            </Radio>
                        </RadioGroup>
                    </span>
                </Col>
                <Col class="col_item">
                    <span class="lb"><em>*</em>快递单号：</span>  
                    <span><Input v-model.trim="deliveryParams.num" :maxlength="100" placeholder="请输入快递单号" style="width: 300px" /></span>
                </Col>
            </Row>
             <div slot="footer">
                <Button @click="modal.is=false">取消</Button>
                <Button @click="submit()" type="primary">确定</Button>
            </div>
        </Modal>

        <Modal :width="600" class="modal" v-model="ExpressInfoModal.is" title="快递信息">
            <Row >
                <Col class="col_item">
                    <span class="lb">快递公司：</span>
                    <span>{{expressInfoList.expressName}}</span>
                </Col>
                <Col class="col_item">
                    <span class="lb">快递单号：</span>  
                    <span>{{expressInfoList.expressNum}}</span>
                </Col>
                <Col class="col_item">
                    <span class="lb">收货人：</span>  
                    <span>{{expressInfoList.uName}}</span>
                </Col>
                <Col class="col_item">
                    <span class="lb">联系电话：</span>  
                    <span>{{expressInfoList.phone}}</span>
                </Col>
                <Col class="col_item">
                    <span class="lb">收货地址：</span>  
                    <span>{{expressInfoList.address}}</span>
                </Col>
            </Row>
             <div slot="footer">
                <Button @click="ExpressInfoModal.is = !ExpressInfoModal.is" type="primary">确定</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
import { getList,sendGoods,expressInfo } from '@/api/api_goodsOrder.js'
export default {
    data () {
        return {
            columns:[],
            list: [],
            page:1,
            pageTotal:0,
            dateValue:[],
            searchParams:{
                oNum:"",
                proName:"",
                oStatus:0,
                consumeType:0,
                startTime:"",
                endTime:"",
                pageNo: 1,
                pageSize: 10
            },
            deliveryParams: {
                delivery:"",
                fee:"",
                num:""
            },
            feeStatusList:{
                1:'现金',
                2:'通证',
                3:'token', 
                4:'现金+通证',
                5:'现金+token'              
            },
            templetList:{
                0:"圆通快递",
                1:"中通快递",
                2:"顺丰快递",
                3:"百事快递"
            },
            feePostage:{
                1:"是",
                2:"否"
            },
            oStatusList: {
                // 1:'未支付',
                2:'已支付',
                3:'已发货',
                4:'已收货'
            },
            auth:"",
            id:"",
            sendGoodsModal: {
                is:false
            },
            sendGoodsParams:{
                oStatus:3
            },
            deliveryModal: {
                is:false
            },
            ExpressInfoModal:{
                is:false
            },
            expressInfoList:{}
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
                width: 62,
                render: (h, params) => {
                    return h('div', [
                        h('span', {}, (this.page-1)*this.searchParams.pageSize + params.index+1)
                    ]);
                }
            },{
                key: 'oNum',
                title: '订单号'
            },{
                key: 'proName',
                title: '商品',
                render: (h,params) => {
                    return [
                        h('div',{
                            class:'f-dib img',
                            style:"backgroundImage: url('"+params.row.proUrl+"')"
                        }),
                        h('div',{class:'f-dib'},[
                            h('p',{},params.row.proName),
                            h('p',{},'数量: '+params.row.proCount),
                            h('p',{},'单价(元): '+params.row.singlePrice)    
                        ])
                    ]
                }
            },{
                key: 'totalPrice',
                title: '订单总价',
                render: (h,params) => {
                    return h('div',[
                        // h('p',{},'总价: '+params.row.totalPrice),
                        h('p',{},'token: '+params.row.integral),
                        h('p',{},'通证: '+params.row.vaac)                        
                    ])
                }
            },{
                key: 'createTime',
                title: '下单时间',
            },{
                key:'createTime',
                title:'防伪溯源码'
            },
            // {
            //     key: 'top',
            //     title: '订单类型',
            //     render: (h,params) => {
            //         return h('div',[
            //             h('span',{},params.row.top == 0 ? '是':'否')
            //         ])
            //     }
            // },
            {
                key: 'oStatus',
                title: '订单状态',
                render: (h,params) => {
                    return h('div',[
                        h('span',{},this.oStatusList[params.row.oStatus])
                    ])
                }
            },{
                key: 'status',
                title: '操作',
                render: (h, params) => {
                    let buttonList = [];
                    if(this.globalFun.userAuth.checkAuth(this.auth,"6011")){
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
                                    this.$router.push({
                                        name:'goodsOrder_detail',query:{
                                            id:params.row.id
                                        }
                                    })
                                }
                            }
                        }, '查看详情'))
                    }
                    if(this.globalFun.userAuth.checkAuth(this.auth,"6011")){
                        if(params.row.oStatus == 2) {
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
                                        this.btn(params.row.id,1)
                                    }
                                }
                            }, '发货'))
                        }
                        // if(params.row.oStatus == 3) {
                        //     buttonList.push(h('Button', {
                        //         props: {
                        //             type: 'primary',
                        //             size: 'small'
                        //         },
                        //         style: {
                        //             marginRight: '5px'
                        //         },
                        //         on: {
                        //             click: () => {
                        //                 this.$router.push({
                        //                     name:'goodsOrder_detail',query:{
                        //                         id:params.row.id
                        //                     }
                        //                 })
                        //             }
                        //         }
                        //     }, '修改快递'))
                        // }
                        if(params.row.oStatus == 3 || params.row.oStatus == 4) {
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
                                        this.btn(params.row.id,2)
                                    }
                                }
                            }, '快递信息'))
                        }
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
        submit(){
            this.modal.is=false
        },
        deteChange(data){
            this.searchParams.startTime = data[0]
            this.searchParams.endTime = data[1]
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
        btn(id,index){
            this.id = id;
            switch(index) {
                case 1:
                this.sendGoodsModal.is = true;
                break;
                case 2:
                this.ExpressInfoModal.is = true;
                this.expressInfo()
                break;
            }
        },
        sendGoodsSubmit(){
            if(!this.sendGoodsParams.expressName) {
                this.$Message.error('请输入快递名称')
                return false
            }
            if(!this.sendGoodsParams.expressNum) {
                this.$Message.error('请输入快递单号')
                return false
            }
            this.sendGoodsParams.id = this.id
            sendGoods(this.sendGoodsParams).then(res => {
                if(res.code == 200) {
                    this.$Message.success('发货成功');
                    this.sendGoodsModal.is = false;
                    this.getList();
                    this.sendGoodsParams = {}
                }
            })
        },
        expressInfo(){
            expressInfo({
                id:this.id
            }).then(res => {
                if(res.code == 200){
                    this.expressInfoList = res.data;
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