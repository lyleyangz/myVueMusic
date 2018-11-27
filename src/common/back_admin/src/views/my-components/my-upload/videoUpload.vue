<style lang="less" scoped>
@import "../../../common/styles/common.less";
@import "videoUpload.less";
.demo-spin-col {
  &::before {
    animation: ani-demo-spin 1s linear infinite;
  }
}
@keyframes ani-demo-spin {
  from {
    transform: rotate(0deg);
  }
  50% {
    transform: rotate(180deg);
  }
  to {
    transform: rotate(360deg);
  }
}
.demo-spin-col {
  height: 100px;
  position: relative;
  border: 1px solid #eee;
}
</style>


<template>
    <div class="block">
        <div class="demo-upload-list" v-for="(item,index) of videoUploadList" :key="index">
            <video controls :src="item.url"></video>
            <div class="demo-upload-list-cover">
                <Icon type="ios-trash-outline" @click.native="handleRemove(item,index)"></Icon>
            </div>
        </div>
        <Upload :headers="headers" ref="upload" :show-upload-list="false" :format="['mp4']" :max-size="51200" :on-success="handleSuccess" :before-upload="handleBeforeUpload" :on-format-error="handleFormatError" :on-exceeded-size="handleMaxSize" type="drag" :action="action" style="display: inline-block;width:58px;" :data="params">
            <div style="width: 58px;height:58px;line-height: 58px;">
                <Icon type="ios-videocam" size="20"></Icon>
            </div>
        </Upload>
    </div>
</template>

<script>
export default {
  name: "my-upload",
  props: {
    videoUploadList: {
      type: Array,
      default: function() {
        return [];
      }
    },
    maxSize: {
      type: Number,
      default: function() {
        return 1;
      }
    },
    action: {
      type: String,
      default: function() {
        return "http://albups.xsl.one/service/app/upload/video";
      }
    },
    add: {
      type: Function,
      default: function() {}
    },
    remove: {
      type: Function,
      default: function() {}
    },
    params: {
      type: Object,
      default: function() {
        return {};
      }
    }
  },
  data() {
    return {
      headers: {}
    };
  },
  methods: {
    handleBeforeUpload(file) {
		this.status = file.type == "video/mp4" ? false : true;
		if (this.maxSize > 0) {
			const check = this.videoUploadList.length < this.maxSize;
			if (!check) {
				this.$Notice.warning({
					title: "最多只能上传 " + this.maxSize + " 个视频。",
					duration: 3
				});
				return false;
			}
		}

		this.$Spin.show({
			render: h => {
				return h("div", [
					h("Icon", {
						class: "demo-spin-col",
						props: {
							type: "load-b",
							size: 30
						}
					}),
					h("div", "视频上传中...")
				]);
			}
		});
      
    },
    handleRemove(file, index) {
		this.videoUploadList.splice(this.videoUploadList.indexOf(file), 1);
		this.remove(index);
    },
    handleSuccess(res, file) {

		if (res && res.code == 0) {
			this.$Spin.hide();

			this.videoUploadList.push({
				url: res.result.url,
				id: res.id || ""
			});
			this.add(res.id, res.data);
		}
    },
    handleFormatError(file) {
      this.$Notice.warning({
        title: "文件格式不正确",
        desc:
          "文件" +
        //   file.name +
		  " 格式不正确，请上传 mp4 格式的视频。",
		  duration: 3
	  });
	  this.$Spin.hide();
    },
    handleMaxSize(file) {
      this.$Notice.warning({
        title: "超出文件大小限制",
		desc: "文件 " + file.name + " 太大，不能超过 51200KB。",
		duration: 3
	  });
	  this.$Spin.hide();
    }
  },
  mounted() {
    // this.headers={
    //     "transaction-token": sessionStorage.getItem("token")
    // }
  }
};
</script>
