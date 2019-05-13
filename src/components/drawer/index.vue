<template>
  <div id="Drawer">
    <mu-container>
      <!-- 抽屉 -->
      <mu-drawer :open.sync="open" :docked="docked" :right="position === 'right'">
        <mu-list>
          <mu-list-item button>
            <mu-list-item-title>Menu Item 1</mu-list-item-title>
          </mu-list-item>
          <mu-list-item button>
            <mu-list-item-title>Menu Item 2</mu-list-item-title>
          </mu-list-item>
          <mu-list-item button @click="closeDrawer">
            <mu-list-item-title>Close</mu-list-item-title>
          </mu-list-item>
        </mu-list>
      </mu-drawer>
    </mu-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      position: "left",
      docked: false
    };
  },
  computed: {
    open: {
      get: function() {
        return this.$store.state.drawerStatus;
      },
      set: function(val) {
		  
	  }
    }
  },
  methods: {
    closeDrawer() {
      this.$store.commit("RecordDrawerStatus");
    }
  },
  mounted() {
  },
  watch: {
  },
  updated() {}
};
</script>

<style lang="scss" scoped>
</style>