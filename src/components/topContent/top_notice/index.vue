<template>
<div>
    top  notice  
    <div v-for="(item,index) in items" :key="index">
        <span>{{item.name}}：{{item.time}}</span>
    </div>
</div>
</template>

<script>

export default {
  components: {
  },
  data() {
    return {
      items:[
        {id:1,time:5,name:"一"},
        {id:2,time:22,name:"er"},
        {id:3,time:10,name:"sab"},
        {id:4,time:20,name:"si"},
        {id:5,time:3,name:"wr一"}
      ],
      interval:{}
    };
  },
  methods: {
    countdown(){
        var _this = this;
        for (var key in this.items) {
          let timer= this.items[key];
          (function(i){
            _this.interval[i] = setInterval(function(){
              if(timer.time<=0){
                clearInterval(_this.interval[i])
              }else{
                timer.time--;
              }
            },1000);
          })(key)
        }
    },
      
  },
  mounted() {
    this.countdown()
  },
  updated() {
  },
  destroyed() {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

</style>
