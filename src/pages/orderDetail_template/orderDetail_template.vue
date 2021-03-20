<template>
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
                <span>订单号码：{{order_num}}</span>
                <span>订单时间：{{order_time}}</span>
                <span>完成订单时间：{{orderfinish_time}}</span>
            </div>
            <div class="detail-b-total">
                <span>共两件商品,</span>
                <span>共计<span class="totalPrice">￥15</span></span>
            </div>
        </div>
    </div>
</template>
<script>
export default {}
</script>
<style scoped>
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
</style>