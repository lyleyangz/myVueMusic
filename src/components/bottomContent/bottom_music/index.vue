<template>
<div>
    <mu-container>
        <div class="demo-text" v-if="shift == '1'">
            <div class="music-carousel">
                <mu-carousel transition="fade">
                    <mu-carousel-item>
                        <img :src="carouselImg1">
                    </mu-carousel-item>
                    <mu-carousel-item>
                        <img :src="carouselImg2">
                    </mu-carousel-item>
                    <mu-carousel-item>
                        <img :src="carouselImg3">
                    </mu-carousel-item>
                    <mu-carousel-item>
                        <img :src="carouselImg4">
                    </mu-carousel-item>
                </mu-carousel>
            </div>
            <div class="music-list">
                <mu-expansion-panel :expand="panel === 'panel1'" @change="toggle('panel1')" :zDepth='24'>
                    <div slot="header" @click="testUrl()">推荐歌单</div>
                    <mu-container>
                    <mu-flex justify-content="center">
                        <mu-paper :z-depth="1">
                            <mu-grid-list class="gridlist-demo">
                                <mu-grid-tile v-for="(tile, index) in list" :key="index"  @click="gridListRouter(index)">
                                <img :src="tile.image" >
                                <span slot="title">{{tile.title}}</span>
                                <span slot="subTitle">by <b>{{tile.author}}</b></span>
                                <mu-button slot="action" icon>
                                    <mu-icon value="star_border"></mu-icon>
                                </mu-button>
                                </mu-grid-tile>
                            </mu-grid-list>
                        </mu-paper>
                    </mu-flex>
                </mu-container>
                </mu-expansion-panel>
                <mu-expansion-panel :expand="panel === 'panel2'" @change="toggle('panel2')" :zDepth='24'>
                    <div slot="header">最新音乐</div>
                    <mu-container>
                    <mu-flex justify-content="center">
                        <mu-paper :z-depth="1">
                            <mu-grid-list class="gridlist-demo">
                                <mu-grid-tile v-for="(tile, index) in list" :key="index">
                                <img :src="tile.image" >
                                <span slot="title">{{tile.title}}</span>
                                <span slot="subTitle">by <b>{{tile.author}}</b></span>
                                <mu-button slot="action" icon>
                                    <mu-icon value="star_border"></mu-icon>
                                </mu-button>
                                </mu-grid-tile>
                            </mu-grid-list>
                        </mu-paper>
                    </mu-flex>
                </mu-container>
                </mu-expansion-panel>
                <mu-expansion-panel :expand="panel === 'panel3'" @change="toggle('panel3')"  :zDepth='24'>
                    <div slot="header">最热音乐</div>
                    <mu-container>
                    <mu-flex justify-content="center">
                        <mu-paper :z-depth="1">
                            <mu-grid-list class="gridlist-demo">
                                <mu-grid-tile v-for="(tile, index) in list" :key="index">
                                <img :src="tile.image" >
                                <span slot="title">{{tile.title}}</span>
                                <span slot="subTitle">by <b>{{tile.author}}</b></span>
                                <mu-button slot="action" icon>
                                    <mu-icon value="star_border"></mu-icon>
                                </mu-button>
                                </mu-grid-tile>
                            </mu-grid-list>
                        </mu-paper>
                    </mu-flex>
                </mu-container>
                </mu-expansion-panel>
            </div>
        </div>
        <div class="demo-text" v-if="shift == '2'">
            <player></player>
        </div>
        <div class="demo-text" v-if="shift == '3'">
            <p>{{shift}}</p>
        </div>
        <div class="demo-text" v-if="shift == '4'">
            <p>{{shift}}</p>
        </div>
        <slot></slot>
    </mu-container>
</div>
</template>

<script>
import carouselImg1 from "../../../assets/images/carousel-1.jpg";
import carouselImg2 from "../../../assets/images/carousel-2.jpg";
import carouselImg3 from "../../../assets/images/carousel-3.jpg";
import carouselImg4 from "../../../assets/images/carousel-4.jpg";
import http from "../../../api/fetch.js";
import player from "../../player/index";

export default {
  components: {
    player
  },
  data() {
    return {
      carouselImg1,
      carouselImg2,
      carouselImg3,
      carouselImg4,
      panel: "",
      //   gridList
      list: [
        {
          image: carouselImg1,
          title: "Breakfast",
          author: "Myron"
        },
        {
          image: carouselImg2,
          title: "Burger",
          author: "Linyu"
        },
        {
          image: carouselImg3,
          title: "Camera",
          author: "ruolin"
        },
        {
          image: carouselImg4,
          title: "Hats",
          author: "kakali"
        }
      ],
      data: {
        method: "get",
        params: {
          keyword: "thatgirl",
          page: 1,
          pagesize: 1
        }
      }
    };
  },
  computed:{
    shift: {
      get: function() {
        return this.$store.state.current.BotttomNavBar.BotttomNavBarStates;
      },
      set: function(val) {
	    }
    }
  },
  methods: {
    toggle(panel) {
      this.panel = panel === this.panel ? "" : panel;
    },
    gridListRouter(index) {
      // console.log(index)
    },
    testUrl() {
      if (!this.panel) {
        http
          .httpHash(this.data)
          .then(res => {
            if (res.error_code === 0 && res.status === 1) {
              if (res.data.lists.length > 1) {
                // let multipleData = {}
                for (let i in res.data.lists) {
                  http
                    .httpSource({
                      hash: res.data.lists[i].FileHash,
                      album_id: res.data.lists[i].AlbumID
                    })
                    .then(res => {
                      let a = this.globalFun.parseLyric(res.data.lyrics);
                      console.log(a);
                    });
                }
              } else {
                http
                  .httpSource({
                    hash: res.data.lists[0].FileHash,
                    album_id: res.data.lists[0].AlbumID
                  })
                  .then(res => {
                    console.log(res.data.lyrics);
                    let a = this.globalFun.parseLyric(res.data.lyrics);
                    console.log(a);
                  });
              }
            }
          })
          .catch(error => {
            console.warn(error, "fetch.js-185");
          });
      }
    }
  },
  mounted() {},
  updated() {
    // console.log(this.shift,'fa');
  },
  destroyed() {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.demo-text {
  padding: 0 0.213333rem;
  background: url("../../../assets/images/bg.jpg");
  background-size: 100% 100%;
  width: 100%;
  .music-list {
    margin: 0.266667rem 0rem 0.266667rem 0rem;
    .mu-expansion-panel {
      background: transparent;
      color: #fff;
    }
    .gridlist-demo {
      overflow-y: auto;
    }
  }
  img {
    width: 100%;
    height: 100%;
    background-size: contain;
  }
}
</style>
