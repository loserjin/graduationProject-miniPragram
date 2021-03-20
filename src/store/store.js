import Vue from 'vue'
import Vuex from 'vuex'


Vue.use(Vuex)

export default new Vuex.Store({
    state:{
        num:6
    },
    mutations:{
        addNum(state){
            state.num++
        }
    },
    actions:{
        addNumAsyns(context){
            setTimeout(()=>{
                context.commit('addNum')
            },1000)
        },
        getAsyns(context){
            
        }
        
    },
    getters:{

    }

})