<template>
<div>
  <!-- 抽屉 -->
  <DrawerTempalte></DrawerTempalte>
  <!-- 顶部 -->
  <TopTempalte></TopTempalte>
  <!-- 内容 -->
  <EntranceTempalte></EntranceTempalte>
  <!-- 底部 -->
  <BotTempalte></BotTempalte>
</div>
</template>

<script>
import Drawer from './Drawer/index'
import Bottombar from './bottomBar/index'
import Topbar from './topBar/index'
import Entrance from './Entrance/index'


export default {
    components:{
      "TopTempalte":Topbar,
      "BotTempalte":Bottombar,
      "EntranceTempalte":Entrance,
      "DrawerTempalte":Drawer
    },
  data() {
    return {
    };
  },
  methods: {},
  mounted() {},
  updated() {},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.music-bottom {
  bottom: 0rem;
  width: 100%;
  padding-top: 1rem;
}
</style>
