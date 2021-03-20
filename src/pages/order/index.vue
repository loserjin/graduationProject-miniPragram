<template>
    <div class="order-container">
        <div class="orList-c">
            <div class="item" v-for="(item,index) in orderList" :key="index">
                <div class="orHeader" @click="headerClick">
                    <img src="" alt="">
                    <span class="shop-name">{{item.shop_name}}</span>
                    <i>></i>
                    <span class="order-status">{{item.status}}</span>
                </div>
                <div class="orDetail-c" @click="orderDetail">
                    <div class="detail" v-for="(itx,idx) in item.product_list" :key="idx">
                        <span class="detail-l">{{itx.dish_name}}</span>
                        <span class="detail-r">{{itx.dish_num}}</span>
                    </div>
                </div>
                <div class="orPrice">
                    <span class="totalNum">共两件商品，</span>
                    <span class="totalPrice">￥15</span>
                </div>
                <div class="orbottom" @click="headerClick">
                    <div class="btn">
                        <span>再来一单</span>
                    </div>
                </div>               
            </div>

        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            orderList:[
                {
                    shop_name:'鸿园二楼店',
                    status:'订单已完成',
                    product_list:[
                        {
                            dish_name:'白菜炖肥肉',
                            dish_num:1,
                            dish_price:6
                        },
                        {
                            dish_name:'小鸡炖蘑菇',
                            dish_num:2,
                            dish_price:6
                        }
                    ]
                },
                {
                    shop_name:'鸿园一楼店',
                    status:'订单未完成',
                    product_list:[
                        {
                            dish_name:'小鸡炖蘑菇',
                            dish_num:2,
                            dish_price:6
                        }
                    ]
                },
                {
                    shop_name:'泽园二楼店',
                    status:'订单已完成',
                    product_list:[
                        {
                            dish_name:'手撕鸡',
                            dish_num:5,
                            dish_price:6
                        }
                    ]
                }
            ]
        }
    },
    methods: {
        headerClick(){
            wx.navigateTo({url: '/pages/shopping/main'})
        },
        orderDetail(){
            wx.navigateTo({url: '/pages/orderDetail/main'})
        }
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
        border-radius: 4rpx;
    }
    .orbottom .btn span{
        font-size: 28rpx;
        margin: 16rpx 24rpx;
    }
</style>