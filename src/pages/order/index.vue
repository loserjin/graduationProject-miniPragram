<template>
    <div class="order-container">
         <div class="tab">
            <div class="tab-item" :class="{'select':tab==1}" @click="changTab(1)">
                <p :class="{'selectItem':tab==1}">到店就餐</p>
                <div :class="{'line':tab==1}"></div>
            </div>
            <div class="tab-item" :class="{'select':tab==2}" @click="changTab(2)">
                <p :class="{'selectItem':tab==2}">外卖配送</p>
                <div :class="{'line':tab==2}"></div>
            </div>
            <div class="tab-item" :class="{'select':tab==3}" @click="changTab(3)">
                <p :class="{'selectItem':tab==3}">退款</p>
                <div :class="{'line':tab==3}"></div>
            </div>
        </div>
        <!-- 到店分页 -->
        <div class="orList-c" v-if="tab==1">
            <div class="item" v-for="(item,index) in shopOrder" :key="index">
                <div class="orHeader" @tap="headerClick">
                    <img src="" alt="">
                    <span class="shop-name">{{item.departmentfloorName}}</span>
                    <i>></i>
                    <span class="order-status" v-if="item.userorderFStatus==0">未支付订金</span>
                    <span class="order-status" v-else-if="item.userorderFStatus==1">已支付订金</span>
                    <span class="order-status" v-else>支付失败</span>
                </div>       
                <div class="orPrice" @tap="orderDetail(item)">
                    <div class="orTime">
                        <span class="day">就餐时间：{{item.dailymenuCreatime}}，</span>
                        <span  v-if="item.dailymenuTime==0">上午</span>
                        <span  v-if="item.dailymenuTime==1">上午</span>
                        <span  v-if="item.dailymenuTime==2">上午</span>
                    </div>
                    <div class="price">
                        <span class="totalNum">共计{{item.userorderSmoney}}元，</span>
                        <span class="totalPrice">已付￥{{item.userorderFmoney}}</span>
                    </div> 
                </div>
                <!-- 按钮 -->
                <div class="orbottom"  v-if="item.userorderFStatus==0">
                    <div class="btn" @click="clearOrder(item.userorderId)">
                        <span>取消订单</span>
                    </div>
                    <div class="btn" @click="payDeposit(item.userorderId)">
                        <span>支付定金</span>
                    </div>
                    
                </div>
                <div class="orbottom" v-else-if="item.userorderFStatus==1">
                    <div class="btn">
                        <span v-if="item.userorderMStatus==0" @click="clearOrder(item.userorderId)">取消订单</span>
                    </div>
                    <div class="btn btn-s" v-if="item.userorderMStatus==0" @tap="showCode(item.userorderId)">
                        <span>扫码就餐</span>
                    </div>
                    <div class="btn" v-if="item.userorderMStatus==1" @tap="deleteOrder(item.userorderId)">
                        <span>删除订单</span>
                    </div>
                </div>   
            </div>
        </div>
        <!-- 外卖分页 -->
        <div class="orList-c" v-if="tab==2">
             <div class="item" v-for="(item,index) in takeoutOrder" :key="index">
                <div class="orHeader" @tap="headerClick">
                    <img src="" alt="">
                    <span class="shop-name">{{item.departmentfloorName}}</span>
                    <i>></i>
                    <span class="order-status" v-if="item.userorderFStatus==0">未支付订金</span>
                    <span class="order-status" v-else-if="item.userorderFStatus==1">已支付订金</span>
                    <span class="order-status" v-else>支付失败</span>
                </div>       
                <div class="orPrice" @tap="orderDetail(item)">
                    <div class="orTime">
                        <span class="day">就餐时间：{{item.dailymenuCreatime}}，</span>
                        <span  v-if="item.dailymenuTime==0">上午</span>
                        <span  v-if="item.dailymenuTime==1">上午</span>
                        <span  v-if="item.dailymenuTime==2">上午</span>
                    </div>
                    <div class="price">
                        <span class="totalNum">共计{{item.userorderSmoney}}元，</span>
                        <span class="totalPrice">已付￥{{item.userorderFmoney}}</span>
                    </div> 
                </div>
                <!-- 按钮 -->
                <div class="orbottom"  v-if="item.userorderFStatus==0">
                    <div class="btn" @click="clearOrder(item.userorderId)">
                        <span>取消订单</span>
                    </div>
                    <div class="btn" @click="payDeposit(item.userorderId)">
                        <span>支付定金</span>
                    </div>
                    
                </div>
                <div class="orbottom" v-else-if="item.userorderFStatus==1">
                    <div class="btn">
                        <span v-if="item.userorderMStatus==0" @click="clearOrder(item.userorderId)">取消订单</span>
                    </div>
                    <div class="btn btn-s" v-if="item.userorderMStatus==0" @tap="showCode(item.userorderId)">
                        <span>扫码就餐</span>
                    </div>
                    <div class="btn" v-if="item.userorderMStatus==1" @tap="deleteOrder(item.userorderId)">
                        <span>删除订单</span>
                    </div>
                </div>   
            </div>
        </div>
        <!-- 退单分页 -->
        <div class="orList-c" v-if="tab==3">
            <div class="item" v-for="(item,index) in refundList" :key="index">
                <div class="orHeader" @tap="headerClick">
                    <img src="" alt="">
                    <span class="shop-name">{{item.departmentfloorName}}</span>
                    <i>></i>
                    <span class="order-status">订单已取消</span>
                </div>
                <div class="orPrice" @tap="orderDetail(item)">
                    <div class="orTime">
                        <span class="day">就餐时间：{{item.dailymenuCreatime}}，</span>
                        <span  v-if="item.dailymenuTime==0">上午</span>
                        <span  v-if="item.dailymenuTime==1">上午</span>
                        <span  v-if="item.dailymenuTime==2">上午</span>
                    </div>
                    <div class="price">
                        <span class="totalNum">共计{{item.userorderSmoney}}元，</span>
                        <span class="totalPrice">已付￥{{item.userorderFmoney}}</span>
                    </div> 
                </div>
                <div class="orbottom" v-if="item.userorderFStatus==2">
                    <div class="btn"  @tap="deleteOrder(item.userorderId)">
                        <span>删除订单</span>
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
            orderList:[],
            shopOrder:[],
            takeoutOrder:[],
            refundList:[],
            tab:1,
            orderCancel:{}
        }
    },
    methods: {
        changTab(value){
            this.tab=value
        },
        headerClick(){
            // wx.navigateTo({url: '/pages/shopping/main'})
        },
        orderDetail(item){
            console.log(item.userorderId)
            wx.navigateTo({
                url: `/pages/orderDetail/main?item=`+JSON.stringify(item)
            })
        },
        //过滤到店订单
        filterShopConsumption(arr){
            var newArr1=arr.filter((item)=>{
                return item.useraddressId==null&&item.userorderFStatus!=2
            })
            return newArr1.reverse()
        },
        //过滤外卖订单
        filterTakeOut(arr){
            var newArr2=arr.filter((item)=>{
                return item.useraddressId!=null&&item.userorderFStatus!=2
            })
            return newArr2.reverse()
        },
        //过滤被取消订单
        filterRefund(arr){
            var newArr3=arr.filter((item)=>{
                return item.userorderFStatus==2
            })
            return newArr3
        },
        //取消订单
        clearOrder(orderId){
            wx.showModal({
                title:'此操作不可逆',
                content:'是否取消订单？',
                success:(res)=>{
                    if(res.cancel){
                        console.log('取消订单成功')
                    }else if(res.confirm){
                        this.$fly.post(`/wechat/userorder/changeFstatus?userorderFStatus=2&&userorderId=`+orderId)
                        .then(orderRes=>{
                            console.log(orderRes)
                            if(orderRes.data.code==200){
                                wx.showToast({
                                    title: '订单取消成功',
                                    icon: 'success',
                                    duration: 2000
                                })
                                this.$fly.get(`/wechat/userorder/infos`)
                                .then(res=>{
                                    this.orderList=res.data.data
                                    this.shopOrder=this.filterShopConsumption(this.orderList)
                                    this.takeoutOrder=this.filterTakeOut(this.orderList)
                                    this.refundList=this.filterRefund(this.orderList)
                                })
                            }else if(orderRes.data.code==406){
                                wx.showToast({
                                    title: '订单超时',
                                    icon: 'error',
                                    duration: 2000
                                })
                            }
                        })
                    } 
                }        
            })
        },
        //删除订单
        deleteOrder(id){
            console.log(id)
            this.$fly.post(`/wechat/userorder/delect?userorderId=`+id)
            .then(res=>{
                console.log(res)
                if(res.data.code=200){
                    wx.showToast({
                        title: '订单删除成功',
                        icon: 'success',
                        duration: 2000
                    })
                    this.$fly.get(`/wechat/userorder/infos`)
                    .then(res=>{
                        this.orderList=res.data.data
                        this.shopOrder=this.filterShopConsumption(this.orderList)
                        this.takeoutOrder=this.filterTakeOut(this.orderList)
                        this.refundList=this.filterRefund(this.orderList)
                    })
                }else{
                    console.log(`订单删除失败`)
                }
            })
        },
        //尾款支付
        showCode(id){
            this.$fly.post(`/wechat/userorder/changestatus?userorderStatus=1&userorderId=`+id)
            .then(res=>{
                console.log(res)
                if(res.data.code=200){
                    wx.showToast({
                        title: '尾款支付成功',
                        icon: 'success',
                        duration: 2000
                    })
                    this.$fly.get(`/wechat/userorder/infos`)
                    .then(res=>{
                        this.orderList=res.data.data
                        this.shopOrder=this.filterShopConsumption(this.orderList)
                        this.takeoutOrder=this.filterTakeOut(this.orderList)
                        this.refundList=this.filterRefund(this.orderList)
                    })
                }else{
                    console.log(`尾款支付失败`)
                }
            })
        },
        //订金支付
        payDeposit(orderId){
            wx.showModal({
                title:'请支付订金',
                content:'如果超时将会支付失败',
                success:(res)=>{
                    if(res.cancel){
                        console.log('未支付订金')
                        wx.showToast({
                            title: '订金支付失败',
                            icon: 'error',
                            duration: 2000
                        })
                    }else if(res.confirm){
                        this.$fly.post(`/wechat/userorder/changeFstatus?userorderFStatus=1&&userorderId=`+orderId)
                        .then(orderRes=>{
                            console.log(orderRes.data)
                            if(orderRes.data.code=200){
                                wx.showToast({
                                    title: '订金支付成功',
                                    icon: 'success',
                                    duration: 2000
                                })
                                this.$fly.get(`/wechat/userorder/infos`)
                                .then(res=>{
                                    this.orderList=res.data.data
                                    this.shopOrder=this.filterShopConsumption(this.orderList)
                                    this.takeoutOrder=this.filterTakeOut(this.orderList)
                                    this.refundList=this.filterRefund(this.orderList)
                                })
                            }else if(orderRes.data.code=406){
                                wx.showToast({
                                    title: orderRes.data.msg,
                                    icon: 'error',
                                    duration: 2000
                                })
                            }        
                        })
                        console.log('已支付订金')
                    } 
                }        
            })
        }             
    },

    mounted() {
        // this.$fly.get(`/wechat/userorder/infos?size=99`)
        // .then(res=>{
        //     console.log(res.data.data)
        //     this.orderList=res.data.data
        //     this.shopOrder=this.filterShopConsumption(this.orderList)
        //     this.takeoutOrder=this.filterTakeOut(this.orderList)
        //     // console.log(this.shopOrder)
        //     // console.log(this.takeoutOrder)
        // })
        // this.$store.dispatch('getOrderAsyns')
    },
    onShow(){
        this.$fly.get(`/wechat/userorder/infos`)
        .then(res=>{
            // console.log(res.data.data)
            this.orderList=res.data.data
            this.shopOrder=this.filterShopConsumption(this.orderList)
            this.takeoutOrder=this.filterTakeOut(this.orderList)
            this.refundList=this.filterRefund(this.orderList)
            // console.log(this.refundList)
            // console.log(this.shopOrder)
            // console.log(this.takeoutOrder) 
            
        })
    }
}
</script>
<style scoped>
    .order-container{
        width: 100%;
    }
    .tab{
        display: flex;
        align-items: center;
        background-color: white;
        /* border-bottom: 2rpx solid #999; */
    }
    .tab-item{
        flex: 1;
        
        text-align: center;
        position: relative;
    }
    .tab-item p{
        color: #999;
        padding: 20rpx;
    }
    .tab .selectItem{
        color: black;
    }
    .tab .line{
        position: absolute;
        /* background-color: rgb(224, 74, 14); */
        background-color: #69BCE7;
        bottom: 2rpx;
        width: 100%;
        height: 4rpx;
    }


    .orList-c{
        display: flex;
        flex-direction: column;
    }
    .item{
        display: flex;
        flex-direction: column;
        background: #FDFDFD;
        margin-top: 20rpx;
    }
    .orHeader{
        display: flex;
        height: 120rpx;
        background-color: #FDFDFD;
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
        padding: 20rpx;
        flex-direction: column;
    }
    .orPrice .orTime{
        display: flex;
        /* justify-content: flex-end; */
        padding-bottom: 10rpx;
        font-size: 30rpx;
    }
    
    .orPrice .price{
        display: flex;
        justify-content: flex-end;
        height: 40rpx;
        line-height: 40rpx;
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
        /* border-top: 2rpx solid #e4e4e4; */
        align-items: center;
        background-color: #FDFDFD;
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