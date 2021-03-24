<template>
<!-- -c表示容器 -->
<!-- -l和-r表示左边和右边 -->
    <div class="container">
        <!-- 上边局域栏 -->
        <div class="header-c">
            <div class="header">
                <div class="header-l">
                   <img class="shop-logo" src="" alt="">
                </div>
                <div class="header-r">
                    <div class="header-r-title">
                        <span>饭堂名字</span>
                        <div class="title-l"></div>
                        <span>饭堂楼层</span>
                    </div>
                    <span class="header-r-notice">预定时间：16:00-1:00</span>
                </div>
            </div>
            <div class="cate-c">
                <span>菜单</span>
                <div class="line"></div>
            </div>
        </div>
        <!-- 中间商品内容部分 -->
        <div class="list-c">
            <!-- 商品列表分类 -->
            <scroll-view class="list-l" :scroll-y="true">
                <div class="list-l-item " :class="{active:index===tagIndex}" v-for="(item,index) in categorys" :key="index" @click="categoryClick(item,index)">
                    <span>{{item.category_name}}</span>
                    <text class="list-l-count" v-if="item.count">0</text>
                </div>
            </scroll-view>
            <!-- 商品内容选择 -->
            <scroll-view class="list-r" :scroll-y="true">
                <div class="section">
                    <span></span>
                </div>
                <div class="item-list" v-for="(food,index) in dish" :key="index">
                    <div class="item">
                        <div class="item-l">
                        <img src="" alt="">
                        </div>
                        <div class="item-r">
                            <span class="title">{{food.food_name}}</span>
                            <span class="description">{{food.food_weight}}</span>
                            <div class="item-r-bottom">
                                <span class="price">{{food.food_price}}</span>
                                <div class="change-num">
                                    <transition name="move">
                                        <div class="btn-reduce" @tap="removeToCart(food)" v-if="food.count">-</div>
                                    </transition>
                                    <span class="btn-num" v-if="food.count">{{food.count}}</span>
                                    <div class="btn-add" @tap="addToCart(food)">+</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                </div>
            </scroll-view>
        </div>
        
        <!-- 下部分购物车栏 -->
        <div class="footer-c">
            <div class="cart-img" @tap="showCart">
                <img src="/static/tabs/tableware.png" alt="">
                <span class="countSum" v-show="totalCount">{{totalCount}}</span>
            </div>
            <div class="cart-content">
                <div class="total-price">
                    <span>￥{{totalPrice}}</span>
                </div>
                <button class="sub-button" @click="toSubmit">结算</button>
            </div>
            
        </div>

        <!-- 黑背景模糊墙 -->
        <div  class="beiJing-back" @tap="cartClose" v-show="listShow"></div>

        <!-- 购物车 弹窗层 -->
        <div class="cart-c" v-show="listShow">
            <div class="cart-c-top">
                <div class="top-r">购物车</div>
                <div class="top-l" @tap="clearCart">清空</div>
            </div>
            <scroll-view class="cart-c-list" scroll-y="true">
                <div class="cart-list-item" v-for="(item,index) in myCart" :key="index">
                    <span>{{item.food_name}}</span>
                    <div class="item-view">
                            <div class="cartPrice"><span>￥{{item.food_price}}</span></div>
                            <div class="btnUpData">
                                <div class="btn-reduce" @tap="removeCart(item)">-</div>
                                <div class="btn-num">{{item.count}}</div>
                                <div class="btn-add" @tap="addCart(item)">+</div>
                            </div>
                            
                    </div>
                </div>
            </scroll-view>
        </div>
    </div>
</template>

<script>
import {mapState,mapGetters} from 'vuex'
export default {
    data() {
        return {
            tagIndex:0, 
            isCart:false,
            floorIndex:0
        }
    },
    methods: {
        
        //左侧点击按钮，切换分类
        categoryClick(item, index) {
            this.tagIndex = index;
            this.$store.commit('getDish',this.tagIndex)
            
        },
        //点击购物车图标
        showCart(){
            //当总数量大于才切换
            if(this.totalCount>0){
                this.isCart=!this.isCart
            }
        },
        //点击黑色遮罩关闭购物车
        cartClose(){
            this.isCart=false
        },
        // 菜品上的增加很减少
        removeToCart(food){
            this.$store.commit('recrementMycart',food)
        },
        addToCart(food){
            this.$store.commit('incrementMycart',food)
        },

        // 购物车上的增加和减少
        removeCart(food){
            this.$store.commit('recrementMycart',food)
        },
        addCart(food){
            this.$store.commit('incrementMycart',food)
        },
        clearCart(){
            this.$store.commit('cartClear')
        },
        
       
        toSubmit(){
            wx.navigateTo({url: '/pages/submitOrder/main'})
        }
    },
    computed:{
       ...mapState(['categorys','myCart','dish']),
       ...mapGetters(['totalPrice','totalCount']),
       listShow(){
           if(this.totalCount===0){
               //每次清空购物车重置isCart
               this.isCart=false
               return false
           }
           return this.isCart
       }
    },
    beforeMount() {
        // 拿到楼层ID
        console.log(this.$mp.query.index)
        this.floorIndex=this.$mp.query.index
        console.log(this.floorIndex)
    },
    mounted() {
        this.$store.dispatch('getDataAsyns',this.floorIndex) 
        this.$store.commit('getDish',this.tagIndex)
    },
    
}
</script>
<style  scoped>







.container{
    display: flex;
    flex-direction: column;
    position: relative;
    
}
.container .header-c{
    display: flex;
    flex-direction: column;
    position: fixed;
    width: 750rpx;
}
.header-c .header{
    display: flex;
    align-items: center;
    background-color: rgba(199, 140, 31, 0.473);
    height: 150rpx;
}
.header-c .header-l{
    display: flex;
    margin-left: 16rpx;
}
.header-c .header-l .shop-logo{
    height: 120rpx;
    width: 120rpx;
    border-radius: 8rpx;
    background: red;
}
.header-c .header-r{
    display: flex;
    flex-direction: column;
    margin: 0 20rpx;
}
.header-c .header-r .header-r-title{
    display: flex;
    align-items: center;
    font-size: 40rpx;
    color: white;
}
.header-c .header-r .header-r-title .title-l{
    margin: 0 20rpx;
    width: 2rpx;
    height: 30rpx;
}
.header-c .header-r .header-r-notice{
    font-size: 30rpx;
    color: white;
    line-height: 30rpx;
    height: 30rpx;
    overflow: hidden;
    margin: 10rpx 0;
}
.header-c .cate-c{
    display: flex;
    height: 70rpx;
    background-color: #e4e4e4;
    align-items: center;
    box-sizing: border-box;
    border-bottom: 1rpx solid rgb(153, 149, 149);
    position: relative; 
}
.header-c .cate-c span{
    font-size: 35rpx;
    color: #000;
    margin-left: 40rpx;
}
.header-c .cate-c .line{
    position: absolute;
    background-color: rgb(224, 74, 14);
    bottom: 2rpx;
    width: 60rpx;
    height: 4rpx;
    left: 40rpx;
}

/* 中间内容部分 */
.container .list-c{
    display: flex;
    position: fixed;
    top: 220rpx;
    bottom: 150rpx;
    width: 750rpx;
}


/* 左边列表内容 */
.list-c .list-l{
    display: flex;
    flex-direction: column;
    width: 160rpx;
    background: #e4e4e4;
}
.list-c .list-l .list-l-item{
    display: flex;
    width: 160rpx;
    align-items: center;
    justify-content: center;
    padding: 20rpx;
    box-sizing: border-box;
    position: relative;
    border-bottom: 2rpx solid #ccc;
}
.list-c .list-l .list-l-item span{
    font-size: 30rpx;
    color: #000;
    margin-left: 10rpx;
}
.list-c .list-l .list-l-count{
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #e74c3c;
    width: 30rpx;
    height: 30rpx;
    border-radius: 15rpx;
    right: 0;
    top: 6rpx;
    position: absolute;
    font-size: 30rpx;
    color: #fff;
}
.active{
    background-color: white;
}
.active span{
    color: #000;
    font-weight: bold;
}



/* 右边信息内容 */
.list-c .list-r{
    display: flex;
    flex-direction: column;
    background-color: aqua;
    
} 
.list-c .list-r .section{
    display: flex;
    height: 70rpx;
    align-items: center;
    margin-left: 20rpx;
    background: chocolate;
}
.list-c .list-r .section span{
    font-size: 30rpx;
    color: #000;
}

.list-c .list-r .item-list{
    display: flex;
    background-color: blueviolet;
    flex-direction: column;
    margin: 0 20rpx;
    
}
.item-list .item{
    display: flex;
    margin-bottom: 30rpx;
    background: rgb(233, 224, 224);
    
    
}
.item .item-l img{
    width: 160rpx;
    height: 160rpx;
    background-size: cover;
    background: burlywood;
}
.item .item-r{
    display: flex;
    flex-direction: column;
    margin-left: 20rpx;
    justify-content: space-between;
    width: 370rpx;
}
.item .item-r .title{
    font-size: 30rpx;
    color: #000;
    height: 35rpx;
    margin-top: 5rpx;
    line-height: 35rpx;
    overflow: hidden;
    font-weight: bold;
    
    
}
.item .item-r .description{
    font-size: 25rpx;
    line-height: 30rpx;
    height: 30rpx;
    overflow: hidden;
    margin-top: 10rpx;
    
}
.item .item-r .item-r-bottom{
    display: flex;
    align-items: center;
    justify-content: space-between;
   
}
.item .item-r .item-r-bottom .price{
    font-size: 32rpx;
    color: #000;
    font-weight: bold;
    
}
.item .item-r-bottom .change-num{
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 8rpx 12rpx;
}

.change-num i{
    
    font-size: 35rpx;
    font-weight: bold;
}
.change-num  span{
    margin:0 8rpx ;
}
.footer-c{
    position: fixed;
    z-index: 990;
    width: 100%;
    bottom: 0;
    height: 150rpx;
    widows: 750rpx;
    background: #333;
    display: flex;
    
}
.footer-c .cart-img{
    width: 100rpx;
    height: 100rpx;
    background-color: white;
    margin: 0 30rpx;
    border-radius: 50%;
    position: relative;
    border: 2rpx solid #ccc;
    top: -20rpx;
}
.footer-c .cart-img img{
    width: 100rpx;
    height: 100rpx;
    border-radius: 50%;
    padding: 5rpx;
}
.footer-c .countSum{
    position: fixed;
    bottom: 130rpx;
    left: 120rpx;
    z-index: 991;
    width: 40rpx;
    height: 40rpx;
    line-height: rpx;
    border-radius: 50%;
    text-align: center;
    font-size: 28rpx;
    background-color: red;
    color: white;
}
.footer-c .cart-content{
    margin-top: 10rpx;
    margin-bottom: 30rpx;
    display: flex;
    background: green;
    width: 590rpx;
    justify-content: space-between;
    align-items: center;
}
.footer-c .total-price{
    margin-left: 50rpx;
    
    background: rgb(139, 34, 113);
}
.footer-c .sub-button{
    
    margin-right: 20rpx;

    width: 200rpx;
    height: 100rpx;
    background: rgb(42, 149, 199);
}



/* 购物车弹出黑色背景层 */
.beiJing-back{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    width: 750rpx;
    bottom: 150rpx;
    background-color: rgba(0, 0, 0, 0.7);
    z-index: 800;
}

.cart-c{
    position: fixed;
    left: 0;
    right: 0;
    bottom: 150rpx;
    width: 750rpx;
    min-height: 210rpx;
    z-index: 850;
    background-color: white;
}
.cart-c .cart-c-top{
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 80rpx;
    font-size: 28rpx;
    background-color: rgba(240, 240, 240, 1);
    border-bottom: 1rpx solid rgba(170, 170, 170, 170);
}
.cart-c .cart-c-top .top-r{
    margin-left: 30rpx;
}
.cart-c .cart-c-top .top-l{
    margin-right: 30rpx;
}
.cart-c-list{
    width: 750rpx;
    min-height: 80rpx;
    max-height: 240rpx;
    padding-bottom: 50rpx;
    overflow: scroll;
}
.cart-c-list .cart-list-item{
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 15rpx;
    padding-bottom: 15rpx;
    border-bottom: 1rpx solid rgba(170, 170, 170, 0.3);
}
.cart-c-list .cart-list-item span{
    margin-left: 30rpx;
}
.cart-c-list .cart-list-item .item-view{
    width: 250rpx;
    margin-right: 30rpx;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.cart-c-list .cart-list-item .btnUpData{
    width: 150rpx;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.btn-reduce,.btn-add{
    width: 50rpx;
    height: 50rpx;
    background-color: #e64340;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    border-radius: 50%;
}
  
.btn-num{
    width: 50rpxs;
    height: 50rpx;
    font-size: 28rpx;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>
