<style lang="less">
@import "../../../common/styles/common.less";


</style>

<template>
    <div class="edit">
        <Card>
            <p slot="title">
               {{isEdit? '编辑':'添加'}}用户
            </p>
            <div class="cnt">
                <div class="item">
                    <span class="lb"><em>*</em>用户账号：</span>                   
                    <span>
                        <Input :disabled='isEdit' v-model.trim="params.account" placeholder="账号必须包含数字和字母" :maxlength="20" style="width:350px"/>
                    </span>   
                </div>
                <div class="item">
                    <span class="lb"><em>*</em>登录密码：</span>                   
                    <span>
                        <Input type="password" v-model.trim="params.passwd" style="width:350px" placeholder="密码至少包含6位数字和字母"/>
                    </span>   
                </div>
                <div class="item">
                    <span class="lb"><em>*</em>确认密码：</span>                   
                    <span>
                        <Input type="password" v-model.trim="params.confirmPasswd" placeholder="请再一次输入登录密码" style="width:350px"/>
                    </span>   
                </div>
                <div class="item">
                    <span class="lb">真实姓名：</span>                   
                    <span>
                        <Input v-model.trim="params.name" :maxlength="10" style="width:350px"/>
                    </span>   
                </div>
                <div class="item">
                    <span class="lb">联系电话：</span>                   
                    <span>
                        <input v-limitNum class="ivu-input" v-model.trim="params.phone" :maxlength="11" style="width:350px"/>
                    </span>
                </div>
                <div class="item">
                    <span class="lb"><em>*</em>所属角色：</span>                   
                    <span>
                        <Select style="width:350px" v-model="params.roleId" placeholder="请选择角色">
                            <Option :value="''" >请选择角色</Option>
                            <Option v-for="(val,key) of roleList" :value="key" :key="key">{{ val }}</Option>
                        </Select>
                    </span>
                </div>
				<div class="item btn">
					<span class="lb"></span>       
					<span>
						<Button size="large" @click="cancel()">取消</Button>
						<Button type="info" size="large" @click="confirm()" :loading="loading">确认</Button>
					</span>	
				</div>
            </div>
			
        </Card>
    </div>
</template>

<script>
import { getUserInfo, addUserInfo, editUserInfo ,getRoleList} from "@/api/api_user.js";
import eventBus from "@/common/evnetBus/eventBus.js";
import md5 from "@/common/libs/md5.js";
export default {
	data() {
		return {
			isEdit: false,
			loading: false,
			params: {
				passwd: "",
				account: this.$route.query.account || '',
				name: "",
				confirmPasswd: "",
                phone: "",
                roleId:""
            },
            roleList:{}
		};
	},
	created() {
		if (this.params.account) {
			this.isEdit = true;
			this.getUserInfo();
        }
        this.getRoleList()
	},
  	mounted() {},
	methods: {
        getRoleList(){
            getRoleList().then(res => {
                if(res.code == 200){
                     var list = res.data || [];
                    var map = {};
                    list.forEach((item)=>{
                        map[item.id] = item.name;
                    })
                    this.roleList = map;
                }
            })
        },
		getUserInfo() {
			getUserInfo({
				account: this.params.account
			}).then(res => {
				if (res.code == 200) {
                    this.params = res.data
                    this.params.roleId = res.data.roleId + ""
				}
			});
		},
		confirm() {
			let accountReg = /^(?![^a-zA-Z]+$)(?!\D+$)/;
			let passwdReg =  /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,}$/;

			if (!this.params.account) {
				this.$Message.error("请输入用户账号");
				return false;
			}
			if (!accountReg.test(this.params.account)) {
				this.$Message.error("用户账号格式不正确");
				return false;
			}
			if (!this.params.passwd) {
				this.$Message.error("请输入密码");
				return false;
			}
			if (!passwdReg.test(this.params.passwd)) {
				this.$Message.error("密码格式不正确");
				return false;
			}
			if (!this.params.confirmPasswd) {
				this.$Message.error("请再次输入密码");
				return false;
			}
			if (this.params.confirmPasswd != this.params.passwd) {
				this.$Message.error("两次密码不一致");
				return false;
            }
            if (!this.params.roleId) {
				this.$Message.error("请选择所属角色");
				return false;
			}
            // if(this.globalFun.phoneNumCheck(this.params.phone)) {
            //     this.$Message.error("请输入正确的手机号码");
			// 	return false;
			// }
			if(!this.loading){
				this.loading = true;
				var params = JSON.parse(JSON.stringify(this.params));
				params.passwd = md5(params.passwd)
                params.confirmPasswd = md5(params.confirmPasswd)
				if (this.isEdit) {
					editUserInfo(params).then(res => {
						if (res.code == 200) {
							this.$Message.success("编辑用户信息成功");
							this.cancel();
							this.loading = false;
						}else {
                            this.loading = false;
                        }
					});
				} else {
					addUserInfo(params).then(res => {
						if (res.code == 200) {
							this.$Message.success("添加用户成功");
							this.cancel()
							this.loading = false;
						}else{
                            this.loading = false;
                        }
					});
				}
			}
			
		},
		cancel(){
            if(this.isEdit){
                eventBus.$emit('closeTag', 'user_edit');
            }else{
                eventBus.$emit('closeTag', 'user_add');
            }
			history.go(-1);
		}
  	},
  	computed: {}
};
</script>