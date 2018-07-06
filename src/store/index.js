import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
export default new Vuex.Store({
    state: {
      count: 0
    },
    mutations: {
      add (state) {
        state.count++
      },
      reduce (state) {
        if(state.count > 0){
          state.count--
        }
      }
    }
  })