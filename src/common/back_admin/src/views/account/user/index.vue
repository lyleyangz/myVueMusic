
<template>
    <div>
        <Row :gutter="10">
            <Col span="24">
                <Card>
                    <p slot="title">
                        用户管理
                    </p>
                    <Row class="search">
                        <span class="lb">用户账号</span>
                        <Input v-model.trim="searchParams.account" style="width: 200px" />
                        <span class="lb">真实姓名</span>
                        <Input v-model.trim="searchParams.name" style="width: 200px" />
                        <span class="lb">联系电话</span>
						<input v-limitNum class="ivu-input" v-model.trim="searchParams.phone" :maxlength="11" style="width:200px"/>
                        <!-- <span class="lb">用户角色</span>
                        <Select style="width:200px" v-model="searchParams.status" placeholder="全部">
                            <Option :value="``" >全部</Option>
                            <Option v-for="(val,key) of statusList" :value="key" :key="key">{{ val }}</Option>
                        </Select> -->
                        <span class="lb">是否有效</span>
                        <Select style="width:200px" v-model="searchParams.status" placeholder="全部">
                            <Option :value="``" >全部</Option>
                            <Option v-for="(val,key) of effective" :value="key" :key="key">{{ val }}</Option>
                        </Select>
                        <span class="btn">
                            <Button type="primary" icon="search" @click="search">搜索</Button>
                            
                        </span>
                    </Row>
					<Row v-if="auth && globalFun.userAuth.checkAuth(auth,'2012')">
						<Col>
							<Button type="primary" icon="plus-round" @click="redirect()">新增用户</Button>
						</Col>
					</Row>
                    <Row class="margin-top-10 searchable-table-con1">
                        <Table :columns="columns" :data="list"></Table>
                    </Row>
                    <Page v-if="pageTotal>0" :current.sync="page"  :total="pageTotal" :page-size="searchParams.pageSize"  @on-change="convertPage" @on-page-size-change="convertPageSize" show-elevator show-total show-sizer :page-size-opts="[10,20,50]" placement="top"></Page>
                </Card>
            </Col>
        </Row>
    </div>
</template>

<script>
import { getUserList,forbiddenStatus ,enableStatus} from "@/api/api_user.js";
export default {
	data() {
		return {
			columns: [],
			list: [],
			page: 1,
			pageTotal: 0,
			searchParams: {
				account: "",
				name: "",
				phone: "",
				status: "",
				pageNo: 1,
				pageSize: 10
			},
			statusList: {
				0: "系统管理员",
				1: "运营",
				2: "市场"
			},
			effective: {
				0: "有效",
				1: "无效"
			},
			auth: ""
		};
	},
	methods: {
		init() {
			this.getUserList();
			this.setColumns();
		},
		setColumns() {
			this.columns = [{
				key: "id",
				title: "用户ID"
			},{
				key: "account",
				title: "用户账号"
			},{
				key: "name",
				title: "真实姓名",
				width: 200
			},{
				key: "phone",
				title: "联系电话"
			},{
				key: "roleName",
				title: "所属角色"
			},{
				key: "lastLoginTime",
				title: "最后登录时间",
			},{
				key: "status",
				title: "是否有效",
				render: (h, params) => {
					return h("div", [
					h("span", {}, this.effective[params.row.status] || "")
					]);
				}
			},{
				key: "status",
				title: "操作",
				width: 300,
				render: (h, params) => {
					let buttonList = [];

					if(this.globalFun.userAuth.checkAuth(this.auth,"2013")){
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
								this.$router.push({
									name: "user_edit",
									query: {
											account: params.row.account
										}
								});
								}
							}
							},
							"修改"
						))
					}
					if(this.globalFun.userAuth.checkAuth(this.auth,"2014")){
						if (params.row.status === 0) {
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
										this.update(params.row.status,params.row.account);
									}
									}
								},
								"禁用"
								)
							);
						}
						if (params.row.status === 1) {
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
										this.update(params.row.status,params.row.account);
									}
									}
								},
								"启用"
								)
							);
						}
					}
				return h("div",{
					style: {
						width: "100%",
						textAlign: "center"
					}
				},buttonList);}
			}
		];
		},
		getUserList(callback) {
			this.$Spin.show()
			getUserList(this.searchParams).then(res => {
				if(res.code == 200) {
					this.$Spin.hide()
					this.list = res.data.entities || []
                    this.pageTotal = res.data.count
                    if(callback){
                        callback();
                    }
				}else {
					this.$Spin.hide()
				}
			})
		},
		update(status, account){
			var sta = status == 0 ? forbiddenStatus:enableStatus
			let markedWords = status == 0 ? '禁用':'启用'
			this.$Modal.confirm({
				content: `是否要${markedWords}当前用户？`,
				loading: false,
				onOk: () => {
					this.$Spin.show();
					sta({
						account: account,
					}).then(res => {
						this.$Spin.hide();
						if(res.code == 200){
							this.$Message.success(`${markedWords}成功`);
						}
						this.getUserList();
					});
				}
			});
		},
		// 搜索
		search() {
			this.searchParams.pageNo = 1;
			this.getUserList(() => {
				this.page = 1;
			});
		},
		// 选择页数
		convertPage(index) {
			this.searchParams.pageNo = index;
			this.getUserList(() => {
				this.page = index;
			});
		},
		convertPageSize(size){
            this.searchParams.pageSize = size;
            this.getUserList();
        },
		//  页面跳转
		redirect(path) {
			this.$router.push({
				path: "/user/add"
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
@import '../../../common/styles/common.less';
@import "./index.less";
</style>