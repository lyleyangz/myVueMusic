<template>
    <mu-container>
        <slot></slot>
        <div class="demo-text" v-if="index == '0'">
            <p>index: {{index}}</p>
            <button @click="a()">{{count}}</button>
        </div>
        <div class="demo-text" v-if="index == '1'">
            <p>index: {{index}}</p>
        </div>
        <div class="demo-text" v-if="index == '2'">
            <p>index: {{index}}</p>
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
  computed:{
      count(){
          return this.$store.state.count
      }
  },
  mounted(){
  },
  updated() {
    console.log(this.$store.state.count);
  },
  methods: {
    a(){
        this.$store.commit('increment');
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.demo-text {
    padding: 16px;
    background: #fff;
    button{
        width:.666667rem;
        height: .666667rem
    }
  }
</style>
