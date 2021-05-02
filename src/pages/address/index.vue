<template>
    <div class="container">
        <scroll-view class="addressList">
            <div class="address-c">
                <div class="basic-c">
                    <span class="name">张三</span>
                    <span class="gender">男</span>
                    <span class="phone">1357565832</span>
                </div>
                <div class="addressDetail">
                    <span class="province">广东省</span>
                    <span class="city">深圳市</span>
                    <span class="county">珠海区</span>
                    <span class="detailInfo">新浪一路2栋2088号</span>
                </div>
                <div class="btn-c">
                    <div>编辑</div>
                    <div>删除</div>
                </div>
            </div>
            <div class="address-c">
               <div>
                    <span class="name">张三</span>
                    <span class="gender">男</span>
                    <span class="phone">1357565832</span>
                </div>
                <div class="addressDetail">
                    <span class="province">广东省</span>
                    <span class="city">深圳市</span>
                    <span class="county">珠海区</span>
                    <span class="detailInfo">新浪一路2栋2088号</span>
                </div>
            </div>
        </scroll-view>
    </div>
</template>
<script>
export default {
    data() {
        return {
            
        }
    },
}
</script>
<style scoped>
    .addressList{
        display: flex;
        flex-direction: column;
    }
    .address-c{
        display: flex;
        flex-direction: column;
        background: white;
        margin-top: 20rpx;
    }
    .basic-c{
        margin-left: 20rpx;
        display: flex;
    }
    .addressDetail{
        display: flex;
    }
    .btn-c{
        display: flex;

    }
    .btn-c div{
        width: 100rpx;
        height: 60rpx;
        font-size: 30rpx;
        line-height: 60rpx;
        border: 2rpx solid #ccc;
        border-radius: 15rpx;
        text-align: center;
    }
</style>