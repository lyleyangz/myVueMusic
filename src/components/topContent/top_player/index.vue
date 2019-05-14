<template>
  <div id="player">
    <!-- 圆圈 -->
    <div class="Cycle" ref="cycle">
      <div class="progress">
        <mu-circular-progress
          class="demo-circular-progress"
          mode="determinate"
          :value="linear"
          color="blue"
          :stroke-width="10"
          :size="240"
        ></mu-circular-progress>
      </div>
      <div class="theme">
        <img src="../../../assets/images/3.jpg">
      </div>
    </div>
    <!-- 歌词 -->
    <div class="Lyric" ref="Lyric">
      <div v-for="(value,index) in 20" :key="index">
        <p class="lyric_p" v-if="index!==3">
          <span style="display:none">时间{{value}}</span>
          <span>歌词{{value}}</span>
        </p>
        <p class="lyric_p active" v-if="index===3">
          <span style="display:none">时间{{value}}</span>
          <span>歌词{{value}}</span>
        </p>
      </div>
    </div>
    <!-- 操作 -->
    <div class="Switch" ref="switch">
      <!-- 上一首 -->
      <div class="pre">
        <mu-icon value="skip_previous" size="60"></mu-icon>
      </div>
      <!-- 播放暂停 -->
      <div class="play">
        <mu-icon value="play_circle_outline" size="80"></mu-icon>
        <mu-icon value="pause_circle_outline" size="80" style="display:none"></mu-icon>
      </div>
      <!-- 下一首 -->
      <div class="next">
        <mu-icon value="skip_next" size="60"></mu-icon>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      linear: 100,
    };
  },
  created() {
    this.timer = setInterval(() => {
      this.linear += 10;
      if (this.linear > 100) this.linear = 0;
    }, 1000);
  },
  methods: {},
  mounted() {
  },
  updated() {},
  destroyed() {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
#player {
  box-sizing: border-box;
  background: url("../../../assets/images/bg2.jpg") no-repeat center;
  background-size: 100% 100%;
  position: relative;
  height: 100%;
  .Cycle {
    padding: 0.8rem;
    display: flex;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    .progress {
      width: 240px;
      height: 240px;
      overflow: hidden;
    }

    .theme {
      position: absolute;
      width: 240px;
      height: 240px;
      overflow: hidden;
      padding: 0.35rem;
      box-sizing: border-box;
      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
    }
  }
  // 歌词
  .Lyric {
    width: 100%;
    height: 5.6rem;
    padding: 0.346667rem;
    box-sizing: border-box;
    overflow: scroll;
    text-align: center;
    .lyric_p {
      color: #ffffff;
      margin-bottom: 0.133333rem;
      &.active {
        color: red;
        transform: scale(1.5);
      }
    }
  }
  // 用户操作
  .Switch {
    display: flex;
    justify-content: space-around;
    align-items: center;
    box-sizing: border-box;
    height: 2.4rem;
    align-self: flex-end;
    box-sizing: border-box;
  }
}
</style>
