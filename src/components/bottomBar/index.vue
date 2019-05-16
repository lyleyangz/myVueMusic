<template>
  <div id="footer">
    <mu-container v-if="bottomType.length>0">
      <mu-bottom-nav :value.sync="shift" shift ripple color="#0e0a0a">
          <mu-bottom-nav-item  v-for="(items,index) in bottomType" :key="index" :value="items.value" :title="items.title" :icon="items.icon"></mu-bottom-nav-item>
      </mu-bottom-nav>
    </mu-container>
  </div>
</template>

<script>
export default {
  components: {
  },
  data() {
    return {
      shift:1,
      bottomType:[
        {
          value:1,
          title:"音乐",
          icon:"music_note"
        },
        {
          value:2,
          title:"影视",
          icon:"ondemand_video"
        },
        {
          value:3,
          title:"消息",
          icon:"books"
        },
        {
          value:4,
          title:"美拍",
          icon:"photo"
        }
      ]
    };
  },
  computed:{
    Entrytype: {
      get: function() {
        return this.$store.state.current;
      },
      set: function(val) {}
    }
  },
  methods: {},
  mounted() {},
  updated() {
    // 底部导航栏状态值
    this.$store.commit("RecordNavStatus",{type:"BOTTOM",val:this.shift});
    console.log(this.Entrytype)
  },
  destroyed(){
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
#footer{
  position: fixed;
  bottom: 0rem;
  width: 100%;
}
</style>
