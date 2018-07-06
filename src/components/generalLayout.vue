<template>
<div>
        <Topbar></Topbar>
        <Bottombar class="music-bottom"></Bottombar>
</div>
</template>

<script>
import Bottombar from './bottomBar/bottomBar'
import bottomItems from './bottomBar/bottomItems'
import Topbar from './topBar/topBar'
import Topitems from './topBar/topItems'

export default {
    components:{
        Bottombar,
        bottomItems,
        Topbar,
        Topitems
    },
  data() {
    return {
    };
  },
  mounted() {},
  updated() {},
  methods: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.music-bottom {
  bottom: 0rem;
  width: 100%;
}

</style>
