
<template>
    <Row class="home-main">
        <!-- <Col>
            <Card class="shortcut">
                <p slot="title">运营快捷入口</p>
                <div class="shortcut-list">
                    <ul>
                        <li v-for="(item,index) in shortcutList" :key='index' @click="$router.push({path:item.url})"><Icon :type="item.icon" color="#999" size="60"/><p>{{item.text}}</p></li>
                    </ul>
                </div>
            </Card>
        </Col> -->
        <Col v-if="auth && globalFun.userAuth.checkAuth(auth,'1011')">
            <Card class="goods-count">
                <p slot="title">溯源商品统计</p>
                <div class="goodsCount-list f-cb">
                    <div class="count f-fl">
                        <infor-card
                            id-name="today_count"
                            :end-val= endVal.currentDayCount
                            iconType="ios-eye"
                            color="#2d8cf0"
                            :iconSize="50"
                            intro-text="今日"
                        ></infor-card>
                    </div>
                    <div class="count f-fl">
                        <infor-card
                            id-name="week_count"
                            :end-val= endVal.last7DayCount
                            iconType="ios-eye"
                            color="#2d8cf0"
                            intro-text="近七天"
                        ></infor-card>
                    </div>
                    <div class="count f-fl">
                        <infor-card
                            id-name="month_count"
                            :end-val= endVal.last30DayCount
                            iconType="ios-eye"
                            color="#2d8cf0"
                            intro-text="近三十天"
                        ></infor-card>
                    </div>
                    <div class="count f-fl">
                        <infor-card
                            id-name="whole_count"
                            :end-val= endVal.countAll
                            iconType="stats-bars"
                            color="#64d572"
                            :iconSize="50"
                            intro-text="全部溯源商品"
                        ></infor-card>
                    </div>
                </div>
            </Card>
        </Col>
        <!-- <Col>
            <Card class="goods-count">
                 <p slot="title">用户统计</p>
                <div class="goodsCount-list f-cb">
                    <div class="count f-fl">
                        <infor-card
                            id-name="user-today_count"
                            :end-val="30"
                            iconType="ios-personadd"
                            color="#2d8cf0"
                            :iconSize="50"
                            intro-text="今日新增"
                        ></infor-card>
                    </div>
                    <div class="count f-fl">
                            <infor-card
                                id-name="user-yesterday_count"
                                :end-val="699"
                                iconType="ios-personadd"
                                color="#2d8cf0"
                                intro-text="昨日新增"
                            ></infor-card>
                    </div>
                    <div class="count f-fl">
                            <infor-card
                                id-name="user-month_count"
                                :end-val="7000"
                                iconType="ios-personadd"
                                color="#2d8cf0"
                                intro-text="本月新增"
                            ></infor-card>
                    </div>
                    <div class="count f-fl">
                        <infor-card
                            id-name="user-whole_count"
                            :end-val="90000"
                            iconType="ios-people"
                            color="#64d572"
                            :iconSize="50"
                            intro-text="会员总数"
                        ></infor-card>
                    </div>
                </div>   
            </Card>
        </Col> -->
        <Col v-if="auth && globalFun.userAuth.checkAuth(auth,'1012')">
            <Card class="ratioCount">
            <p slot="title">NFC使用次数统计</p>
            <Row class="filter">
                <Col>
                <div class="statistics f-cb">
                    <div class="count f-fl">
                        <infor-card
                            id-name="tsday_count"
                            :end-val="countNFC.todayCount || 0"
                            iconType="pie-graph"
                            color="#2d8cf0"
                            intro-text="今日新增"
                        ></infor-card>
                    </div>
                    <div class="count f-fl">
                        <infor-card
                            id-name="tswk_count"
                            :end-val="countNFC.weekCount || 0"
                            iconType="pie-graph"
                            color="#2d8cf0"
                            intro-text="本周总数"
                        ></infor-card>
                    </div>
                    <div class="count f-fl">
                        <infor-card
                            id-name="tsmonth_count"
                            :end-val="countNFC.monthCount || 0"
                            iconType="pie-graph"
                            color="#2d8cf0"
                            intro-text="本月总数"
                        ></infor-card>
                    </div>
                </div>   
                </Col>
                <Col>
                    <span>近一周NFC使用统计 </span>
                    <span class="screening-conditions f-fr">
                        <RadioGroup v-model="params.type" type="button" @on-change="selectChange">
                            <Radio label="1"><span>本周</span></Radio>
                            <Radio label="2"><span>本月</span></Radio>
                            <!-- <Radio label="3"><span>今日</span></Radio> -->
                        </RadioGroup>
                        <span>
                            <DatePicker type="daterange" :value="dateValue" confirm placement="bottom-end" placeholder="开始时间 - 结束时间" style="width: 300px" @on-change="deteChange"></DatePicker>
                        </span>                                                
                    </span>
                </Col>
                <Col style="min-height:500px;">
                    <chart-line :lineList="ratioCountInfo.data" v-if="ratioCountInfo.data.length>0 && !convertFont"></chart-line>
                </Col>
            </Row>
        </Card>
        </Col>
    </Row>
</template>

<script>
import { getCountGoods,getNFC,getCountNFC } from "@/api/api_home.js";
import inforCard from "./components/inforCard";
import chartLine from "./components/chart-line";
import Big from "big.js";
import eventBus from '../../common/evnetBus/eventBus.js'
export default {
  name: "home",
  data() {
    return {
      dateValue: [],
      Big: Big,
      convertFont: false,
      ratioCountInfo: {
        data: []
      },
      today: 12,
      shortcutList: [
        {
          icon: "android-add-circle",
          text: "添加商品",
          url: "goods/list/add"
        },
        {
          icon: "ios-people",
          text: "会员管理",
          url: "account/member"
        },
        {
          icon: "ios-location",
          text: "场地管理",
          url: "CMS_system/areaManage"
        },
        {
          icon: "android-person",
          text: "珠宝大师管理",
          url: "CMS_system/greatMasterManage"
        },
        {
          icon: "android-person",
          text: "承运人管理",
          url: ""
        },
        {
          icon: "stats-bars",
          text: "商场管理",
          url: ""
        }
      ],
      endVal: {
        currentDayCount: 10,
        last7DayCount: 20,
        last30DayCount: 30,
        countAll: 40
      },
      countNFC:{
          todayCount:0,
          weekCount:0,
          monthCount:0
      },
      params:{
          type:"1",
      },
      auth:""
    };
  },
  created() {
    eventBus.$on('convertFont', () => {
        this.convertFont = true;
        setTimeout(() => {
            this.convertFont = false;
        }, 500);
    });  
  },
  mounted() {
		this.globalFun.userAuth.getAuth(data=>{
            this.auth = data;
            this.init();
        });
	},
  methods: {
      init() {
        this.getCountGoods()
        this.getNFC(this.params)
        this.getCountNFC()
      },
      selectChange(){
          var _this = this
          switch(_this.params.type){
              case '1':
              _this.params = {
                  type: _this.params.type,
              }
              break;
              case '2':
              _this.params = {
                  type: _this.params.type,
              }
              break;
              default:
              _this.params = {
                  type: _this.params.type,
              }
          }
          this.getNFC(_this.params)
          
      },
    deteChange(data) {
        let params = {
            type:"4",
            startTime: data[0],
            endTime: data[1],
        }
        this.getNFC(params)
    },
    getNFC(params){
        this.params = params
        getNFC(this.params).then(res => {
            if(res.code == 200) {
                this.ratioCountInfo.data = res.data || [];
                eventBus.$emit('convertFont');
            }
        })
    },
    getCountGoods() {
        this.$Spin.show()
        getCountGoods().then(res => {
            this.$Spin.hide()
            if(res.code == 200) {
                this.endVal = res.data
            }
        })
    },
    getCountNFC() {
        getCountNFC().then(res => {
            if(res.code == 200) {
                this.countNFC = res.data
            }
        })
    }
  },
  components: {
    "infor-card": inforCard,
    "chart-line": chartLine
  }
};
</script>
<style lang="less">
@import "../../common/styles/common.less";
@import "./home.less";
</style>