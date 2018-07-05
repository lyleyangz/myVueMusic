<template>
    <mu-container>
        <slot></slot>
        <div class="demo-text" v-if="index == '0'">
            <p>index:0</p>
        </div>
        <div class="demo-text" v-if="index == '1'">
            <p>index:1</p>
        </div>
        <div class="demo-text" v-if="index == '2'">
            <p>index:2</p>
        </div>
</mu-container>
</template>

<script>
export default {
    props:["index"],
  data() {
    return {
    };
  },
  mounted(){
  },
  updated() {
    console.log(this.index,'fa');
  },
  methods: {
    
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
