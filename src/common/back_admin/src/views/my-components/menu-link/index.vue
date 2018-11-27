<style lang="less">
    @import './index.less';
</style>

<template>
    <Sider hide-trigger collapsible :collapsed-width="300">
        <ul class="menu">
            <li v-for="(item,index) of list" :key="index" :class="item.open?'open':''">
                <span class="item" :class="item.active?'active':''" @click="clickItem(item)">
                    <Icon :type="item.icon"></Icon>
                    {{item.title}}
                    <i></i>
                    <Icon v-if="item.sub" type="ios-arrow-down arrow"></Icon>
                </span>
                
                <ul v-if="item.sub " class="sub-menu" :style="item.open?'height:'+item.sub.length * 49+'px':''" >
                    <li class="sub-item" :class="subItem.active?'active':''" v-for="(subItem,subIndex) of item.sub" :key="subIndex" @click="clickItem(subItem)">
                        {{subItem.title}}
                    </li>
                </ul>
            </li>
        </ul>
    </Sider>
</template>

<script>

export default {
    name: 'menu-link',
    props: {
        shrink: {
            type: Boolean,
            default: false
        },
        menuList: {
            type: Array,
            required: true
        },
       
        beforePush: {
            type: Function
        },
        openNames: {
            type: Array
        }
    },
    data () {
        return {
            list: []
        };
    },
    computed: {
       
    },
    watch: {
		$route(to, from) {
			this.activeMenu(to.path)
		}
	},
    methods: {
        activeMenu(path){
			for(var menu of this.list){
				if(menu.url && path.search(menu.url)>=0){
					this.$set(menu,'active',true);
				}else{
					this.$set(menu,'active',false);
				}
				if(menu.sub){
					var open = false;
					for(var subMenu of menu.sub){
						if(subMenu.url && path.search(subMenu.url)>=0){
							this.$set(subMenu,'active',true);
							open = true;
						}else{
							this.$set(subMenu,'active',false);
						}
					}
					this.$set(menu,'open',open);
				}
			}
        },
        clickItem(item){
			if(item.url){
                this.$router.push({path: item.url});
			}else{
				this.$set(item,'open',!item.open);
			}
		},
    },
    mounted () {
        this.list = this.menuList;
        this.activeMenu(this.$route.path)
    },
};
</script>
