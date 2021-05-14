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
                <p :class="{'selectItem':tab==3}">我的评论</p>
                <div :class="{'line':tab==3}"></div>
            </div>
            <div class="tab-item" :class="{'select':tab==4}" @click="changTab(4)">
                <p :class="{'selectItem':tab==4}">退款</p>
                <div :class="{'line':tab==4}"></div>
            </div>
        </div>
        <!-- 到店分页 -->
        <div class="orList-c" v-if="tab==1">
            <div class="item" v-for="(item,index) in shopOrder" :key="index">
                <div class="orHeader" @tap="headerClick">
                    <!-- <img src="" alt=""> -->
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
                    <div class="btn" v-if="item.userorderMStatus==1" @tap="toAddComment(item)">
                        <span>评论</span>
                    </div>
                </div>   
            </div>
        </div>
        <!-- 外卖分页 -->
        <div class="orList-c" v-if="tab==2">
             <div class="item" v-for="(item,index) in takeoutOrder" :key="index">
                <div class="orHeader" @tap="headerClick">
                    <!-- <img :src="item.departmentfloorPic" alt=""> -->
                    <span class="shop-name">{{item.departmentfloorName}}</span>
                    <i>></i>
                    <span class="order-status" v-if="item.userorderFStatus==0">未支付</span>
                    <span class="order-status" v-else-if="item.userorderFStatus==1">已支付</span>
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
                        <!-- <span class="totalNum">共计{{item.userorderSmoney}}元，</span> -->
                        <span class="totalPrice">已付￥{{item.userorderSmoney}}</span>
                    </div> 
                </div>
                <!-- 按钮 -->
                <div class="orbottom"  v-if="item.userorderFStatus==0">
                    <div class="btn" @click="clearOrder(item.userorderId)">
                        <span>取消订单</span>
                    </div>
                    <div class="btn" @click="payMent(item.userorderId)">
                        <span>支付订单</span>
                    </div>
                    
                </div>
                <div class="orbottom" v-else-if="item.userorderFStatus==1">
                    <div class="btn">
                        <span  @click="clearOrder(item.userorderId)">取消订单</span>
                    </div>
                    <!-- <div class="btn"  @tap="deleteOrder(item.userorderId)">
                        <span>删除订单</span>
                    </div>  -->
                    <!-- <div class="btn btn-s" v-if="item.userorderMStatus==0" @tap="showCode(item.userorderId)">
                        <span>扫码就餐</span>
                    </div>-->
                    
                </div>   
            </div>
        </div>
        <!-- 评论区域 -->
        <div class="orList-c" v-if="tab==3">
             <div class="comment-c">
                <scroll-view class="comment-scroll">
                    <div class="comment" v-for="(item,index) in commentList" :key="index" >
                        <!-- <div class="comment-l">
                            <img src="" alt="">
                        </div> -->
                        <div class="comment-r">
                            <div class="comment-r-haeder">
                                <div class="commentName">{{item.discussName}}</div>
                                <div class="commentTime">{{item.discussCreatime}}</div>
                            </div>
                            <div class="comment-r-middle">
                                <div class="star" v-if="item.discussStart==0">
                                    <i class="iconfont dark">&#xe60d;</i>
                                    <i class="iconfont dark">&#xe60d;</i>
                                    <i class="iconfont dark">&#xe60d;</i>
                                    <i class="iconfont dark">&#xe60d;</i>
                                    <i class="iconfont dark">&#xe60d;</i>
                                </div>
                                <div class="star" v-if="item.discussStart==1">
                                    <i class="iconfont bright">&#xe60d;</i>
                                    <i class="iconfont dark">&#xe60d;</i>
                                    <i class="iconfont dark">&#xe60d;</i>
                                    <i class="iconfont dark">&#xe60d;</i>
                                    <i class="iconfont dark">&#xe60d;</i>
                                </div>
                                <div class="star" v-else-if="item.discussStart==2">
                                    <i class="iconfont bright">&#xe60d;</i>
                                    <i class="iconfont bright">&#xe60d;</i>
                                    <i class="iconfont dark">&#xe60d;</i>
                                    <i class="iconfont dark">&#xe60d;</i>
                                    <i class="iconfont dark">&#xe60d;</i>
                                </div>
                                <div class="star" v-else-if="item.discussStart==3">
                                    <i class="iconfont bright">&#xe60d;</i>
                                    <i class="iconfont bright">&#xe60d;</i>
                                    <i class="iconfont bright">&#xe60d;</i>
                                    <i class="iconfont dark">&#xe60d;</i>
                                    <i class="iconfont dark">&#xe60d;</i>
                                </div>
                                <div class="star" v-else-if="item.discussStart==4">
                                    <i class="iconfont bright">&#xe60d;</i>
                                    <i class="iconfont bright">&#xe60d;</i>
                                    <i class="iconfont bright">&#xe60d;</i>
                                    <i class="iconfont bright">&#xe60d;</i>
                                    <i class="iconfont dark">&#xe60d;</i>
                                </div>
                                <div class="star" v-else-if="item.discussStart==5">
                                    <i class="iconfont bright">&#xe60d;</i>
                                    <i class="iconfont bright">&#xe60d;</i>
                                    <i class="iconfont bright">&#xe60d;</i>
                                    <i class="iconfont bright">&#xe60d;</i>
                                    <i class="iconfont bright">&#xe60d;</i>
                                </div>
                                <div class="text">{{item.discussText}}</div>
                                <div class="img" v-if="item.img">图片</div>
                            </div>
                            <div class="comment-r-bottom">
                                <div class="delect" @click="delect(item.discussId)">
                                    <span>删除评论</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </scroll-view>
            </div>
        </div>
        <!-- 退单分页 -->
        <div class="orList-c" v-if="tab==4">
            <div class="item" v-for="(item,index) in refundList" :key="index">
                <div class="orHeader" @tap="headerClick">
                    <!-- <img src="" alt=""> -->
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
            orderCancel:{},
            commentList:[]
        }
    },
    methods: {
        changTab(value){
            this.tab=value
        },
        headerClick(){
            // wx.navigateTo({url: '/pages/shopping/main'})
        },
        //删除评论
        delect(id){
            console.log(id);
            this.$fly.post(`/wechat/discuss/delect?discussId=`+id)
            .then(res=>{
                console.log(res.data)
                if(res.data.code==200){
                    wx.showToast({
                        title: '评论删除成功',
                        icon: 'success',
                        duration: 2000
                    })
                    this.mycomment()
                }  
            })
            // .catch(err=>{
            //         wx.showToast({
            //             title: '评论删除失败',
            //             icon: 'error',
            //             duration: 2000
            //         })
            // })
        },
        //跳转评论页
        toAddComment(item){
            console.log(item)
            var param={
                id:item.departmentId,
                floorId:item.departmentfloorId,
                name:item.departmentName,
                floorName:item.departmentfloorName
            }
            wx.navigateTo({
                url:`/pages/addComment/main?param=`+JSON.stringify(param)
            })
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
            return newArr1
        },
        //过滤外卖订单
        filterTakeOut(arr){
            var newArr2=arr.filter((item)=>{
                return item.useraddressId!=null&&item.userorderFStatus!=2
            })
            return newArr2
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
                    if(res.data.data="本订单已经超出允许操作的时间"){
                        wx.showToast({
                        title: '尾款支付超时',
                        icon: 'error',
                        duration: 2000
                    })
                    }else{
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
                    }
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
                            console.log(orderRes)
                            // if(orderRes.data.data="本订单已经超出允许操作的时间"){
                            //     console.log("1")
                            // }else{
                            //     console.log("2")
                            // }
                            if(orderRes.data.code=200){
                                if(orderRes.data.data="本订单已经超出允许操作的时间"){
                                     wx.showToast({
                                        title: '订单支付超时',
                                        icon: 'error',
                                        duration: 2000
                                    })
                                }else{
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
                                }    
                            }else{
                               wx.showToast({
                                    title: '订金支付失败',
                                    icon: 'error',
                                    duration: 2000
                                })
                            }        
                        })
                        console.log('已支付订金')
                    } 
                }        
            })
        },
        //外卖全款支付
        payMent(orderId){
            this.$fly.post(`/wechat/userorder/changestatus?userorderStatus=1&userorderId=`+orderId)
                .then(orderRes=>{
                    console.log(orderRes)
                    wx.showToast({
                    title: '订单支付成功',
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
                })
        },

        //请求我的评论数据
        mycomment(){
            this.$fly.get(`/wechat/discuss/myinfos`)
            .then(res=>{
                console.log(res.data.data)
                this.commentList=res.data.data
            })
        }

    },

    mounted() {
        this.mycomment()
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
            this.mycomment()
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

    .comment-scroll{
        width: 100%;
        display: flex;
        flex-direction: column;
    }
    .comment{
        margin: 20rpx;
        border-bottom: 2rpx solid #ccc;
    }
    .comment-r{
        width: 100%;
        display: flex;
        flex-direction: column;
    }
    .comment-r .comment-r-haeder{
        display: flex;
        width: 100%;
        justify-content: space-between;
        margin-bottom: 10rpx;
    }
    .comment-r-haeder .commentName{
        font-size: 34rpx;
    }
    .comment-r-haeder .commentTime{
        font-size: 26rpx;
        color: #999999;
    }
    .comment-r-middle{
        width: 100%;

    }
    .comment-r-middle .star{
        display: flex;
        height: 50rpx;
        line-height: 50rpx;
    }
    .comment-r-middle .star i{
        font-size: 30rpx;
        margin-left: 5rpx;
    }
    .comment-r-middle .star .bright{
        color: #F2A50C;
    }
    .comment-r-middle .star .dark{
        color: #ccc;
    }
    .comment-r-middle .text{
        font-size: 28rpx;

    }
    .comment-r-middle .img{
        width: 150rpx;
        height: 150rpx;
        background: chocolate;
    }
    .comment-r-bottom{
        display: flex;
        margin-left: 30rpx;
        /* border-top: 2rpx solid #e4e4e4; */
        align-items: center;
        justify-content: flex-end;
    }
    .comment-r-bottom .delect{
        display: flex;
        align-items: center;
        justify-content: center;
        border: 2rpx solid #e4e4e4;
        padding: 10rpx;
        border-radius: 15rpx;
        margin-bottom: 20rpx;
    }

</style>