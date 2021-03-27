import Vue from 'vue'
import Vuex from 'vuex'
import {shoppingCart} from '@/pages/shopping/data'
import { order } from '../pages/order/data'

Vue.use(Vuex)

export default new Vuex.Store({
    state:{
        shops:[],
        //菜单分类列表
        categorys:[],
        //每类菜单详情列表
        dish:[],
        //存储菜品的购物车列表
        myCart:[],

        //存储订单列表
        orderList:[],
        //存储订单详情
        orderDetail:{}

    },
    mutations:{
        getShops(state,info){
            state.shops=info
        },
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
        },


        //获取订单列表
        getOrderDate(state,info){
            state.orderList=info
        },
        //获取相应的订单详情
        getOrdetail(state,info){
            state.orderDetail=info
        }


    },
    actions:{
        //获取菜单整体数据
        
        getDataAsyns(context,index){
            var shops=shoppingCart.menuData.data[index]
            console.log(shops)
            var categorys=shops.shop_menu.category
            context.commit('getShops',shops)
            context.commit('getData',categorys)
        },



        //获取订单整体数据
        getOrderAsyns(context){
            var orderList=order.orderList
            console.log(orderList)
            context.commit('getOrderDate',orderList)
        },

        getOrDetailAsyns(context,index){
            var orderDetail=context.state.orderList[index]
            context.commit('getOrdetail',orderDetail)
            
        }
        
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