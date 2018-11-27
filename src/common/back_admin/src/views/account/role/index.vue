
<template>
    <div>
        <Row :gutter="10">
            <Col span="24">
                <Card>
                    <p slot="title">
                        角色管理
                    </p>
                    <Row class="search">
                        <span class="lb">角色名称</span>
                        <Input v-model.trim="searchParams.name" style="width: 200px" />
                        <span class="btn">
                            <Button type="primary" icon="search" @click="search">搜索</Button>
                        </span>
                    </Row>
					<Row v-if="auth && globalFun.userAuth.checkAuth(auth,'2022')">
						<Col>
							<Button type="primary" icon="plus-round" @click="add()">新增</Button>
						</Col>
					</Row>
                    <Row class="margin-top-10 searchable-table-con1">
                        <Table :columns="columns" :data="list"></Table>
                    </Row>
                    <Page v-if="pageTotal>0" :current.sync="page"  :total="pageTotal" :page-size="searchParams.pageSize"  @on-change="convertPage" @on-page-size-change="convertPageSize" show-elevator show-total show-sizer :page-size-opts="[10,20,50]" placement="top"></Page>
                </Card>
            </Col>
        </Row>

		<Modal :width="500" class="modal" class-name="vertical-center-modal" v-model="modal.is" :title="modal.title">
            <Row>
                <Col>
                    <span class="lb"><em>*</em>角色名称：</span>
                    <span><Input v-model.trim="params.name" style="width: 300px" placeholder="限制15字" :maxlength="15"/></span>
                </Col>
            </Row>
            <div slot="footer">
                <Button @click="modal.is=false">取消</Button>
                <Button type="primary" @click="save">提交</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
import { getRoleList,addRole,updateRole} from "@/api/api_role.js";
export default {
	data() {
		return {
			columns: [],
			list: [],
			page: 1,
			pageTotal: 0,
			searchParams: {
				name: "",
				pageNo: 1,
				pageSize: 10
			},
			modal:{
				is: false,
				title: ""
			},
			params:{
                name: ""
			},
			auth: ""
		};
	},
	methods: {
		init() {
			this.getList();
			this.setColumns();
		},
		setColumns() {
			this.columns = [{
                key: 'seq',
                title: '序号',
                width: 62,
                render: (h, params) => {
                    return h('div', [
                        h('span', {}, (this.page-1)*this.searchParams.pageSize + params.index+1)
                    ]);
                }
            },{
				key: "name",
				title: "角色名称"
			},{
				key: "createTime",
				title: "创建时间",
				render: (h, params) => {
                    return h('div', [
                        h('span', {}, this.globalFun.dateFormat(params.row.createTime,"yyyy-MM-dd hh:mm:ss"))
                    ]);
                }
			},{
				key: "status",
				title: "操作",
				width: 300,
				render: (h, params) => {
					let buttonList = [];
					if(this.globalFun.userAuth.checkAuth(this.auth,"2023")){
						buttonList.push(h("Button",{
							props: {
								type: "primary",
								size: "small"
							},
							style: {
								marginRight: "5px"
							},
							on: {
								click: () => {
									this.edit(params.row);
								}
							}},"修改"))
					}
					if(this.globalFun.userAuth.checkAuth(this.auth,"2024")){
						buttonList.push(h("Button",{
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
										name: "role_authority",
										query: {
											account: params.row.id
										}
									});
									
								}
							}
						},"权限分配"))
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
		getList(callback) {
			// this.list = [{
			// 	id:1,
			// 	name:"aaa",
			// 	createTime:"2018-10-10 10:10:00"
			// }]
			// return false;
			this.$Spin.show()
			getRoleList(this.searchParams).then(res => {
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
		edit(item){
			this.modal = {
				is: true,
				title: "修改角色"
			};
			this.params = JSON.parse(JSON.stringify(item));
		
		},
		add(){
			this.modal = {
				is: true,
				title: "新增角色"
			};
			this.params = {};
		},
		save(){
			if(!this.params.name){
                this.$Message.error('角色名称不能为空');
                return false;
            }
			if(this.params.id){
				updateRole(this.params).then(res=>{
					if(res.code == 200){
						this.modal.is = false;
						this.$Message.success('修改成功');
						this.getList();
					}
				})
			}else{
				addRole(this.params).then(res=>{
					if(res.code == 200){
						this.modal.is = false;
						this.$Message.success('新增成功');
						this.getList();
					}
				})
			}
			this.modal.is = false;
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

</style>