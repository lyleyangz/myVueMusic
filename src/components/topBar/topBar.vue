<template>
    <mu-container>
      <div class="music-top">
        <mu-tabs :value.sync="index" full-width color='#0e0a0a' indicator-color='#f70404' ripple>
          <mu-tab>
            <mu-icon value="phone"></mu-icon>
            RECENTS
          </mu-tab>
          <mu-tab>
            <mu-icon value="favorite"></mu-icon>
            FAVORITES
          </mu-tab>
          <mu-tab>
            <mu-icon value="person_pin"></mu-icon>
            NEARBY
          </mu-tab>
        </mu-tabs>
        <Topitems :index = "index"></Topitems>
      </div>
</mu-container>
</template>

<script>
import Topitems from "./topItems";
export default {
  components: {
    Topitems
  },
  data() {
    return {
      index: ""
    };
  },
  methods: {},
  mounted() {
    this.$root.eBus.$on("topInitActive", () => {
      this.index = "";
    });
  },
  updated() {
    if (this.index !== "") {
      this.$root.eBus.$emit("bottomInitActive");
    }
  },
  destroyed() {
    this.$root.eBus.$off("topInitActive");
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.music-top {
  width: 100%;
}
</style>
