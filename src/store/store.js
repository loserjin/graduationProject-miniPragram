import Vue from 'vue'
import Vuex from 'vuex'
import {shoppingCart} from '@/pages/shopping/data'

Vue.use(Vuex)

export default new Vuex.Store({
    state:{
        
        //菜单列表
        categorys:[],
        //购物车列表
        myCart:[]

    },
    mutations:{
        addNum(state){
            state.num++
        },
        getData(state,info){
            state.categorys=info
        }
    },
    actions:{
        addNumAsyns(context){
            
        },

        //获取菜单数据
        getDataAsyns(context){
            var menu=shoppingCart.menuData.data
            var categorys=menu.shop_menu.category
            context.commit('getData',categorys)
        }
        
    },
    getters:{

    }

})