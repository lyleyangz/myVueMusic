<template>
    <div class="Opinion">
        <Row class="edit">
            <Col class="goods">
                <Card>
                    <p slot="title">
                        意见处理反馈 
                    </p>
                    <div class="cnt" >
                        <Row>
                            <Col span="20" class="item">
                                <span class="lb">用户账户：</span>                   
                                <span>
                                    <Input v-model.trim="params.name" :disabled="isEdit" :maxlength="50" style="width:300px" placeholder="限制50字"/>
                                </span>  
                            </Col>
                        </Row>
                        <!--  -->
                        <Row> 
                            <Col span="20" class="item">
                                <div class="lb">意见描述：</div>                   
                                <div class="Opinion_text" v-if="params.content">{{params.content}}</div>  
                            </Col>
                        </Row>
                        <!--  -->
                        <Row> 
                            <Col span="20" class="item">
                                <div class="lb">意见图片：</div>                   
                                <div class="put_pics">
                                    <div class="demo-upload-list" v-for="item in defaultList">
                                        <img :src="item">
                                        <div class="demo-upload-list-cover">
                                            <Icon type="ios-eye-outline" @click.native="handleView(item)"></Icon>
                                        </div>
                                    </div>
                                </div>
                            </Col>
                        </Row> 
                        <!-- 处理anniu -->
                        <Row>
                            <Col span="20" class="item">
                                <div class="btns">
                                    <Button type="primary" @click="cancel()">取消</Button>
                                    <Button type="primary" v-if="isShowBtn" @click="deal()">处理</Button>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </Card>
            </Col>
        </Row>
        <!-- 放大预览 -->
        <div class="pics_see">
            <Modal :title="imgDate.imgName" v-model="visible">
                <img :src="imgDate.imgUrl" v-if="visible" style="width: 100%">
            </Modal>
        </div>
    </div>
</template>

<script>
import eventBus from "../../../common/evnetBus/eventBus.js";
import { detailsFeedback, dealFeedback } from "@/api/api_feedback.js";

export default {
  data() {
    return {
      isEdit: true,
      visible: false,
      params: {
        name: "",
        content: ""
      },
      defaultList: [],
      imgDate: {
        imgUrl: "",
        imgName: ""
      },
      //   详情意见ID
      dealFeedbackParams: {
        id: Number,
        disposeStatus: 2,
        sugDesc: ""
      },
      // 是否显示处理按钮
      isShowBtn: true
    };
  },
  mounted() {
    if (this.$route && this.$route.params && this.$route.params.id) {
      this.dealFeedbackParams.id = this.$route.params.id;
      this.getDetailsFeedback(this.dealFeedbackParams.id);
    }
  },
  methods: {
    //   获取反馈意见详情接口
    getDetailsFeedback(ID) {
      detailsFeedback({
        id: ID
      }).then(res => {
        if (res.code === "200" && res.msg === "success") {
          this.params.name = res.data.userAccount;
          this.params.content = res.data.content;
          // 处理需要的数据
          this.dealFeedbackParams.id = res.data.id;
          this.dealFeedbackParams.sugDesc = res.data.content;
          if (res.data.disposeStatus === 2) {
            this.isShowBtn = false;
          }
          // this.dealFeedbackParams.disposeStatus = res.data.disposeStatus;
          // 缩略图
          this.defaultList = res.data.picUrl;
        }
        // console.log(res)
      });
    },
    handleView(imgDate) {
      this.imgDate.imgUrl = imgDate;
      //   this.imgDate.imgName = imgDate.name;
      this.visible = true;
    },
    deal() {
      var _this = this;
      dealFeedback(this.dealFeedbackParams).then(res => {
        if (res.code === "200" && res.msg === "success") {
          _this.$Message.success("处理成功");
          setTimeout(() => {
            _this.cancel();
          }, 1000);
        }
      });
    },
    cancel() {
      eventBus.$emit("closeTag", "feedback_deal");
      history.go(-1);
    }
  }
};
</script>
<style lang="less">
@import "../../../common/styles/common.less";
@import "./edit.less";
</style>