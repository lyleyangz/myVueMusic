
<template>
    <div>
        <Row :gutter="10">
            <Col span="24">
                <Card>
                    <p slot="title">
                        意见反馈
                    </p>
                    <Row class="search">
                        <span class="lb">用户账号</span>
                        <Input v-model.trim="searchParams.userAccount" placeholder="请输入用户账号" style="width: 200px" />
                        <span class="lb">状态</span>
                        <Select style="width:200px" v-model="searchParams.disposeStatus" placeholder="全部">
                            <Option v-for="(val,key) of statusList" :value="key" :key="key">{{ val }}</Option>
                        </Select>
                        <span class="btn"><Button type="primary" icon="search" @click="search">搜索</Button></span>
                    </Row>
                    <div>                        
                    </div>
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
import { getFeedbackList } from "@/api/api_feedback.js";
export default {
  data() {
    return {
      columns: [],
      list: [],
      page: 1,
      pageTotal: 0,
      searchParams: {
        userAccount: "",
        disposeStatus: "0",
        pageNo: 1,
        pageSize: 10
      },
      statusList: {
        0:"全部",
        1: "未处理",
        2: "已处理"
      },
      auth:""
    };
  },
  methods: {
    init() {
      this.getFeedbackList();
      this.setColumns();
    },
    setColumns() {
      this.columns = [
        {
          key: "seq",
          title: "序号",
          width: 100,
          render: (h, params) => {
            return h("div", [
              h(
                "span",
                {},
                (this.page - 1) * this.searchParams.pageSize + params.index + 1
              )
            ]);
          }
        },
        {
          key: "userAccount",
          title: "账号"
        },
        {
          key: "pics",
          title: "相关照片",
          render: (h, params) => {
            if (params.row.picUrl) {
              let picUrlStr = params.row.picUrl;
              var arr = picUrlStr.split(",");
              return [
                h("div", {
                  class: "putimg",
                  style: "backgroundImage: url('" + arr[0] + "')"
                }),
                h("div", {
                  class: "putimg",
                  style: "backgroundImage: url('" + arr[1] + "')"
                }),
                h("div", {
                  class: "putimg",
                  style: "backgroundImage: url('" + arr[2] + "')"
                })
              ];
            } else {
              return [];
            }
          }
        },
        {
          key: "content",
          title: "内容"
        },
        {
          key: "createTime",
          title: "反馈时间"
        },
        {
          key: "top",
          title: "状态",
          render: (h, params) => {
            return h("div", [
              h("span", {}, params.row.disposeStatus == 2 ? "已处理" : "未处理")
            ]);
          }
        },
        {
          key: "status",
          title: "操作",
          render: (h, params) => {
            let buttonList = [];
            if(this.globalFun.userAuth.checkAuth(this.auth,"5023")){
                buttonList.push(h(
                  "Button",
                  {
                    props: {
                      type: "primary",
                      size: "small"
                    },
                    style: {
                      marginRight: "5px"
                    },
                    on: {
                      click: () => {
                        this.redirect(params.row);
                      }
                    }
                  },"查看详情"))
            }
            if(this.globalFun.userAuth.checkAuth(this.auth,"5022")){
                if(params.row.disposeStatus == 1) {
                    buttonList.push(h(
                  "Button",
                  {
                    props: {
                      type: "error",
                      size: "small"
                    },
                    style: {
                      marginRight: "5px"
                    },
                    on: {
                      click: () => {
                        this.redirect(params.row);
                      }
                    }
                  },"处理"))
                }
            }
            return h(
              "div",
              {
                style: {
                  width: "100%",
                  textAlign: "center"
                }
              },
              buttonList
            );
          }
        }
      ];
    },
    getFeedbackList(callback) {
      this.$Spin.show();
      getFeedbackList(this.searchParams).then(res => {
        if (res.code == 200) {
          this.$Spin.hide();
          this.list = res.data.entities || [];
          this.pageTotal = res.data.count;
          if (callback) {
            callback();
          }
        } else {
          this.$Spin.hide();
        }
      });
    },
    // 搜索
    search() {
      this.searchParams.pageNo = 1;
      this.getFeedbackList(() => {
        this.page = 1;
      });
    },
    // 选择页数
    convertPage(index) {
      this.searchParams.pageNo = index;
      this.getFeedbackList(() => {
        this.page = index;
      });
    },
    convertPageSize(size) {
      this.searchParams.pageSize = size;
      this.getFeedbackList();
    },
    //  页面跳转
    redirect(date) {
      this.$router.push({
        path: "/feedback/deal/" + date.id
      });
    }
  },
  mounted() {
    this.globalFun.userAuth.getAuth(data=>{
        this.auth = data;
        this.init();
    });
  }
};
</script>
<style lang="less">
@import "../../../common/styles/common.less";
@import "./edit.less";
</style>