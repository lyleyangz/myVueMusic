<template>
    <mu-container>
        <div class="demo-text" v-if="shift == 'music'">
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
      carouselImg4
    };
  },
  methods: {},
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
  padding: 16px;
  background:url("../../assets/images/bg.jpg");
  background-size: 100% 100%;
  width: 100%;
  height: 16.666667rem;
  img{
      width: 100%;
      height: 100%;
      background-size: contain
  }
}
</style>
