
<template>
    <div class="edit">
        <Card>
            <p slot="title">
                {{id?"编辑":"添加"}}加工轨迹
            </p>
            <div class="cnt">
                <Col>
                    <div class="item">
                        <span class="lb"><em>*</em>轨迹名称：</span>                   
                        <span>
                            <Input v-model.trim="params.traName" :maxlength="50" style="width:400px" placeholder="限制50字以内"/>
                        </span>   
                    </div>
                    <div class="item">
                        <span class="lb"><em>*</em>商品批次：</span>                   
                        <span>
                            <Select style="width:400px" v-model="params.traBatch" placeholder="全部">
                                <Option :value="``" >全部</Option>
                                <Option v-for="(val,key) of statusList" :value="key" :key="key">{{ val }}</Option>
                            </Select>
                        </span>
                    </div>
                </Col>
                <Col class="cut">
                    <div class="item">
                        <span class="lb">名称：</span>                   
                        <span>
                            <Input v-model.trim="traAll.obj.traProName" :maxlength="50" style="width:400px" placeholder="限制50字以内"/>
                        </span>   
                    </div>
                    <div class="item">
                        <span class="lb">详情：</span>                   
                        <span>
                            <Input v-model.trim="traAll.obj.traInfo" :maxlength="50" style="width:400px" placeholder="限制50字以内"/>
                        </span>   
                    </div>
                </Col>
                <Col>
                    <div class="item">
                        <span class="lb">照片：</span>                   
                        <span>
                            <my-upload :uploadList="uploadList" :maxSize=2></my-upload>
                        </span>  
                        <span class="tip">仅支持 jpeg、 png 2种格式, 大小不超过10.0 MB，建议尺寸750X1334</span> 
                    </div>
                </Col>
                
                <div class="item add_tems">               
                    <span>
                        <Button type="info" size="large" @click="add('traAll')">添加</Button>
                    </span>
                </div>
                <Row class="margin-top-10 searchable-table-con1">
                        <Table :columns="columns" :data="list"></Table>
                </Row>
               
            </div>
			<div class="item btn">
				<Button size="large" @click="cancel()">取消</Button>
				<Button type="info" size="large" @click="confirm()">提交</Button>
			</div>
        </Card>
    </div>
</template>

<script>
import E from "wangeditor";
import eventBus from "@/common/evnetBus/eventBus.js";
import myUpload from "@/views/my-components/my-upload/upload";
import {
  addProcess,
  editProcess,
  getDetailsById,
  comboBoxBatch
} from "@/api/api_processManage.js";
import { setTimeout } from "timers";

export default {
  components: {
    myUpload
  },
  data() {
    return {
      columns: [],
      list: [],
      uploadList: [],
      id: this.$route.query.id,
      traAll: {
        obj: {}
      },
      params: {
        traName: "",
        traBatch: "",
        traAll: []
      },
      statusList: []
    };
  },
  created() {
    if (this.id) {
      this.getDetailsById();
    }
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.comboBoxBatch();
      this.setColumns();
    },
    setColumns() {
      this.columns = [
        {
          key: "seq",
          title: "编号",
          width: 100,
          render: (h, params) => {
            return h("div", [h("span", {}, params.index + 1)]);
          }
        },
        {
          key: "traProName",
          title: "名称"
        },
        {
          key: "traInfo",
          title: "详情"
        },
        {
          key: "traUrl",
          title: "照片",
          render: (h, params) => {
			if(params.row.traUrl){
				var arr = params.row.traUrl.split(",");
				return [h("div", {
					class: "putimg",
					style: "backgroundImage: url('" + arr[0] + "')"
				}),h("div", {
					class: "putimg",
					style: "backgroundImage: url('" + arr[1] + "')"
				})
				];
			}else{
				return []
			}
            
          }
        },
        {
          title: "操作",
          key: "status",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "error",
                    size: "small"
                  },
                  on: {
                    click: () => {
                      this.remove(params.index);
                    }
                  }
                },
                "删除"
              )
            ]);
          }
        }
      ];
    },
    comboBoxBatch() {
      comboBoxBatch().then(res => {
        if (res.code == 200) {
          var list = res.data || [];
          var map = {};
          list.forEach(item => {
            map[item.id] = item.name;
          });
          this.statusList = map;
        }
      });
    },
    // 获取编辑加工轨迹详情
    getDetailsById() {
      getDetailsById({
        id: this.id
      }).then(res => {
        if (res.code == 200) {
          this.params.traName = res.data.traName;
          this.params.traBatch = res.data.traBatch + "";
          this.list = JSON.parse(res.data.traAll) || [];
        }
      });
    },
    // 添加
    add(name) {
      var _this = this;
      if (!_this.traAll.obj.traProName) {
        _this.$Message.error("请输入名称");
        return false;
      }
      if (!_this.traAll.obj.traInfo) {
        _this.$Message.error("请输入详情");
        return false;
      }
      if (this.uploadList.length > 0) {
        var uploadList = [];
        this.uploadList.forEach((item, index) => {
          uploadList.push(item.url);
        });
        this[name].obj.traUrl = uploadList.join(",");
      }
      this.params[name].push(this[name].obj);
      this.list.push(this[name].obj);
      this[name].obj = {};
      this.uploadList = [];
    },
    remove(index) {
      this.params.traAll = this.list.splice(index, 1);
    },
    // 提交
    confirm() {
      var _this = this;
      if (!_this.params.traName) {
        _this.$Message.error("请输入轨迹名称");
        return false;
	  }
      if (!_this.params.traBatch) {
        _this.$Message.error("请选择批次");
        return false;
      }
     
	  let searchParams = JSON.parse(JSON.stringify(this.params));
	  searchParams.traAll = "" ;
	  if(_this.list.length>0){
		  searchParams.traAll = JSON.stringify(this.list);
	  }
      
      if (this.id) {
        searchParams.id = this.id;
        editProcess(searchParams).then(res => {
          if (res.code == 200) {
            _this.$Message.success("修改成功");
            setTimeout(() => {
              _this.cancel();
            }, 1000);
          }
        });
      } else {
        addProcess(searchParams).then(res => {
          if (res.code == 200) {
            _this.$Message.success("添加成功");
            setTimeout(() => {
              _this.cancel();
            }, 1000);
          }
        });
      }
    },
    cancel() {
        if(this.id){
            eventBus.$emit("closeTag", "goodsProcessManage_edit");
        }else {
            eventBus.$emit("closeTag", "goodsProcessManage_add");
        }
      history.go(-1);
    }
  },
  computed: {}
};
</script>
<style>
.putimg {
  width: 50px;
  height: 50px;
  background-position: center center;
  background-size: 100%;
  background-repeat: no-repeat;
  display: inline-block;
  margin-left: 5px;
}
</style>

<style lang="less">
@import "../../../common/styles/common.less";
@import "./edit.less";
</style>
