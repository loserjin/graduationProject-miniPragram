<template>
    <div>
        <div class="header">
            <img :src="userInfo.avatarUrl?userInfo.avatarUrl:'/static/tabs/gerenzhongxin.png'" alt="">
            <button class="logButton">{{userInfo.nickName?userInfo.nickName:'登录'}}</button>
        </div>
        <div class="cardList">
            <!-- <div class="qrCode">
                <span>二维码就餐</span>
                <span class="more">></span>
            </div> -->
            <div class="qrCode" @click="toAddress">
                <span>我的地址</span>
                <span class="more">></span>
            </div>
            
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            userInfo:{},
        }
    },
    methods: {
        toAddress(){
            wx.navigateTo({
                url:'/pages/address/main'
            })
        },
    },
    mounted() {
        wx.getStorage({
            key:"userInfo",
            success:res=>{
                console.log(res)
                this.userInfo=res.data
            }
        })
    },
}
</script>
<style scoped>
.one{
    background: aqua;
}
    .header{
        padding: 40rpx;
        background: #69BCE7;
    }
    .header img{
        width: 100rpx;
        height: 100rpx;
        vertical-align: middle;
        border-radius: 50rpx;
        border: 2rpx solid #000;
    }
    .header .logButton{
        display: inline-block;
        height: 60rpx;
        line-height: 60rpx;
        background: rgba(255, 255, 255, 0.5);
        vertical-align: middle;
        margin-left: 40rpx;
        max-width: 200rpx;
    } 
    .cardList .qrCode{
        width: 94%;
        height: 60rpx;
        line-height: 60rpx;
        margin: 10rpx auto;
        border: 2rpx solid #ccc;
        padding: 10rpx;
        border-radius: 15rpx;
    }
    .more{
        float: right;
    }

</style>