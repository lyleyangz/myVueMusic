
<template>
    <div>
        <Row :gutter="10">
            <Col span="24">
                <Card>
                    <p slot="title">
                        珠宝大师管理
                    </p>
                    <Row class="search">
                        <span class="lb">大师ID</span>
                        <Input v-model.trim="searchParams.masterNum" placeholder="请输入大师ID搜索..." style="width: 200px" />
                        <span class="lb">大师姓名</span>
                        <Input v-model.trim="searchParams.mName" placeholder="请输入大师姓名搜索..." style="width: 200px" />
                        <span class="lb">大师性别</span>
                        <Select style="width:200px" v-model="searchParams.sex" placeholder="全部">
                            <Option :value="``" >全部</Option>
                            <Option v-for="(val,key) of statusList" :value="key" :key="key">{{ val }}</Option>
                        </Select>
                        <span class="btn">
                            <Button type="primary" icon="search" @click="search">搜索</Button>
                            
                        </span>
                    </Row>
                    <div v-if="auth && globalFun.userAuth.checkAuth(auth,'4022')">
                      	<Button type="primary" icon="plus-round" @click="redirect()">添加</Button>
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
import { getList,delMaster } from "@/api/api_greatMasterManage.js";
export default {
  data() {
    return {
      columns: [],
      list: [],
      page: 1,
      pageTotal: 0,
      searchParams: {
        masterNum: "",
        mName: "",
        sex: "",
        pageNo: 1,
        pageSize: 10
      },
      statusList: {
        1: "男",
        2: "女"
      },
      auth:""
    };
  },
  methods: {
    init() {
      this.getList();
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
              h("span",{},(this.page - 1) * this.searchParams.pageSize + params.index + 1
              )
            ]);
          }
        },
        {
          key: "id",
          title: "大师ID"
        },
        {
          key: "mName",
          title: "大师姓名"
        },
        {
          key: "sex",
          title: "性别",
          render: (h, params) => {
            return h("div", [
              h("span", {}, this.statusList[params.row.sex] || "")
            ]);
          }
        },
        {
          key: "status",
          title: "操作",
          render: (h, params) => {
            let buttonList = [];
            if(this.globalFun.userAuth.checkAuth(this.auth,"4023")){
                buttonList.push(
                    h(
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
                      this.$router.push({
                        name: "greatMasterManage_edit",
                        query: {
                          id: params.row.id
                        }
                      });
                    }
                  }
                },"编辑"))
            }
            if(this.globalFun.userAuth.checkAuth(this.auth,"4024")){
                buttonList.push(
                    h(
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
                        this.delMaster(params.row.id)
                    }
                  }
                },"删除"))
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
    getList(callback) {
      this.$Spin.show();
      getList(this.searchParams).then(res => {
        if (res.code == 200) {
          this.$Spin.hide();
          this.list = res.data.entities || [];
          this.pageTotal = res.data.count
            if(callback){
                callback();
            }
        } else {
          this.$Spin.hide();
        }
      });
    },
    delMaster(id){
        this.$Modal.confirm({
            content: "是否删除当前大师？",
            loading: false,
            onOk: () => {
                this.$Spin.show();
                delMaster({
                    id: id,
                }).then(res => {
                    this.$Spin.hide();
                    if(res.code == 200 ){
                        this.$Message.success('删除成功');
                        this.getList();
                    }
                });
            }
        });
    },
    // 搜索
    search() {
        this.searchParams.pageNo = 1;
        this.getList(() => {
          this.page = 1;
        });
    },
    // 选择页数
    convertPage(index) {
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
            path: "/greatMasterManage/add"
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
</style>