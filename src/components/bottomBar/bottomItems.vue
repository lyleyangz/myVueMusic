<template>
    <mu-container>
        <div class="demo-text" v-if="shift == 'movies'">
            <p>{{shift}}</p>
        </div>
        <div class="demo-text" v-if="shift == 'music'">
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
export default {
    props:["shift"],
  data() {
    return {
    };
  },
  methods: {
    
  },
  mounted(){
  },
  updated() {
    console.log(this.shift,'fa');
  },
  destroyed(){

  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.demo-text {
    padding: 16px;
    background: #fff;
  }
</style>
