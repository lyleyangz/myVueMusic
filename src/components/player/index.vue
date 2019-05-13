<template>
<div class="player-outside">
    <div style="height:500px;overflow:hidden" ref="wrapper">
        <ul>
            <li>s</li><li>s</li>
            <li>s</li>
            <li>s</li>
            <li>s</li>
            <li>s</li>
            <li>s</li>
            <li>s</li>
            <li>s</li>
            <li>s</li>
            <li>s</li>
            <li>s</li>
            <li>s</li>
            <li>s</li>
            <li>s</li>
            <li>s</li>
            <li>s</li><li>s</li>
            <li>s</li>
            <li>s</li>
            <li>s</li>
            <li>s</li>
            <li>s</li>
            <li>s</li>
            <li>s</li>
            <li>s</li>
            <li>s</li>
            <li>s</li>
            <li>s</li>
            <li>s</li>
            <li>s</li>
            <li>s</li>
            <li>s</li>
            <li>s</li>
            <li>s</li>
            <li>s</li>
            <li>s</li>
            <li>s</li>
            <li>s</li>
            <li>s</li>
            <li>s</li>
            <li>s</li>
            <li>s</li>
            <li>s</li>
            <li>s</li>
            <li>s</li>
            <li>s</li>
            <li>s</li>
        </ul>
    </div>
    <div class="Saucer">
    </div>
    <div class="slider-bar">
        <mu-slider class="demo-slider" color="secondary" :step = 1 display-value v-model="sliderValue" @change="sliderBarChange"></mu-slider>
    </div>

</div>
</template>

<script>
import BScroll from 'better-scroll'
const address = {
  '0': ['00'],
  '1': ['11'],
  '2': ['22'],
  '3': ['33'],
  '4': ['44'],
  '5': ['55'],
  '6': ['66'],
  '7': ['77'],
  '8': ['88'],
  '9': ['99'],
}
export default {
  data () {
    return {
      addressSlots: [
        {
          width: '100%',
          textAlign: 'center',
          values: Object.keys(address)
        }, {
          width: '100%',
          textAlign: 'left',
          values: ['00']
        }
      ],
      address: ['00', '00'],
      addressProvince: '00',
      addressCity: '00',
    //   横猾值
    sliderValue:0,
    timer:null,
    index: 0,
    scroll:null
    }
  },
  methods: {
    addressChange (value, index) {
        this.sliderValue = value;
        switch (index) {
        case 0:
          this.addressProvince = value
          const arr = address[value]
          this.addressSlots[1].values = arr
          this.addressCity = arr[0]
          break
        case 1:
          this.addressCity = value
          break
      }
      this.address = [this.addressProvince, this.addressCity]
    },
    sliderBarChange(value){
    }
  },
  mounted(){
    //   this.timer = setInterval(()=>{
    //       this.sliderValue++;
    //     this.addressChange(this.sliderValue,this.index)
    //       if(this.sliderValue >= Object.keys(address).length-1){
    //           this.index = 1
    //           this.addressChange(this.sliderValue,this.index)
    //           clearInterval(this.timer)
    //       }
    //     //   this.addressChange()
    //   },1000)
      this.$nextTick(()=> {
          if(!this.scroll){
            this.scroll = new BScroll(this.$refs.wrapper, {
            //开启点击事件 默认为false
            click:true,
            probeType: 1
        })
        // console.log(this.scroll)
        }else if(!this.$refs.wrapper){
            return
        }else{
            this.scroll.refresh()
        }
        this.scroll.on('scroll', (pos) => {
          console.log(pos)
        })
      })
  }
}
</script>

<style lang="scss" scoped>
.wrapper{
  width: 100%;
  position:absolute;
  top: 45px;
  bottom: 50px;
  overflow: hidden;
  z-index: 1;
}
.content{
  height:100%;
}
.player-outside{
    .Saucer{
        .demo-picker-container{
        
        }
    }
    .slider-bar{
        margin: 1.133333rem 1.133333rem 0rem 1.133333rem
    }
}
</style>