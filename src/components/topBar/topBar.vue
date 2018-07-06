<template>
    <mu-container>
        <mu-drawer :open.sync="open" :docked="docked" :right="position === 'right'">
                    <mu-list>
                    <mu-list-item button>
                        <mu-list-item-title>Menu Item 1</mu-list-item-title>
                    </mu-list-item>
                    <mu-list-item button>
                        <mu-list-item-title>Menu Item 2</mu-list-item-title>
                    </mu-list-item>
                    <mu-list-item button>
                        <mu-list-item-title @click="open = false">Close</mu-list-item-title>
                    </mu-list-item>
                    </mu-list>
                </mu-drawer>
      <div class="music-top">
        <mu-tabs :value.sync="index" full-width color='#0e0a0a' :indicator-color='indicatorColor' ripple :change="change()">
                <mu-flex justify-content="center" align-items="center">
                <mu-button color="#fff" @click="open = !open" flat>
                    <mu-icon size="48" value="home"></mu-icon>
                </mu-button>
                </mu-flex>
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
      docked: false,
      open: false,
      position: "left",
      index: "",
      indicatorColor: "#f70404"
    };
  },
  methods: {
    getSpanBotCol(sign) {
      return sign
        ? (this.indicatorColor = "#f70404")
        : (this.indicatorColor = "#0e0a0a");
    },
    change() {
      //   console.log("change")
    }
  },
  mounted() {
    this.$root.eBus.$on("topInitActive", () => {
      this.index = "";
      this.getSpanBotCol(false);
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
