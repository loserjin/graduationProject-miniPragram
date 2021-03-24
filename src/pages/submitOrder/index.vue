<template>
    <div class="container">
        <div class="time">
            <span class="tips">请选择就餐时间，进行到店就餐</span>
            <span class="mealTime">选择就餐时间</span>
            
        </div>
        <div class="detail-c">
            <div class="detail-top">
                <img src="" alt="">
                <div class="top-r">
                    <span>{{shop_name}}</span>
                    <span>></span>
                </div>
            </div>
            <div class="detail-content" v-for="(item,index) in details" :key="index">
                <div detail-l>
                    <img src="" alt="">
                </div>
                <div class="detail-r">
                    <div class="detail-r-top">
                        <span class="detail-r-name">{{item.dish_name}}</span>
                        <span class="detail-r-price">￥{{item.dish_price}}</span>
                    </div>
                <div class="detail-r-middle">
                    <span>{{item.dish_weight}}克</span>
                </div>
                <div class="detail-r-bottom">x{{item.dish_num}}</div>
                </div>
            </div>
            <div class="detail-bottom">
                <div class="detail-b-number">
                    <span>支付方式：微信支付</span>
                    <span>预估就餐时间：明天午餐</span>
                    <span>定金：6元</span>
                </div>
                <div class="detail-b-total">
                    <span>共两件商品,</span>
                    <span>共计<span class="totalPrice">￥15</span></span>
                </div>
            </div>
        </div>
        <div class="pay-btn" @click="payClick">
            <div class="top">
                <span class="s-l">微信支付</span>
                <span class="s-r">￥15</span>
                
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            message:1,
            status:'订单已完成',
            shop_name:'鸿园二楼店',
            order_num:'10454452654654654',
            order_time:'2021-03-11 21:19:47',
            orderfinish_time:"2021-03-12 10:30:00",
            details:[
                {   
                    dish_name:'白菜炖肥肉',
                    dish_num:1,
                    dish_price:6,
                    dish_weight:500
                },
                {
                    dish_name:'小鸡炖蘑菇',
                    dish_num:2,
                    dish_price:6,
                    dish_weight:500
                },
                {
                    dish_name:'白菜',
                    dish_num:1,
                    dish_price:2,
                    dish_weight:500
                }
                ,
                {
                    dish_name:'例汤',
                    dish_num:1,
                    dish_price:2.5,
                    dish_weight:500
                }
                    ]
                }
    },
}
</script>
<style scoped>
    img{
        width: 100rpx;
        height: 100rpx;
        background-color: teal;
    }
    .container{
        margin-top: 20rpx;
        background-color: white;
        width: 750rpx;
    }
    .time{
        font-size: 32rpx;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: 100rpx;
        margin: 0 30rpx;
    }
    .time .tips{
        font-size: 26rpx;
        color: red;
        font-weight: bold;
        margin-bottom: 10rpx;
    }
    
    .detail-c{
        display: flex;
        flex-direction: column;
        background-color: white;
        margin: 0 30rpx;
    }
    .detail-c .detail-top{
        display: flex;
        align-items: center;
        border-top: 2rpx solid #e4e4e4;
        border-bottom: 2rpx solid #e4e4e4;
        margin-bottom: 10rpx;
    }
    .detail-c .detail-top img{
        width: 80rpx;
        height: 80rpx;
        border-radius: 50rpx;
    }
    .detail-c .top-r{
        margin-left: 10rpx;
        font-size: 28rpx;
        color: #ccc;

    }
    .detail-c .detail-content{
        display: flex;
        margin-bottom: 15rpx;
        align-items: center;
        height: 120rpx;
        border-bottom: 2rpx solid #e4e4e4;
    }
    .detail-content .detail-l img{
        width: 118rpx;
        height: 118rpx;
    }
    .detail-content .detail-r{
        margin-left: 15rpx;
        font-size: 24rpx;
        color: #ccc;
    }
    .detail-content .detail-r .detail-r-top{
        display: flex;
        width: 560rpx;
        justify-content: space-between;
        margin-bottom: 5rpx;
        color: #000;
        font-size: 30rpx;
        
    }
    .detail-bottom .detail-b-number{
        display: flex;
        flex-direction: column;
        margin: 10rpx 0;
    }
    .detail-bottom .detail-b-total{
        display: flex;
        justify-content: flex-end;
        border-top: 2rpx solid #e4e4e4;
        margin: 10rpx;
        font-size: 32rpx;
    }
    .detail-bottom .detail-b-total .totalPrice{
        font-weight: bold;
        color: red;
    }


    .pay-btn{
        display: flex;
        position: fixed;
        left: 0;
        bottom: 0;
        width: 750rpx;
        height: 150rpx;
        background-color: #4EAA31;
        justify-content: center;
    }
    .pay-btn .top{
        display: flex;
        height: 50rpx;
        align-items: center;
        margin-top: 30rpx;
    }
    .pay-btn .top .s-l{
        font-size: 35rpx;
        color: white;
    }
    .pay-btn .top .s-r{
        font-size: 40rpx;
        color: white;
        font-weight: bold;
        margin: 0 20rpx;
    }
</style>