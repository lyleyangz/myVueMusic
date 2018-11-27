
<template>
    <div>
        <Row class="edit">
            <Col class="goods">
                <Card>
                    <p slot="title">订单详情</p>
                    <div class="cnt">
                        <div class="title-block">订单号：{{contentList.oNum}}</div>
                        <div class="title-block">商品详情</div>
                        <Row>
                            <Col>
                                <div class="sku-table">
                                    <div class="th">
                                        <div>商品</div>
                                        <div>商品名称</div>
                                        <div>数量</div>
                                        <div>单价(元)</div>
                                    </div>
                                    <div class="td">
                                        <div><img :src="contentList.proUrl" alt=""></div>
                                        <div>{{contentList.proName}}</div>
                                        <div>{{contentList.proCount}}</div>
                                        <div>{{contentList.singlePrice}}</div>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                        <div class="title-block">订单详情</div>
                        <Row>
                            <Col span="8" class="item">
                                <span class="lb">买家账号：</span>                   
                                <span>{{contentList.buyer}}</span>  
                            </Col>
                            <!-- <Col span="8" class="item">
                                <span class="lb">买家微信号：</span>                   
                                <span>买家微信号</span>
                            </Col> -->
                            <Col span="8" class="item">
                                <span class="lb">订单现金总价（元）：</span>                   
                                <span>{{contentList.totalPrice}}</span>  
                            </Col>
                            <Col span="8" class="item">
                                <span class="lb">订单token：</span>                   
                                <span>{{contentList.integral}}</span>
                            </Col>
                            <Col span="8" class="item">
                                <span class="lb">订单通证：</span>                   
                                <span>{{contentList.vaac}}</span>  
                            </Col>
                            <Col span="8" class="item">
                                <span class="lb">配送费：</span>                   
                                <span>0.00</span>
                            </Col>
                            <!-- <Col span="8" class="item">
                                <span class="lb">订单类型：</span>                   
                                <span>{{contentList.vaac}}</span>
                            </Col> -->
                            <Col span="8" class="item">
                                <span class="lb">订单状态：</span>                   
                                <span>{{oStatusList[contentList.oStatus]}}</span>
                            </Col>
                            <Col span="8" class="item">
                                <span class="lb">下单时间：</span>                   
                                <span>{{contentList.createTime}}</span>
                            </Col>
                            <Col span="8" class="item">
                                <span class="lb">防伪溯源码：</span>                   
                                <span>{{contentList.createTime}}</span>
                            </Col>
                        </Row>
                        <div class="title-block">快递信息</div>
                        <Row>
                            <Col span="24" class="item">
                                <span class="lb">快递公司：</span>                   
                                <span>{{contentList.expressName}}</span>
                            </Col>
                            <Col span="24" class="item">
                                <span class="lb">快递单号：</span>                   
                                <span>{{contentList.expressNum}}</span>
                            </Col>
                            <Col span="24" class="item">
                                <span class="lb">收货人：</span>                   
                                <span>{{contentList.uName}}</span>
                            </Col>
                            <Col span="24" class="item">
                                <span class="lb">联系电话：</span>                   
                                <span>{{contentList.phone}}</span>
                            </Col>
                            <Col span="24" class="item">
                                <span class="lb">收货地址：</span>                   
                                <span>{{contentList.address}}</span>
                            </Col>
                        </Row>
                        <div class="title-block" v-if="contentList.oStatus == 4">评价信息</div>
                        <Row v-if="contentList.oStatus == 4">
                            <Col>
                                <div class="sku-table">
                                    <div class="th">
                                        <div>商品名称</div>
                                        <div>评分</div>
                                        <div>评论内容</div>
                                        <div>评论时间</div>
                                        <div>操作</div>
                                    </div>
                                    <div class="td">
                                        <div>{{contentList.proName}}</div>
                                        <div>
                                            <span class="f-ib star"></span>
                                            <span class="f-ib star"></span>
                                            <span class="f-ib star"></span>
                                            <span class="f-ib star"></span>
                                        </div>
                                        <div>好，非常好，相当的好</div>
                                        <div>2018-08-08</div>
                                        <div><span class="btn"><Button type="primary">审核</Button></span></div>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                        <!-- <div class="drawBack">
                            <div class="title-block">退货信息</div>
                            <Row>
                                <Col class="item">
                                    <span class="it">申请原因：</span>                   
                                    <span class="content">商品破损了请及时查看商品破损了请及时查看商品破损了请及时查看商品破损了请及时查看商品破损了请及时查看商品破损了请及时查看商品破损了请及时破损了请及时查看商品破损了请及时破损了请及时查看商品破损了请及时破损了请及时查看商品破损了请及时破损了请及时查看商品破损了请及时破损了请及时查看商品破损了请及时破损了请及时查看商品破损了请及时破损了请及时查看商品破损了请及时破损了请及时查看商品破损了请及时破损了请及时查看商品破损了请及时破损了请及时查看商品破损了请及时破损了请及时查看商品破损了请及时查看商品破损了请及时查看商品破损了请及时查看商品破损了， 请及时查看商品破损了， 请及时查看商品破损了， 请及时查看</span>
                                    <span class="btn"><Button type="primary">审核</Button></span>
                                </Col>
                                <Col class="img">
                                    <img src="../../../common/images/commodity.png" alt="">
                                    <img src="../../../common/images/commodity.png" alt="">
                                    <img src="../../../common/images/commodity.png" alt="">
                                </Col>
                            </Row>
                            <div class="title-block">订单与操作日志</div>
                            <Row class="margin-top-10 searchable-table-con1">
                                <Table :columns="columns" :data="list"></Table>
                            </Row>
                        </div> -->
                    </div>
                </Card>
            </Col>
        </Row>
    </div>
</template>

<script>
import { details } from '@/api/api_goodsOrder.js';
export default {
    data () {
        return {
            contentList:{},
            columns:[],
            id: this.$route.query.id,
            list:[{
                name:"张三",
                time:"8888-88-88",
                depict:"哈哈哈"
            }],
            skip: 1,
            oStatusList: {
                1:'未支付',
                2:'已支付',
                3:'已发货',
                4:'已收货'
            },
        };
    },
    mounted () { 
        this.globalFun.userAuth.getAuth(data=>{
            this.auth = data;
            this.init();
        });
    },
    methods: {
        init () {
            this.details()
            this.setColumns();
        },
         setColumns(){
            this.columns = [
            {
                key: 'name',
                title: '操作人'
            },{
                key: 'time',
                title: '操作时间',
            },{
                key: 'depict',
                title: '操作描述',
            }];
        },
        details(){
            this.$Spin.show()
            details({
                id:this.id
            }).then(res => {
            this.$Spin.hide()                
                if(res.code == 200) {
                    this.contentList = res.data || {}
                    console.log(this.contentList);
                }
            })
        }
    }
};
</script>
<style lang="less">
    @import '../../../common/styles/common.less';
    @import './detail.less';
</style>