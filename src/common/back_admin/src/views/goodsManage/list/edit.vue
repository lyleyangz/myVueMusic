<template>
    <div>
        <Row class="edit">
            <Col class="goods">
                <Card style="margin-bottom:20px;">
                    <p slot="title">
                        {{params.id == "" ? "新增":"编辑"}}商品 
                    </p>
                    <div class="cnt" >
                        <div class="title-block">基本信息</div>
                        <Row>
                            <Col span="10" class="item">
                                <span class="lb"><em>*</em>商品名称：</span>                   
                                <Select style="width:300px" v-if="params.id == ''" :disabled="params.id != ''" v-model="params.hashAddress" placeholder="请选择...">
                                    <Option v-for="(value,key) of goodsNameList" :value="key" :key="key">{{ value }}</Option>
                                </Select>  
                                <span v-else><Input v-model="params.proName" disabled style="width:300px"/></span>
                            </Col>
                            <Col span="10" class="item">
                                <span class="lb"><em>*</em>销售价(元)：</span>                   
                                <span>
                                    <InputNumber :disabled="isEdit" :min="1" :step="0.1" v-model="params.price" style="width:300px"></InputNumber>
                                </span>  
                            </Col>
                            
                        </Row>
                        <Row>
                            <Col span="10" class="item">
                                <span class="lb">商品排序：</span>                   
                                <span>
                                    <InputNumber :disabled="isEdit" :max="20" :min="1" v-model="params.sort" style="width:300px" placeholder="请输入1-20的数字"></InputNumber>
                                </span>  
                            </Col>
                            <Col span="10" class="item">
                                <span class="lb"><em>*</em>库存：</span>                   
                                <span>
                                    <InputNumber :disabled="isEdit" :min="1" :precision="0" v-model="params.inventory" style="width:300px"></InputNumber>
                                </span>  
                            </Col>
                            
                        </Row>
                        <!-- <Row>
                            <Col span="10" class="item">
                                <span class="lb">商品重量：</span>                   
                                <span>
                                    <InputNumber :min="1" :step="0.1" v-model="params.price" style="width:300px" placeholder="请输入商品重量(单位：g)"></InputNumber>
                                </span>  
                            </Col>
                        </Row> -->
                        <div class="item">
                            <span class="lb">商品图片：</span>                   
                            <span>
                                <my-upload :uploadList="photosList" :maxSize="3"></my-upload>
                            </span>
                            <span class="tip">仅支持 jpeg、 png 2种格式, 大小不超过10.0 MB，建议尺寸750X1334</span>
                        </div>
                        <div class="title-block">商品详情</div>
                        <div>
                            <my-wangeditor ref="content" :editorId="`content`" :content="content"></my-wangeditor>
                        </div>
                        
                    </div>
                    <div class="item btn" v-if="!isEdit">
                        <Button size="large" @click="cancel()">取消</Button>
                        <Button type="info" size="large" :loading="loading" @click="submit()">提交</Button>
                    </div>
                </Card>
                <Card v-if="isEdit">
                    <Row class="verify" >
                           <Col class="item">
                               <span class="lb" style="width:70px">审核状态：</span>                   
                               <Select style="width:300px"  v-model="verifyParams.checkStatus" placeholder="请选择...">
                                   <Option v-for="(value,key) of verifyList" :value="key" :key="key">{{ value }}</Option>
                               </Select>  
                           </Col>
                           <div class="title-block">原因</div>
                           <div>
                               <my-wangeditor ref="cause" :editorId="`cause`" :content="cause"></my-wangeditor>
                           </div>
                    </Row>
                    <div class="item btn">
                        <Button size="large" @click="cancel()">取消</Button>
                        <Button type="info" size="large" :loading="loading" @click="verifySubmit()">提交</Button>
                    </div>
                </Card>
            </Col>
        </Row>
        
    </div>
</template>

<script>
import {
  detailGoods,
  addGoods,
  editGoods,
  verify,
  goodsList
} from "@/api/api_goodsManage.js";
import myUpload from "@/views/my-components/my-upload/upload";
import myWangeditor from "@/views/my-components/my-wangeditor/wangeditor";
import eventBus from "../../../common/evnetBus/eventBus.js";
export default {
  components: {
    myUpload,
    myWangeditor
  },
  data() {
    return {
      isEdit: this.$route.query.status == 1, // 是否编辑页面
      photosList: [],
      params: {
        id: this.$route.query.id || "",
        inventory: null,
        price: null,
        sort: 1,
        proUrl: "",
        proInfo: "",
        hashAddress: ""
      },
      verifyParams: {
        checkStatus: "",
        id: this.$route.query.id || ""
      },

      verifyList: {
        "3": "通过",
        "2": "不通过"
      },
      goodsNameList: {},
      content: {},
      cause: {},
      loading: false
    };
  },
  created() {
    this.goodsList();
  },
  mounted() {
    var id = this.params.id;
    if (id) {
      detailGoods({
        id: id
      }).then(res => {
        if (res.code == 200) {
          this.params = res.data;
          if (this.params.proUrl) {
            var photosList = [];
            this.params.proUrl.split(",").forEach((item, index) => {
              photosList.push({ url: item });
            });
            this.photosList = photosList;
          }
          this.$refs.content.setContent(this.params.proInfo);
        }
      });
    }
  },
  methods: {
    goodsList() {
      goodsList().then(res => {
        if (res.code == 200) {
          var list = res.data || [];
          var map = {};
          list.forEach(item => {
            map[item.address] = item.name;
          });
          this.goodsNameList = map;
        }
      });
    },
    submit() {
      if (!this.params.hashAddress) {
        this.$Message.error("请选择商品名称");
        return false;
      }
      if (!this.params.price) {
        this.$Message.error("请输入商品价格");
        return false;
      }
      if (!this.params.inventory) {
        this.$Message.error("请输入商品库存");
        return false;
      }
      if (!this.loading) {
        this.loading = true;

        if (this.photosList.length > 0) {
          var photosList = [];
          this.photosList.forEach((item, index) => {
            photosList.push(item.url);
          });
          this.params.proUrl = photosList.join(",");
        }
        if (this.content.html != "") {
          this.params.proInfo = this.content.html;
        }
        var _this = this;
        if (!this.params.id) {
          addGoods(this.params).then(res => {
            if (res.code == 200) {
              _this.$Message.success("提交成功");
              _this.cancel();
            }
            this.loading = false;
          });
        } else {
          editGoods(this.params).then(res => {
            if (res.code == 200) {
              _this.$Message.success("提交成功");
              _this.cancel();
            }
            this.loading = false;
          });
        }
      }
    },
    verifySubmit() {
      if (!this.verifyParams.checkStatus) {
        this.$Message.error("请选择审核状态");
        return false;
      }
      if (this.verifyParams.checkStatus == 2) {
        if (!this.cause.html) {
          this.$Message.error("请输入审核不通过的原因");
          return false;
        }
      }
      this.loading = true;
      if (this.cause.html != "") {
        this.verifyParams.reason = this.cause.html;
      }

      verify(this.verifyParams).then(res => {
        if (res.code == 200) {
          this.$Message.success("审核成功");
          this.cancel();
        }
        this.loading = false;
      });
    },
    cancel() {
      if (this.params.id) {
        eventBus.$emit("closeTag", "goods_edit");
      } else {
        eventBus.$emit("closeTag", "goods_add");
      }
      history.go(-1);
    }
  }
};
</script>
<style lang="less">
@import "../../../common/styles/common.less";
@import "./edit.less";
.verify {
  padding-top: 40px;
}
</style>