import Vue from 'vue'
import Vuex from 'vuex'


import { order } from '../pages/order/data'

Vue.use(Vuex)

export default new Vuex.Store({
    state:{
        //department
        //饭堂全部名单
        departments:[],
        //选择饭堂信息
        department:[],

        //shopping
        //菜单分类列表
        goods:[],
        //每类菜单详情列表
        foods:[],
        //存储菜品的购物车列表
        myCart:[],

        //order
        //存储订单列表
        orderList:[],
        //存储订单详情
        orderDetail:{},



    },
    mutations:{
        //department
        //获取全部饭堂名单
        getDepartments(state,arr){
            state.departments=arr
            console.log(state.departments)
        },
        //获取全部饭堂名单
        getDepartment(state,id){
            var department=state.departments.filter((item=>{
                return item.departmentfloorId==id
            }))
            state.department=department[0]
            console.log(state.department)  
        },



        //shopping
        // 获取整体菜单
        getGoods(state,info){ 
            state.goods=info  
        },
        // 获取菜单数组
        getfoods(state,index){
            var foods=state.goods[index].menucomponents
            console.log(foods)
            state.foods=foods
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

        //order
        //获取订单列表
        getOrderDate(state,info){
            state.orderList=info
        },
        //获取相应的订单详情
        getOrdetail(state,info){
            state.orderDetail=info
        },
        

        
        
        

    },
    actions:{
        //shopping
        //获取全部饭堂整体菜单数据
        getGoodByIdAsyns(context,arr){
            var goods=arr
            context.commit('getGoods',goods)
        },

        //根据departmentId获取对应饭堂菜单
        selGoodByIdAsyns(context,id){
            if(context.state.goods){
                var data=context.state.goods.filter((item)=>{
                    return item.departmentfloorId===id
                })
            }
            context.commit('getGoods',data)
            console.log(data)
        },

        //order
        //获取订单整体数据
        getOrderAsyns(context){
            var orderList=order.orderList
            console.log(orderList)
            context.commit('getOrderDate',orderList)
        },

        getOrDetailAsyns(context,index){
            var orderDetail=context.state.orderList[index]
            context.commit('getOrdetail',orderDetail)
            
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
                preTotal+food.count*food.componentMoney,0
            )
        },
    
    }

})