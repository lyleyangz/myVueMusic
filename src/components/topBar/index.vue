<template>
    <mu-container>
        <div class="music-top">
            <mu-tabs :value.sync="shift" full-width color='#0e0a0a' :indicator-color='indicatorColor' ripple>
                <mu-flex justify-content="center" align-items="center">
                <mu-button color="#fff" flat @click="drawerOpen">
                    <mu-icon value="dashboard"></mu-icon>
                </mu-button>
                </mu-flex>
                <mu-tab>
                    <mu-icon value="queue_music"></mu-icon>
                </mu-tab>
                <mu-tab>
                    <mu-icon value="message"></mu-icon>
                </mu-tab>
                <mu-tab>
                    <mu-icon value="person"></mu-icon>
                </mu-tab>
            </mu-tabs>
        </div>
    </mu-container>
</template>

<script>
export default {
  components: {
  },
  data() {
    return {
      shift:-1,
      indicatorColor: "green"
    };
  },
  methods: {
    drawerOpen(){
      this.$store.commit("RecordDrawerStatus")
    },
  },
  computed:{
  },
  mounted() {},
  updated() {
    // 顶部导航栏状态值
    this.$store.commit("RecordNavStatus",{type:"TOP",val:this.shift});
  },
  destroyed() {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.mu-tab .mu-icon{
    margin-bottom: 0px;
}
.music-top {
  width: 100%;
  position: fixed;
  top: 0;
  z-index: 9999;
}
</style>
