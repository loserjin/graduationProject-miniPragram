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
                <div class="list-l-item " :class="{active:index===tagIndex}" v-for="(item,index) in foods" :key="index" @click="categoryClick(item,index)">
                    <span>{{item.name}}</span>
                    <text class="list-l-count" v-if="item.count">0</text>
                </div>
            </scroll-view>
            <!-- 商品内容选择 -->
            <scroll-view class="list-r" :scroll-y="true">
                <div class="section">
                    <span>{{foods[0].name}}</span>
                </div>
                <div class="item-list" v-for="(cates,index) in category" :key="index">
                    <div class="item">
                        <div class="item-l">
                        <img src="" alt="">
                        </div>
                        <div class="item-r">
                            <span class="title">{{cates.cname}}</span>
                            <span class="description">{{cates.describe}}</span>
                            <div class="item-r-bottom">
                                <span class="price">{{cates.price}}</span>
                                <div class="change-num">
                                    <div class="reduce-to" @click="reduceClick">
                                        <i class="icon reduce-to-o" >-</i>
                                    </div>
                                    <span>{{num}}</span>
                                    <div class="add-to" @click="addClick">
                                        <i class="icon add-to-o">+</i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                </div>
            </scroll-view>
        </div>
        
        <!-- 下部分购物车栏 -->
        <div class="footer-c">
            <div class="cart-img">
                <img src="" alt="">
            </div>
            <div class="cart-content">
                <div class="total-price">
                    <span>共计：50</span>
                </div>
                <button class="sub-button" @click="toSubmit">结算</button>
            </div>
            
        </div>
    </div>
</template>

<script>
import {mapState,mapMutations} from 'vuex'
export default {
    data() {
        return {
            
            tagIndex:0,
            foods:[
                {name:'小熟茶'},
                {name:'小熟茶'},
                {name:'小熟茶'},
                {name:'小熟茶'},
                {name:'小熟茶'},
                {name:'小熟茶'},
                {name:'小熟茶'},
                {name:'小熟茶'},
            ],
            category:[
                {cname:'炒鸡蛋',describe:'非常好吃',price:'35元',num:'0'},
                {cname:'炒鸡蛋',describe:'非常好吃',price:'35元',num:'0'},
                {cname:'炒鸡蛋',describe:'非常好吃',price:'35元',num:'0'},
                {cname:'炒鸡蛋',describe:'非常好吃',price:'35元',num:'0'},
                {cname:'炒鸡蛋',describe:'非常好吃',price:'35元',num:'0'},
                {cname:'炒鸡蛋',describe:'非常好吃',price:'35元',num:'0'},
                {cname:'炒鸡蛋',describe:'非常好吃',price:'35元',num:'0'},

            ]
        }
    },
    methods: {
        ...mapMutations(['addNum']),
        categoryClick(item, index) {
            this.tagIndex = index;
            
        },
        reduceClick(){
            this.$store.dispatch('addNumAsyns')
            
        },
        addClick(){
         this.addNum()
        },
        toSubmit(){
            wx.navigateTo({url: '/pages/submitOrder/main'})
        }
    },
    computed:{
       ...mapState(['num'])
    },
    created() {
        this.$request('https://api.gugudata.com/news/wxarticle','get',{
            id:1
        }).then((Response)=>{
            console.log(Response.result)
        })
     
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
.change-num .reduce-to,.add-to{
    width: 35rpx;
    border-radius: 50%;
    border: 1rpx solid ;
    height: 35rpx;
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
    background: forestgreen;
    margin: 0 30rpx;
    position: relative;
    top: -20rpx;
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
</style>
