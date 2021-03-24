<template>
    <div class="container">
        <span>请选择饭堂</span>
        <div class="debtn" v-for="(item,index) in department" :key="index"  @tap="toShopping(index)">{{item.departmentfloorName}}</div>
        
    </div>
</template>
<script>
export default {
    data() {
        return {
            tapIndex:0,
            department:[],
        }
    },
    methods: {
        toShopping(index){
            
            wx.navigateTo({
                // 把当前的楼层id传到shopping页
                url:'/pages/shopping/main?index='+index 
            })
        }
    },
    created() {
        this.$req.get('rap2api.taobao.org/app/mock/278438/departmentfloor/infos')
        .then(res=>{
            this.department=res.data.data.records
        })
    },

}
</script>

<style scoped>
    .container{
        width: 750rpx;
        height: 100vh;
        background-color: #e4e4e4;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    .container span{
        height: 100rpx;
        line-height: 100rpx;
        color: brown;
    }
    .debtn{
        height: 100rpx;
        width: 750rpx;
        background-color: green;
        border: 2rpx solid #ccc;
        line-height: 80rpx;
        text-align: center;
        border-radius: 15rpx;
    }
    
</style>