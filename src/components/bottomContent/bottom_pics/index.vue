<template>
  <mu-container>
    <div class="demo-text">
      <div class="content">
        <img class="pic1" src="../../../assets/images/4.jpg">
        <img class="pic2" src="../../../assets/images/1.jpg">
        <img class="pic3" src="../../../assets/images/2.jpg">
        <img class="pic4" src="../../../assets/images/3.jpg">
      </div>
    </div>
  </mu-container>
</template>

<script>
export default {
  data() {
    return {};
  },
  computed: {},
  mounted() {},
  updated() {},
  watch: {},
  methods: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.demo-text {
  padding: 0.213333rem;
  background: url("../../../assets/images/bg2.jpg") no-repeat center;
  background-size: 100% 100%;
  width: 100%;
  height: 15rem;
  button {
    width: 0.666667rem;
    height: 0.666667rem;
  }
  .content {
    width: 100%;
    height: 100%;
    overflow: hidden;
    margin: auto;
  }
  img {
    width: 20%;
    height: auto;
    position: absolute;
    padding: 10px 10px 15px 10px;
    background: #ffffff;
    border: 1px solid #cccccc;
    /* 动画的时间 */
    -moz-transition: 0.5s;
    -webkit-transition: 0.5s;
    transition: 0.5s;
  }
  img:hover {
    z-index: 2;
    transform: scale(1.5);
    -moz-transform: scale(1.5);
    -webkit-transform: scale(1.5);
    box-shadow: -10px 10px 20px #000000;
    -moz-box-shadow: -10px 10px 20px #000000;
    -webkit-box-shadow: -10px 10px 20px #000000;
  }
  .pic1 {
    left: 3rem;
    top: 12rem;
    transform: rotate3d(1, 0, 1, 64deg);
  }
  .pic2 {
    left: 6rem;
    top: 14rem;
    transform: rotate3d(1, 0, 1, -11deg);
  }
  .pic3 {
    left: 6rem;
    top: 11rem;
    transform: rotate3d(1, 0, 1, 80deg);
  }
  .pic4 {
    left: 0.5rem;
    top: 13rem;
    transform: rotate3d(1, 0, 1, -70deg);
  }
}
</style>
