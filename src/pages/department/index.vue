<template>
    <div class="container">
        <span>请选择饭堂</span>
        <div class="debtn" v-for="(item,index) in departments" :key="index"  @tap="toShopping(item.departmentfloorId)">{{item.departmentfloorName}}</div>
        
    </div>
</template>
<script>
export default {
    data() {
        return {
            departments:[],
        }
    },
    methods: {
        toShopping(id){
            this.$store.commit('getDepartment',id)
            wx.navigateTo({
                // 把当前的楼层id传到shopping页
                url:'/pages/shopping/main?id='+id 

            })
        }
    },
    created() {
        this.$fly.get('http://159.75.3.52:8089/departmentfloor/infos')
        .then(res=>{
            this.departments=res.data.data.records
            this.$store.commit('getDepartments',this.departments)
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