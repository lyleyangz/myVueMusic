<style lang="less">
@import "../../../common/styles/common.less";
@import "./edit.less";

</style>

<template>
    <div class="edit">
        <Card>
            <p slot="title">
               修改token奖励值
            </p>
            <div class="cnt">
                <div class="item">
                    <span class="lb">类型：</span>                   
                    <span>
                        <Input disabled v-model.trim="params.name"  :maxlength="20" style="width:350px"/>
                    </span>   
                </div>  
                <div class="item">
                    <span class="lb">详解：</span>                   
                    <span>
                        <Input v-model.trim="params.detail" style="width:350px" :maxlength="30" />
                    </span>   
                </div>
                <div class="item">
                    <span class="lb">排序：</span>                   
                    <span>
                        <InputNumber type="number" :max="99" :min="1" v-model.trim="params.sort" style="width:350px"/>
                    </span>   
                </div>
                <div>
                    <div class="item">
                        <span class="lb">token奖励：</span>                   
                        <span>
                            <Input v-model.trim="params.score" style="width:350px" />
                        </span>   
                    </div>
                </div>
                <div class="item">
                    <span class="lb">token规则：</span>                   
                    <span>
                        <RadioGroup v-model="params.type">
                            <Radio label="1">
                                <span>临时token</span>
                            </Radio>
                            <Radio label="2">
                                <span>永久token</span>
                            </Radio>
                        </RadioGroup>
                    </span>   
                </div>
                <div class="item" v-if="params.type == 2">
                    <span class="lb"></span>                   
                    <span>
                        <RadioGroup v-model="params.limitType">
                            <Radio label="1">
                                <span>每个账号限领</span>
                                <InputNumber  type="number" :max="99" :min="1" v-model.trim="params.limitFixedTimes" style="width:80px"/> 次
                            </Radio>
                            <Radio label="2">
                                <span>每个账号每天限领</span>
                                <InputNumber  type="number" :max="99" :min="1" v-model.trim="params.limitTimes" style="width:80px"/> 次
                            </Radio>
                        </RadioGroup>
                    </span>   
                </div>
                
				<div class="item btn">
					<span class="lb"></span>       
					<span>
						<Button size="large" @click="cancel()">取消</Button>
						<Button type="info" size="large" @click="confirm()" :loading="loading">提交</Button>
					</span>	
				</div>
            </div>
			
        </Card>
    </div>
</template>

<script>
import { scoreDetail,updateScore} from "@/api/api_syetemParams.js";
import eventBus from "@/common/evnetBus/eventBus.js";
import md5 from "@/common/libs/md5.js";
export default {
	data() {
		return {
			loading: false,
			params: {

            },
            roleList:{}
		};
	},
	created() {
        this.getDetail();
	},
  	mounted() {},
	methods: {
        getDetail(){
            scoreDetail({
                id: this.$route.params.id
            }).then(res=>{
                if(res.code == 200){
                    this.params = res.data || {};
                }
            })
        },
	
		confirm() {
			// let accountReg = /^(?![^a-zA-Z]+$)(?!\D+$)/;
			// let passwdReg =  /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,}$/;

			// if (!this.params.account) {
			// 	this.$Message.error("请输入用户账号");
			// 	return false;
			// }
			// if (!accountReg.test(this.params.account)) {
			// 	this.$Message.error("用户账号格式不正确");
			// 	return false;
			// }
			// if (!this.params.passwd) {
			// 	this.$Message.error("请输入密码");
			// 	return false;
			// }
			// if (!passwdReg.test(this.params.passwd)) {
			// 	this.$Message.error("密码格式不正确");
			// 	return false;
			// }
			// if (!this.params.confirmPasswd) {
			// 	this.$Message.error("请再次输入密码");
			// 	return false;
			// }
			// if (this.params.confirmPasswd != this.params.passwd) {
			// 	this.$Message.error("两次密码不一致");
			// 	return false;
            // }
            // if (!this.params.roleId) {
			// 	this.$Message.error("请选择所属角色");
			// 	return false;
			// }
            // if(this.globalFun.phoneNumCheck(this.params.phone)) {
            //     this.$Message.error("请输入正确的手机号码");
			// 	return false;
			// }
			if(!this.loading){
				this.loading = true;
				var params = JSON.parse(JSON.stringify(this.params));
				var _this = this;
				updateScore(this.params).then(res=>{
                    if(res.code == 200){
                        this.$Message.success('提交成功');
                        setTimeout(() => {
                            _this.cancel();
                        }, 1000);
                    }
                    this.loading = false;
                })
			}
			
        },
        changeDate(date){
            if(date.length == 2){     
                this.searchParams.startTime = new Date(date[0]+" 00:00:00").getTime() || '';
                this.searchParams.endTime = new Date(date[1]+" 23:59:59").getTime() || '';
            }
        },
		cancel(){
            eventBus.$emit('closeTag', 'reward_edit');
			history.go(-1);
		}
  	},
  	computed: {}
};
</script>