<template>
  <div id="entrance">
    <!-- <playerTem></playerTem> -->
    <div class="entrance_top" v-if="Entrytype.currentTag==='TOP'">
      <topPlayerTem v-if="Entrytype.TopNavBar.TopNavBarStates===0"></topPlayerTem>
      <topNoticeTem v-if="Entrytype.TopNavBar.TopNavBarStates===1"></topNoticeTem>
      <topUsereTem v-if="Entrytype.TopNavBar.TopNavBarStates===2"></topUsereTem>
    </div>
    <div class="entrance_bottom" v-if="Entrytype.currentTag==='BOTTOM'">
      <bottomMusicTem v-if="Entrytype.BotttomNavBar.BotttomNavBarStates===1"></bottomMusicTem>
      <bottomMovieTem v-if="Entrytype.BotttomNavBar.BotttomNavBarStates===2"></bottomMovieTem>
      <bottomNoteTem v-if="Entrytype.BotttomNavBar.BotttomNavBarStates===3"></bottomNoteTem>
      <bottomPicsTem v-if="Entrytype.BotttomNavBar.BotttomNavBarStates===4"></bottomPicsTem>
    </div>
  </div>
</template>

<script>
import player from "../player/index"
import bottomMusic from "../bottomContent/bottom_music/index"
import bottomMovie from "../bottomContent/bottom_movie/index"
import bottomNote from "../bottomContent/bottom_note/index"
import bottomPics from "../bottomContent/bottom_pics/index"

import topNotice from "../topContent/top_notice/index"
import topPlayer from "../topContent/top_player/index"
import topUser from "../topContent/top_user/index"
export default {
  components: {
    "playerTem":player,

    "topNoticeTem":topNotice,
    "topPlayerTem":topPlayer,
    "topUsereTem":topUser,

    "bottomMovieTem":bottomMovie,
    "bottomMusicTem":bottomMusic,
    "bottomNoteTem":bottomNote,
    "bottomPicsTem":bottomPics
  },
  data () {
    return {
    }
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
  updated(){
    // console.log(this.Entrytype)
  },
  mounted(){
    // console.log(this.Entrytype,"数据来自:mount")
  }
}
</script>

<style lang="scss" scoped>
#entrance{
  padding: 50px 0 60px;
  border: 1px solid red;
}
</style>