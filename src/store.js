// https://vuex.vuejs.org/zh-cn/intro.html
// make sure to call Vue.use(Vuex) if using a module system
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
      theme:{
           'theme-one':'f1939c',
           'theme-two':'74787a',//嫩灰
           'theme-three':'b598a1',
      },
      lists:[
           {
            address:'山东潍坊实训基地',
            listid:'803108842500', 
            date:['2020','11','20'], 
            stratime:'20:20',
            statu:1, 
            type:'编程',
            text:'小程序功能策划', 
            username:'韶华倾负',
            endtime:'' 
           },
           {
            address:'山东潍坊实训基地',
            listid:'803108842523', 
            date:['2020','11','25'], 
            stratime:'15:00',
            statu:1, 
            type:'编程',
            text:'完成小白记事本小程序全部功能', 
            username:'韶华倾负',
            endtime:'' 
           }
      ] 
  },
  getters:{
        onsendlists(state){
             return state.lists;
        } 
  },
  mutations: {
    increment: (state,val) => {
      
        state.lists.push(val);
        console.log(state);
    },
    decrement: (state) => {
      const obj = state
      obj.count -= 1
    }
  }
})

export default store
