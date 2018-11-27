<style lang="less">
    @import "./main.less";
</style>
<template>
    <div class="main" :class="{'main-hide-text': shrink}" ref="scrollBar">
        <div class="sidebar-menu-con" :style="{width: shrink?'60px':'200px', overflow: shrink ? 'visible' : 'auto'}">
            <!-- <scroll-bar ref="scrollBar">
                <shrinkable-menu 
                    :shrink="shrink"
                    @on-change="handleSubmenuChange"
                    :theme="menuTheme" 
                    :before-push="beforePush"
                    :open-names="openedSubmenuArr"
                    :menu-list="menuList">
                    <div slot="top" class="logo-con">
                        <p>澳绿宝溯源项目</p>
                        <p>管理后台</p>
                        
                    </div>
                </shrinkable-menu> -->
                
            <!-- </scroll-bar> -->
            <div class="logo-con">
                <p>澳绿宝溯源项目</p>
                <p>管理后台</p>
            </div>
            <menu-link :menu-list="menuList"></menu-link>
        </div>
        <div class="main-header-con" :style="{paddingLeft: shrink?'60px':'200px'}">
            <div class="main-header">
                <div class="navicon-con">
                    <Button :style="{transform: 'rotateZ(' + (this.shrink ? '-90' : '0') + 'deg)'}" type="text" @click="toggleClick">
                        <Icon type="navicon" size="32"></Icon>
                    </Button>
                </div>
                <div class="header-middle-con">
                    <div class="main-breadcrumb">
                        <breadcrumb-nav :currentPath="currentPath"></breadcrumb-nav>
                    </div>
                </div>
                <div class="header-avator-con">
                    <!-- <full-screen v-model="isFullScreen" @on-change="fullscreenChange"></full-screen> -->
                    <!-- <lock-screen></lock-screen> -->
                    <!-- <message-tip v-model="mesCount"></message-tip> -->
                    <!-- <theme-switch></theme-switch> -->
                    
                    <div class="user-dropdown-menu-con">
                        <Row type="flex" justify="end" align="middle" class="user-dropdown-innercon">
                            <Dropdown transfer trigger="click" @on-click="handleClickUserDropdown">
                                <a href="javascript:void(0)">
                                    <span class="main-user-name">{{ userName }}</span>
                                    <Icon type="arrow-down-b"></Icon>
                                </a>
                                <DropdownMenu slot="list">
                                    <!-- <DropdownItem name="ownSpace">个人中心</DropdownItem> -->
                                    <DropdownItem name="loginout" divided>退出登录</DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                            <Avatar :src="avatorPath" style="background: #619fe7;margin-left: 10px;"></Avatar>
                        </Row>
                    </div>
                </div>
            </div>
            <div class="tags-con">
                <tags-page-opened ref="tagsPage" :pageTagsList="pageTagsList"></tags-page-opened>
            </div>
        </div>
        <div class="single-page-con" :style="{left: shrink?'60px':'200px', backgroundColor: '#ffffff'}">
            <div class="single-page">
                <keep-alive :include="cachePage">
                    <router-view></router-view>
                </keep-alive>
            </div>
        </div>
    </div>
</template>
<script>
    import Vue from 'vue';
    import shrinkableMenu from './main-components/shrinkable-menu/shrinkable-menu.vue';
    import tagsPageOpened from './main-components/tags-page-opened.vue';
    import breadcrumbNav from './main-components/breadcrumb-nav.vue';
    import fullScreen from './main-components/fullscreen.vue';
    import lockScreen from './main-components/lockscreen/lockscreen.vue';
    import messageTip from './main-components/message-tip.vue';
    import themeSwitch from './main-components/theme-switch/theme-switch.vue';
    import Cookies from 'js-cookie';
    import util from '../common/libs/util.js';
    import scrollBar from '@/views/my-components/scroll-bar/vue-scroller-bars';
    import eventBus from '../common/evnetBus/eventBus.js';
    import menu from '@/common/router/menu.js';
    import menuLink from './my-components/menu-link/index.vue';
    
    
    
    export default {
        components: {
            shrinkableMenu,
            tagsPageOpened,
            breadcrumbNav,
            fullScreen,
            lockScreen,
            messageTip,
            themeSwitch,
            scrollBar,
            menuLink
        },
        data () {
            return {
                shrink: false,
                userName: '',
                isFullScreen: false,
                openedSubmenuArr: this.$store.state.app.openedSubmenuArr
            };
        },
        computed: {
            // menuList () {
            //     return this.$store.state.app.menuList;
            // },
            menuList(){
                var auth = sessionStorage.getItem("permission");
                let menuList = [];
				for(var item of menu){
					let sub = [];
					if(item.sub){
						for(var subItem of item.sub){
							if(auth.search(subItem.key.substr(0,3))>=0){
								sub.push(subItem)
							}
						}
					}
					
					if(auth.search(item.key)>=0){
						menuList.push(item)
					}else if(sub.length>0){
						item.sub = sub;
						menuList.push(item)
					}
				}
                return menuList;
            },
            
            pageTagsList () {
                return this.$store.state.app.pageOpenedList; // 打开的页面的页面对象
            },
            currentPath () {
                return this.$store.state.app.currentPath; // 当前面包屑数组
            },
            avatorPath () {
                return localStorage.avatorImgPath;
            },
            cachePage () {
                return this.$store.state.app.cachePage;
            },
            lang () {
                return this.$store.state.app.lang;
            },
            menuTheme () {
                return this.$store.state.app.menuTheme;
            },
            mesCount () {
                return this.$store.state.app.messageCount;
            }
        },
        methods: {
            init () {
                let pathArr = util.setCurrentPath(this, this.$route.name);
                // this.$store.commit('updateMenulist');
                if (pathArr.length >= 2) {
                    this.$store.commit('addOpenSubmenu', pathArr[1].name);
                }
                this.userName = sessionStorage.getItem("userName");
                let messageCount = 3;
                this.messageCount = messageCount.toString();
                this.checkTag(this.$route.name);
                this.$store.commit('setMessageCount', 3);
                
            },
            toggleClick () {
                this.shrink = !this.shrink;
            },
            handleClickUserDropdown (name) {
                if (name === 'ownSpace') {
                    util.openNewPage(this, 'ownspace_index');
                    this.$router.push({
                        name: 'ownspace_index'
                    });
                } else if (name === 'loginout') {
                    // 退出登录
                    this.$store.commit('logout', this);
                    this.$store.commit('clearOpenedSubmenu');
                    sessionStorage.clear();
                    this.$router.push({
                        name: 'login'
                    });
                }
            },
            checkTag (name) {
                let openpageHasTag = this.pageTagsList.some(item => {
                    if (item.name === name) {
                        return true;
                    }
                });
                if (!openpageHasTag) { //  解决关闭当前标签后再点击回退按钮会退到当前页时没有标签的问题
                    util.openNewPage(this, name, this.$route.params || {}, this.$route.query || {});
                }
            },
            handleSubmenuChange (val) {
                // console.log(val)
            },
            beforePush (name) {
                // if (name === 'accesstest_index') {
                //     return false;
                // } else {
                //     return true;
                // }
                return true;
            },
            close(name){
                this.$refs.tagsPage.close(name);
            },  
            fullscreenChange (isFullScreen) {
                // console.log(isFullScreen);
            },
            scrollBarResize () {
                // this.$refs.scrollBar.resize();
            },
          
        },
        watch: {
            '$route' (to) {
                this.$store.commit('setCurrentPageName', to.name);
                let pathArr = util.setCurrentPath(this, to.name);
                if (pathArr.length > 2) {
                    this.$store.commit('addOpenSubmenu', pathArr[1].name);
                }
                this.checkTag(to.name);
                localStorage.currentPageName = to.name;
            },
            lang () {
                util.setCurrentPath(this, this.$route.name); // 在切换语言时用于刷新面包屑
            },
            openedSubmenuArr () {
                setTimeout(() => {
                    this.scrollBarResize();
                }, 300);
            }
        },
        mounted () {
            this.init();
            window.addEventListener('resize', this.scrollBarResize);
            // this.getUserAuth();

            //  getUserAuth().then(res=>{
            //         if(res.code == 200){
            //             Vue.prototype.USER_AUTH = res.data.permission || '';
            //             _this.$store.commit('getUserAuth');
            //         }
                    
            //     })
        },
        created () {
            // 显示打开的页面的列表
            this.$store.commit('setOpenedList');
            eventBus.$on('closeTag', (name) => {
                console.log(this.$refs)
                this.$refs.tagsPage.close(name);
            });
            eventBus.$on('getUserAuth', () => {
                getUserAuth().then(res=>{
                    if(res.code == 200){
                        console.log(11)
                        Vue.prototype.USER_AUTH = res.data.permission || '';
                    }
                })
            });
            
        },
        dispatch () {
            window.removeEventListener('resize', this.scrollBarResize);
        }
    };
</script>