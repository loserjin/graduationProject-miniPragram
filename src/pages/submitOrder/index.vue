<template>
    <div class="container">
        <div class="header-c">
            <div class="tab">
                <div :class="{'select':tab==1,'title':true}" @click="changTab(1)">
                    <p>到店就餐</p>
                </div>
                <div :class="{'select':tab==2,'title':true}" @click="changTab(2)">
                    <p>外卖配送</p>
                </div>
            </div>
        </div>
        <div class="tab-c">
            <div v-if="tab==1" class="shopDetail">
                <span class="shopAddress">商家地址</span>
                <span class="address">广东省湛江市赤坎区寸金路29号</span>
                <div class="mealTime">
                    <span>就餐时间：</span>
                    <picker @change="bindMultiPickerChange" @columnchange="bindMultiPickerColumnChange" mode='multiSelector' :value="multiIndex" :range="multiArray">
                        <div class="time">
                            <span>当前选择：{{multiArray[0][multiIndex[0]]}}，{{multiArray[1][multiIndex[1]]}}</span>
                            <i class="iconfont">&#xe60f;</i>
                        </div>    
                    </picker>
                </div>
                <div class="detail-c">
                    <div class="detail-top">
                        <img src="" alt="">
                        <div class="top-r">
                            <span>{{department.departmentfloorName}}</span>
                        </div>
                    </div>
                    <scroll-view class="swiper" :scroll-y="true">
                        <div class="detail-content" v-for="(item,index) in myCart" :key="index">
                            <div detail-l>
                                <img src="" alt="">
                            </div>
                            <div class="detail-r">
                                <div class="detail-r-top">
                                    <span class="detail-r-name">{{item.menuName}}</span>
                                    <span class="detail-r-price">￥{{item.menuMoney}}</span>
                                </div>
                            <div class="detail-r-middle">
                                <span>{{item.menucomponents.componentName}}</span>
                            </div>
                            <div class="detail-r-bottom">x{{item.count}}</div>
                        </div>
                    </div>
                    </scroll-view>
                    
                    <div class="detail-bottom"> 
                        <div class="detail-b-number">
                            <span>支付方式：微信支付</span>
                            <span>预计就餐时间：16:47</span>
                            <span>定金：{{totalFPrice}}</span>
                        </div>
                        <div class="detail-b-total">
                            <span>共{{totalCount}}件商品,</span>
                            <span>共计<span class="totalPrice">￥{{totalPrice}}</span></span>
                        </div>
                    </div>
                </div>
                <div class="pay-btn" @click="payClick">
                    <div class="top">
                        <span class="s-l">微信支付定金</span>
                        <span class="s-r">￥{{totalFPrice}}</span>
                        
                    </div>
                </div>
            </div>
            <div v-else class="outFood">
                <div class="receiveAddress">
                    <i class="iconfont">&#xe602;</i>
                    <span>选择收货地址</span>
                </div>
                <div class="mealTime">
                    <span>预计收货时间：</span>
                    <picker @change="bindMultiPickerChange" @columnchange="bindMultiPickerColumnChange" mode='multiSelector' :value="multiIndex" :range="multiArray">
                        <div class="time">
                            <span>当前选择：{{multiArray[0][multiIndex[0]]}}，{{multiArray[1][multiIndex[1]]}}</span>
                            <i class="iconfont">&#xe60f;</i>
                        </div>    
                    </picker>
                </div>
                <div class="detail-c">
                    <div class="detail-top">
                        <img src="" alt="">
                        <div class="top-r">
                            <span>{{department.departmentfloorName}}</span>
                        </div>
                    </div>
                    <scroll-view class="swiper" :scroll-y="true">
                        <div class="detail-content" v-for="(item,index) in myCart" :key="index">
                            <div detail-l>
                                <img src="" alt="">
                            </div>
                            <div class="detail-r">
                                <div class="detail-r-top">
                                    <span class="detail-r-name">{{item.menuName}}</span>
                                    <span class="detail-r-price">￥{{item.menuMoney}}</span>
                                </div>
                            <div class="detail-r-middle">
                                <span>{{item.menucomponents.componentName}}</span>
                            </div>
                            <div class="detail-r-bottom">x{{item.count}}</div>
                        </div>
                    </div>
                    </scroll-view>
                    
                    <div class="detail-bottom"> 
                        <div class="detail-b-number">
                            <span>支付方式：微信支付</span>
                            <span>预计就餐时间：16:47</span>
                            <span>定金：{{totalFPrice}}</span>
                            <span>配送费：{{orderprice}}元</span>
                        </div>
                        <div class="detail-b-total">
                            <span>共{{totalCount}}件商品,</span>
                            <span>共计<span class="totalPrice">￥{{sumPrice}}</span></span>
                        </div>
                    </div>
                </div>
                <div class="pay-btn" @click="payClick">
                    <div class="top">
                        <span class="s-l">微信支付</span>
                        <span class="s-r">￥{{sumPrice}}</span>
                        
                    </div>
                </div>
            </div>
        </div>
        <!-- <div class="time">
            <span class="tips">请选择就餐时间，进行到店就餐</span>
            <span class="mealTime">选择就餐时间</span>
        </div> -->
        
    </div>
</template>
<script>
import {mapGetters, mapState} from 'vuex'
const day=['今天', '明天', '后天']
const time=["07:00-8:00","08:00-10:00","10:00-12:00","12:00-14:00","16:00-18:00","17:00-19:00","18:00-20:00"]
export default {
    data() {
        return {
            multiArray: [day, time],
            multiIndex: [1, 2],
            orderprice:1,
            data:'',
            tab:1,
            department:{},
            message:1,
            status:'订单已完成',
            shop_name:'鸿园二楼店',
            order_num:'10454452654654654',
            order_time:'2021-03-11 21:19:47',
            orderfinish_time:"2021-03-12 10:30:00",
            details:[]
                }
    },
    methods: {
        changTab(index){
            this.tab=index
        },
        bindMultiPickerChange: function (e) {
            console.log('picker发送选择改变，携带值为multiIndex=', e.mp.detail.value)
            this.multiIndex= e.mp.detail.value
            console.log(this.multiIndex)

        },
        bindMultiPickerColumnChange: function (e) {
            var column = e.mp.detail.column;
            var value = e.mp.detail.value;
            console.log('修改的列为', column, '，值为', value);
        }

    },
    computed:{
        ...mapState(['myCart','department']),
        ...mapGetters(['totalPrice','totalCount','totalFPrice']),
        sumPrice(){
            return this.$store.getters.totalPrice+this.orderprice
        }
    },
    created() {
        // Object.assign(this.$data, this.$options.data())
    },
    beforeMount() {
        var that=this
        wx.getStorage({
            key: 'item',
            success: function(res){
                // success
                console.log(res)
            that.department=res.data   
            }
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
        margin: 0 20rpx;
        margin-top: 20rpx;

    }

    .header-c{
        background: #ccc;
        border-radius: 15rpx 15rpx 0 0;

    }
    .tab{
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .header-c .tab div{
        height: 100rpx;
        flex: 1;
        line-height: 100rpx;
        text-align: center;
    }

    /* 堂食 */
    .tab-c{
        background-color: #fff;
        border-radius: 0 0 15rpx 15rpx;
    }
    .tab-c .shopDetail{
        display: flex;
        flex-direction: column;
        padding-top: 20rpx;
        margin: 0 20rpx;
    }
    .tab-c .shopDetail .shopAddress{
        margin-bottom: 20rpx;
        font-size: 30rpx;
    }
    .tab-c .shopDetail .address{
        font-size: 40rpx;
        padding-bottom: 30rpx;
        border-bottom: 2rpx solid #ccc;
    }
    .tab-c .mealTime{
        display: flex;
        justify-content: space-between;
        padding: 10rpx 0;
        border-bottom: 2rpx solid #ccc;
    }
    .tab-c .mealTime .time{
        display: flex;
        flex-direction: row;
        align-items: center;
        color: rgba(250, 174, 8, 1);
    }
    .tab-c .mealTime .time span{
        font-size: 30rpx;
        margin-right: 10rpx;
    }
    .tab-c .mealTime .time i{
        font-size: 20rpx;
    }
    .select{
        color: green;
        background-color: #fff;
        border-radius: 15rpx 15rpx 0 0;
    }

    /* 外卖 */
    .tab-c .outFood{
        display: flex;
        flex-direction: column;
        padding-top: 20rpx;
        margin: 0 20rpx;
    }
    .tab-c .receiveAddress{
        display: flex;
        align-items: center;
        padding-bottom: 20rpx;
        border-bottom: 2rpx solid #ccc;
        font-size: 30rpx;
    }
    .tab-c .receiveAddress i{
        color: rgba(250, 174, 8, 1);
        margin-right: 20rpx;
    }


    /* 订单详情 */
    .detail-c{
        display: flex;
        flex-direction: column;
        background-color: white;
        margin-top: 10rpx;
    }
    .detail-c .detail-top{
        display: flex;
        align-items: center;
        border-bottom: 2rpx solid #ccc;
        padding-bottom: 10rpx;
    }
    .detail-c .detail-top img{
        width: 80rpx;
        height: 80rpx;
        border-radius: 50rpx;
    }
    .detail-c .top-r{
        margin-left: 10rpx;
        font-size: 28rpx;
        color: black;

    }
    .swiper{
        max-height: 400rpx;
    }
    .detail-c .detail-content{
        display: flex;
        padding: 10rpx 0;
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
        display: flex;
        flex-direction: column;
    }
    .detail-content .detail-r .detail-r-top{
        display: flex;
        width: 540rpx;
        justify-content: space-between;
        margin-bottom: 5rpx;
        color: #000;
        font-size: 30rpx;
    }
    .detail-content .detail-r .detail-r-bottom{
        font-size: 30rpx;
        color: black;
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