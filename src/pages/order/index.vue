<template>
    <div class="order-container">
        <div class="orList-c">
            <div class="item" v-for="(item,index) in orderList" :key="index">
                <div class="orHeader" @tap="headerClick">
                    <img src="" alt="">
                    <span class="shop-name">{{item.shop_name}}</span>
                    <i>></i>
                    <span class="order-status" v-if="item.status==1">订单已完成</span>
                    <span class="order-status" v-else-if="item.status==0">订单未完成</span>
                    <span class="order-status" v-else>订单未支付</span>
                </div>
                <div class="orDetail-c" @tap="orderDetail(index)">
                    <div class="detail" v-for="(itx,idx) in item.product_list" :key="idx">
                        <span class="detail-l">{{itx.dish_name}}</span>
                        <span class="detail-r">{{itx.dish_num}}</span>
                    </div>
                </div>
                <div class="orPrice">
                    <span class="totalNum">共{{item.total_count}}件商品，</span>
                    <span class="totalPrice">￥{{item.total_price}}</span>
                </div>
                <div class="orbottom"  v-if="item.status==0">
                    <div class="btn">
                        <span>取消订单</span>
                    </div>
                    <div class="btn btn-s" @tap="showCode">
                        <span>扫码就餐</span>
                    </div>
                </div>
                <div class="orbottom" v-else-if="item.status==2">
                    <div class="btn">
                        <span>取消订单</span>
                    </div>
                    <div class="btn">
                        <span>支付定金</span>
                    </div>
                </div>   
                <div class="orbottom" v-else>
                    <div class="btn"  @tap="headerClick">
                        <span>再来一单</span>
                    </div>
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
    methods: {
        headerClick(){
            // wx.navigateTo({url: '/pages/shopping/main'})
        },
        orderDetail(index){
            wx.navigateTo({
                url: '/pages/orderDetail/main?index='+index
                })
        }
       
    },
    computed:{
        ...mapState(['orderList'])
    },
    mounted() {
        
    
        this.$store.dispatch('getOrderAsyns')
    },
}
</script>
<style scoped>
    .orList-c{
        display: flex;
        flex-direction: column;
    }
    .item{
        display: flex;
        flex-direction: column;
        background: white;
        margin-top: 20rpx;
    }
    .orHeader{
        display: flex;
        height: 120rpx;
        background-color: white;
        align-items: center;
        border-bottom: 2rpx solid #e4e4e4;
        margin-left: 30rpx;
        margin-bottom: 10rpx;
    }
    .orHeader img{
        width: 80rpx;
        height: 80rpx;
        background: rosybrown;
    }
    .orHeader .shop-name{
        margin: 0 10rpx;
        font-size: 32rpx;
        color: #333;
        font-weight: bold;
        margin-left: 10rpx;
    }
    .orHeader i{
        font-size: 28rpx;
        color: #ccc;
        margin-left: 10rpx;
        flex: 1;
    }
    .orHeader .order-status{
        font-size: 28rpx;
        color: #666;
        display: flex;
        margin-right: 10rpx;
    }
    .orHeader .orDetail-c{
        display: flex;
        background: white;
        flex-direction: column;
    }
    .detail{
        
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-left: 120rpx;
        margin-right: 20rpx;
    } 
    .detail .detail-l{
        font-size: 28rpx;
        color: #666;
        padding: 10rpx 0;
    }
    .detail .detail-r{
        font-size: 26rpx;
        color: #666;
    }
    .orPrice{
        display: flex;
        margin: 20rpx;
        justify-content: flex-end;
    }
    .orPrice .totalNum{
        font-size: 26rpx;
        color: #666;
    }
    .orPrice .totalPrice{
        font-size: 26rpx;
        color: #666;
        font-weight: bold;
    }
    .orbottom{
        display: flex;
        margin-left: 30rpx;
        border-top: 2rpx solid #e4e4e4;
        align-items: center;
        background-color: white;
        justify-content: flex-end;
    }
    .orbottom .btn{
        display: flex;
        align-items: center;
        justify-content: center;
        border: 2rpx solid #e4e4e4;
        margin: 20rpx;
        border-radius: 15rpx;
    }
    .btn-s{
        color: red;
    }
    .orbottom .btn span{
        font-size: 28rpx;
        margin: 16rpx 24rpx;
    }
</style>