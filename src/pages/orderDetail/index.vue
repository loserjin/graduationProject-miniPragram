<template>
    <div class="container">
        <div class="detail-status">
            <span v-if="orderDetail.userorderFStatus==0">未支付订金</span>
            <span v-else-if="orderDetail.userorderFStatus==1">已支付订金{{orderDetail.userorderFmoney}}元</span>
            <span v-else>订单已取消</span>
        </div>
        <div class="detail-c">
            <div class="detail-top">
                <img src="" alt="">
                <div class="top-r">
                    <span>{{orderDetail.departmentfloorName}}</span>
                    <span>></span>
                </div>
            </div>
            <div class="detail-content" v-for="(item,index) in details" :key="index">
                <div detail-l>
                    <img src="" alt="">
                </div>
                <div class="detail-r">
                    <div class="detail-r-top">
                        <span class="detail-r-name">{{item.menuName}}</span>
                        <span class="detail-r-price">￥{{item.menuMoney}}</span>
                    </div>
                <div class="detail-r-middle" v-show="item.dish_weight">
                    <span>{{item.dish_weight}}克</span>
                </div>
                <div class="detail-r-bottom">x{{item.menuTotal}}</div>
                </div>
            </div>
            <div class="detail-bottom">
                <div class="detail-b-number">
                    <span>订单流水号：</span><span class="orderNum">{{orderDetail.userorderId}}</span>
                    <span>订单创建时间：{{orderDetail.userorderCreatime}}</span>
                    <span v-if="!orderDetail.useraddress">就餐日期：{{orderDetail.dailymenuCreatime}}</span>
                    <span v-if="!orderDetail.useraddress">
                        就餐时段：
                        <span  v-if="orderDetail.dailymenuTime==0">上午</span>
                        <span  v-if="orderDetail.dailymenuTime==1">上午</span>
                        <span  v-if="orderDetail.dailymenuTime==2">上午</span>
                    </span> 
                    <div class="address" v-if="orderDetail.useraddress">
                        <span>配送日期：{{orderDetail.dailymenuCreatime}}</span>
                        <span>
                            配送时段：
                            <span  v-if="orderDetail.dailymenuTime==0">上午</span>
                            <span  v-if="orderDetail.dailymenuTime==1">上午</span>
                            <span  v-if="orderDetail.dailymenuTime==2">上午</span>
                        </span> 
                        <span>用户名：{{orderDetail.useraddressName}}</span>
                        <span>配送地址：{{orderDetail.useraddress}}</span>
                        <span>联系电话：{{orderDetail.useraddressTel}}</span>
                    </div>
                             
                </div>
                <div class="detail-b-total">
                    <span>剩余应付金额{{orderDetail.userorderMmoney}}元，</span>
                    <span>共计<span class="totalPrice">￥{{orderDetail.userorderSmoney}}</span></span>
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
            userorderId:'',
            orderDetail:'',
            details:[],
            creatime:''
        }
    },
    methods: {
        renderTime(date) {
            var dateee = new Date(date).toJSON();
            return new Date(+new Date(dateee) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '') 
        }
    },
    computed:{
        ...mapState(['orderDetail'])
    },
    beforeMount() {
        this.orderDetail=JSON.parse(this.$mp.query.item)
        console.log(this.orderDetail)
        
        
    },
    mounted() {
        //获取对应的订单详情
        // this.$store.dispatch('getOrDetailAsyns',this.orderIndex)
        this.$fly.get(`/wechat/userorderdetail/infos?userorderId=`+this.orderDetail.userorderId)
        .then(res=>{
            console.log(res.data.data.records)
            this.details=res.data.data.records
            this.creatime=this.renderTime(this.orderDetail.userorderCreatime)
        })
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
    .detail-bottom .detail-b-number .orderNum{
        color: #ccc;
    }
    .detail-bottom .detail-b-number .address{
        display: flex;
        flex-direction: column;
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