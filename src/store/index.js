import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
export default new Vuex.Store({
    state: {
      count: 0,
      drawerStatus:false,
      /************用户使用的标签页面***************/
      current:{
        currentTag:"BOTTOM",
        BotttomNavBar:{
          BotttomNavBarStates:1
        },
        TopNavBar:{
          TopNavBarStates:-1
        },
      }
      /************用户使用的标签页面***************/
    },
    mutations: {
      add (state) {
        state.count++
      },
      reduce (state) {
        if(state.count > 0){
          state.count--
        }
      },
      // 抽屉状态
      RecordDrawerStatus(state){
        state.drawerStatus = !state.drawerStatus;
      },
      // 记录底部导航栏状态
      RecordNavStatus(state,target){
        state.current.currentTag=target.type;
        switch(target.type){
          case "TOP":
          state.current.TopNavBar.TopNavBarStates=target.val;
          state.current.BotttomNavBar.BotttomNavBarStates=-1;
          break;
          case "BOTTOM":
          state.current.BotttomNavBar.BotttomNavBarStates=target.val;
          state.current.TopNavBar.TopNavBarStates=-1;
          break;
        }
      }
    }
  })