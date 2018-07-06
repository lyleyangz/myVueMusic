<template>
    <mu-container>
        <div class="music-bottom">
            <mu-bottom-nav :value.sync="shift" shift ripple color="#0e0a0a">
                <mu-bottom-nav-item value="music" title="Music" icon="music_note"></mu-bottom-nav-item>
                <mu-bottom-nav-item value="movies" title="Movies" icon="ondemand_video"></mu-bottom-nav-item>
                <mu-bottom-nav-item value="news" title="News" icon="books"></mu-bottom-nav-item>
                <mu-bottom-nav-item value="pictures" title="Pictures" icon="photo"></mu-bottom-nav-item>
            </mu-bottom-nav>
        </div>
        <Bottomitems :shift = 'shift'></Bottomitems>
</mu-container>
</template>

<script>
import Bottomitems from "./bottomItems";
export default {
  components: {
    Bottomitems
  },
  data() {
    return {
      shift: "music"
    };
  },
  methods: {},
  mounted() {
      this.$root.eBus.$on('bottomInitActive',()=> {
          this.shift = ''
      });
  },
  updated() {
      if(!!this.shift){
          this.$root.eBus.$emit("topInitActive");
      }
  },
  destroyed(){
      this.$root.eBus.$off('bottomInitActive');
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.music-bottom {
  position: fixed;
  bottom: 0rem;
  width: 100%;
}
</style>
