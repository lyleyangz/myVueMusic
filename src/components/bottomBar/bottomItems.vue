<template>
<div>
    <mu-container>
        <div class="demo-text" v-if="shift == 'music'">
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
                    <div slot="header">推荐歌单</div>
                    <mu-container>
                    <mu-flex justify-content="center">
                        <mu-paper :z-depth="1">
                            <mu-grid-list class="gridlist-demo">
                                <mu-grid-tile v-for="tile, index in list" :key="index">
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
                                <mu-grid-tile v-for="tile, index in list" :key="index">
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
                                <mu-grid-tile v-for="tile, index in list" :key="index">
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
        <div class="demo-text" v-if="shift == 'movies'">
            <p>{{shift}}</p>
        </div>
        <div class="demo-text" v-if="shift == 'news'">
            <p>{{shift}}</p>
        </div>
        <div class="demo-text" v-if="shift == 'pictures'">
            <p>{{shift}}</p>
        </div>
        <slot></slot>
    </mu-container>
</div>
</template>

<script>
import carouselImg1 from "../../assets/images/carousel-1.jpg";
import carouselImg2 from "../../assets/images/carousel-2.jpg";
import carouselImg3 from "../../assets/images/carousel-3.jpg";
import carouselImg4 from "../../assets/images/carousel-4.jpg";

export default {
  props: ["shift"],
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
      ]
    };
  },
  methods: {
    toggle(panel) {
      this.panel = panel === this.panel ? "" : panel;
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
  padding: 0.213333rem;
  background: url("../../assets/images/bg.jpg");
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
