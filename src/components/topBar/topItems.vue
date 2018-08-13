<template>
    <mu-container>
        <slot></slot>
        <div class="demo-text" v-if="index == '0'">
            <p>index: {{index}}</p>
            <button @click="add()">{{count}}</button>
        </div>
        <div class="demo-text" v-if="index == '1'"  :class="$i18n.locale">
            <p>index: {{index}}</p>
            <button @click="reduce()">{{count}}</button>
            <label for="locale">locale</label>
            <select v-model="locale">
              <option>ENG</option>
              <option>ZHS</option>
            </select>
            <p style="color:red">{{$t('test.a')}}</p>
        </div>
        <div class="demo-text" v-if="index == '2'">
            <div class="content">
                <img class="pic1" src="../../assets/images/4.jpg" />
                <img class="pic2" src="../../assets/images/1.jpg" />
                <img class="pic3" src="../../assets/images/2.jpg" />
                <img class="pic4" src="../../assets/images/3.jpg" />
            </div>  
        </div>
</mu-container>
</template>

<script>
export default {
  props: ["index"],
  data() {
    return {
      switchVal: {
        value: false
      },
      locale:'ENG'
    };
  },
  computed: {
    count() {
      return this.$store.state.count;
    }
  },
  mounted() {
          console.log(this.$i18n.locale)
  },
  updated() {
    // console.log(this.$store.state.count);
  },
  watch:{
    locale (val) {
      this.$i18n.locale = val
      console.log(this.$i18n.locale)
      console.log(this.$i18n.messages[val].test)
    }
  },
  methods: {
    // switchchange(value){
    //   value ? this.lang = 'ZHS' : this.lang = 'ENG'
    //   console.log(this.$i18n.locale);
    //     this.$i18n.locale =  this.lang;
    // },
    add() {
      this.$store.commit("add");
    },
    reduce() {
      this.$store.commit("reduce");
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.demo-text {
  padding: 0.213333rem;
  background: url("../../assets/images/bg2.jpg");
  background-size: 100% 100%;
  width: 100%;
  height: 16.666667rem;
  button {
    width: 0.666667rem;
    height: 0.666667rem;
  }
  .content {
    width: 100%;
    height:100%;
    overflow: hidden;
    margin: 1.333333rem auto;
    position: relative;
  }
  img {
    z-index: 1;
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
        left: 4.733333rem;
    top: 10.053333rem;
    transform: rotate3d(1, 0, 1, 64deg);
  }
  .pic2 {
    left: 10.533333rem;
    top: 12rem;
    transform: rotate3d(1, 0, 1, -66deg);
  }
  .pic3 {
    left: 8.066667rem;
    top: 10rem;
    transform: rotate3d(1,0,1,80deg);
  }
  .pic4 {
    left: 1.666667rem;
    top: 10rem;
    transform: rotate3d(1, 0, 1, -70deg);
  }
}
</style>
