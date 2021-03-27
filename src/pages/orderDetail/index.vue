<template>
    <div class="container">
        <div class="detail-status">
            <span v-if="orderDetail.status==1">订单已完成</span>
            <span v-else-if="orderDetail.status==0">订单未完成</span>
            <span v-else>订单未支付</span>
        </div>
        <div class="detail-c">
            <div class="detail-top">
                <img src="" alt="">
                <div class="top-r">
                    <span>{{orderDetail.shop_name}}</span>
                    <span>></span>
                </div>
            </div>
            <div class="detail-content" v-for="(item,index) in orderDetail.product_list" :key="index">
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
                    <span>订单号码：{{orderDetail.order_num}}</span>
                    <span>订单时间：{{orderDetail.order_time}}</span>
                    <span>完成订单时间：{{orderDetail.orderfinish_time}}</span>
                </div>
                <div class="detail-b-total">
                    <span>共{{orderDetail.total_count}}件商品,</span>
                    <span>共计<span class="totalPrice">￥{{orderDetail.total_price}}</span></span>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import {mapState} from 'vuex'
export default {
    data() {
        return {
        }
    },
    computed:{
        ...mapState(['orderDetail'])
    },
    beforeMount() {
        // console.log(this.$mp.query.index)
        this.orderIndex=this.$mp.query.index
        // console.log(this.orderIndex)
        
        
    },
    mounted() {
        //获取对应的订单详情
        this.$store.dispatch('getOrDetailAsyns',this.orderIndex)
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
    .detail-status{
        font-size: 32rpx;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 80rpx;
        margin: 0 30rpx;
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
</style>