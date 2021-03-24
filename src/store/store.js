import Vue from 'vue'
import Vuex from 'vuex'
import {shoppingCart} from '@/pages/shopping/data'

Vue.use(Vuex)

export default new Vuex.Store({
    state:{
        
        //菜单分类列表
        categorys:[],
        
        //每类菜单详情列表
        dish:[],
        //存储菜品的购物车列表
        myCart:[]

    },
    mutations:{
        //获取整体菜单
        getData(state,info){
            state.categorys=info
        },
        // 获取菜单数组
        getDish(state,index){
            var dish=state.categorys[index].foods
            state.dish=dish
        },
        //菜单中的增加减少功能
        incrementMycart(state,food){
            if(!food.count){
                Vue.set(food,'count',1)
                state.myCart.push(food)
            }else{
                food.count++
            }
        },
        recrementMycart(state,food){
            if(food.count){
                food.count--
                if(food.count===0){
                    state.myCart.splice(state.myCart.indexOf(food),1)
                }
            }
        },
        //购物车中商品增加
        cartAdd(state,index){
            state.myCart[index].cartNum++
        },
        //购物车中商品减少
        cartRemove(state,index){
            if(state.myCart[index].cartNum>1){
                state.myCart[index].cartNum--
            }else{
                state.myCart.splice(index,1)
            }
        },
        //清空购物车
        cartClear(state){
            //清楚菜单里的每一个count
            state.myCart.forEach(food=>food.count=0)
            //移除购物车所以项
            state.myCart=[]
        }
    },
    actions:{
        //获取菜单整体数据
        getDataAsyns(context){
            var shops=shoppingCart.menuData.data
            var categorys=shops.shop_menu.category
            context.commit('getData',categorys)
        },
        
        
    },
    getters:{
        //购物车右上角小数字
        totalCount(state){
            return state.myCart.reduce((preTotal,food)=>
                preTotal+food.count,0
            )
        },
        //购物车总价显示
        totalPrice(state){
            return state.myCart.reduce((preTotal,food)=>
                preTotal+food.count*food.food_price,0
            )
        },
    
    }

})