<template>
    <div class="edit">
        <Card>
            <p slot="title">
               权限分配
            </p>
            <div class="cnt">
                <span class="treeList">
                    <Tree :data="menuList" show-checkbox multiple ref="tree"></Tree>
                </span>    
                <div class="item btn">
                    <span class="lb"></span>  
                    <span>
                        <Button type="info" size="large" @click="confirm">确定</Button>
                        <Button size="large" @click="cancel">取消</Button>
                    </span>
                </div>
            </div>
			
        </Card>
    </div>
</template>

<script>
import { getPermissionInfo,updatePermission } from "@/api/api_role.js";
import eventBus from "@/common/evnetBus/eventBus.js";
import menu from '@/common/router/menu.js';
export default {
	data() {
		return {
            menuList:[],
            params:{
                id: this.$route.query.account,
                permission: ""
            }
		};
	},
	created() {
        this.bindMenuData();
        console.log(this.params.id)
        this.getInfo();
	},
  	mounted() {

    },
	methods: {
        getInfo(){
            getPermissionInfo({
                id: this.params.id
            }).then(res=>{
                if(res.code == 200){
                    this.params.permission = res.data.permission || '';

                    this.bindMenuData(res.data.permission);
                }
            })
        },
        bindMenuData(data){
            this.menuList = [{
                title: '全部',
                expand: true
            }];
            let list = [];
            for(let item of menu){
                let temp = {
                    title: item.title,
                    expand: true,
                    key: item.key,
                    checked: data && data.search(item.key)!=-1,
                    children:[]
                }
                if(item.sub){
                    for(let subItem of item.sub){
                        if(subItem.key!=20201){
                            var subTemp = {
                                key: subItem.key,     
                                title:subItem.title,
                                expand: true,
                                checked: data && data.search(subItem.key)!=-1,
                                children:[]
                            }
                            if(subItem.sub){
                                for(let subItem1 of subItem.sub){
                                    var subTemp1 = {
                                        key: subItem1.key,     
                                        title: subItem1.title,
                                        checked: data && data.search(subItem1.key)!=-1,
                                    }
                                    subTemp.children.push(subTemp1);
                                }      
                            }
                            
                            temp.children.push(subTemp);
                        }
                    }
                }
                list.push(temp)
            }
            this.menuList[0].children = list;
        },
        fun(list){

        },
		cancel(){
            eventBus.$emit('closeTag', 'role_authority');
            history.go(-1);
        },
        confirm(){
            var arr = [];
            for(let item of this.$refs.tree.getCheckedNodes()){
                if(item.key){
                    arr.push(item.key);
                }
            }
            if(arr.length == 0){
                this.$Message.error('请选择权限');
                return false;
            }
            this.params.permission = arr.join(",");
            var _this = this;
            updatePermission(this.params).then(res=>{
                if(res.code == 200){
                    this.$Message.success("提交成功");
                    setTimeout(() => {
                        _this.cancel();
                    }, 1000);
                }
            })
           
        }
  	},
  	computed: {}
};
</script>

<style lang="less">
@import "../../../common/styles/common.less";
</style>