<template>
<div>
        <Topbar :q="Topbar"></Topbar>
        <Bottombar :q='Topbar123'></Bottombar>
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
        Topbar:'Topbar',
        Topbar123:'Topbar123'
    };
  },
  mounted() {},
  updated() {},
  methods: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
</style>
