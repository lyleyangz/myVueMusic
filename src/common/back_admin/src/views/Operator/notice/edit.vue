
<template>
    <Row class="edit">
        <Card>
            <p slot="title">
                {{id?"编辑":"添加"}}公告
            </p>
            <div class="cnt">
                <div class="item">
                    <span class="lb"><em>*</em>标题：</span>                   
                    <span>
                        <Input v-model.trim="params.title" :maxlength="100" style="width:750px"/>
                    </span>   
                    <span class="tip">限制100字以内</span>
                </div>
                <div class="item">
                    <span class="lb"><em>*</em>副标题：</span>                   
                    <span>
                        <Input v-model.trim="params.subTitle" :maxlength="100" style="width:750px"/>
                    </span>   
                    <span class="tip">限制100字以内</span>
                </div>
                <div class="item">
                    <span class="lb">是否置顶：</span>  
                    <span>
                        <RadioGroup v-model="params.top" v-for="(value,key) of topPosition" :key="key">
                            <Radio :label="key">
                                <span>{{value}}</span>
                            </Radio>
                        </RadioGroup>
                    </span>
                </div>
                <div class="item">
                    <span class="lb">内容：</span>  
                    <div style="width:90%">
                        <my-wangeditor ref="notice" :editorId="`notice`" :content="notice"></my-wangeditor>
                    </div>
                </div>
                <div class="item btn">
                    <span class="lb"></span>  
                    <span>
                        <Button type="info" size="large" :loading="loading" @click="confirm()">确定</Button>
                        <Button size="large" @click="cancel()">取消</Button>                    
					</span>
                </div>
            </div>
        </Card>
    </Row>
</template>

<script>
import { editNotice, addNotice, getNoticeById } from "@/api/api_notice.js";
import eventBus from "@/common/evnetBus/eventBus.js";
import myWangeditor from "@/views/my-components/my-wangeditor/wangeditor";
export default {
	components: {
		myWangeditor
	},
	data() {
		return {
			notice: {},
			uploadList: [],
			editor: null,
			editorContent: "",
			preContent: "",
			id:this.$route.query.id,
			params: {
				title: "",
				subTitle: "",
				content: "",
				top: "0"
			},
			statusList: {
				0: "第一批",
				1: "第二批",
				2: "第三批",
				3: "第四批"
			},
			topPosition: {
				1: "否",
				0: "是"
			},
			loading: false
		};
	},
	mounted() {
		this.init();
	},
	methods: {
		init() {
			if (this.id) {
				this.getNoticeById();
			}
		},
		getNoticeById() {
			this.$Spin.show();
			getNoticeById({
				id: this.id
			}).then(res => {
				if (res.code == 200) {
					this.$Spin.hide();
					this.params.title = res.data.title;
					this.params.subTitle = res.data.subTitle;
					this.params.top = res.data.top + "";
					this.$refs.notice.setContent(res.data.content)
				} else {
					this.$Spin.hide();
				}
			});
		},
		confirm() {
			if (!this.params.title) {
				this.$Message.error("请输入公告标题");
				return false;
			}
			if (!this.params.subTitle) {
				this.$Message.error("请输入副标题");
				return false;
			}
			if(!this.loading){
				this.loading = true;
				if (this.id) {
                    this.params.id = this.id
                    this.params.content = this.notice.html || ''
					editNotice(this.params).then(res => {
						if (res.code == 200) {
							this.$Message.success("修改成功");
							this.cancel();
						}
						this.loading = false;
					});
				} else {
					this.params.content = this.notice.html || ''
					addNotice(this.params).then(res => {
						if (res.code == 200) {
							this.$Message.success("添加成功");
							this.cancel()
						} 
						this.loading = false;
					});
				}
			}
		},
		cancel(){
			if(this.id) {
				eventBus.$emit('closeTag','notice_edit')
			}else {
				eventBus.$emit("closeTag", "notice_add");
			}
			history.go(-1);
		},
	},
	computed: {}
};
</script>
<style lang="less" scoped>
@import "../../../common/styles/common.less";
@import "./edit.less";
</style>
