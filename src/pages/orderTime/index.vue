<template>
    <div class="container">
        <scroll-view class="scroll">
            <div class="departmentCard" v-for="(item,index) in department" :key="index" @click="tofloor(item.departmentId)">
                <img class="img" :src="item.departmentPic"/>
                <div class="departName">{{item.departmentName}}</div>
            </div>
        </scroll-view>

    </div>
</template>
<script>
export default {
    data() {
        return {
            department:[],
            param:{
                id:'',
                floorId:'',
                date:'',
                time:0
            }
        }
    },
    methods: {
        // choiceTime(time){
        //     this.param.time=time
        //     console.log(this.param)
        //     wx.navigateTo({
        //         url:`/pages/shopping/main?param=`+JSON.stringify(this.param)
        //     })
        // },
        tofloor(id){
            wx.navigateTo({
                url:`/pages/department/main?id=`+id
            })
        },
        filterdepartment(arr){
            var newArr2=arr.filter((item)=>{
                return item.departmentId!=1
            })
            return newArr2
        }
    },
    beforeMount() {
        // console.log(this.$mp)
        // this.param=JSON.parse(this.$mp.query.param)
        // console.log(this.param)
    },
    mounted() {
        this.$fly.get(`/wechat/department/infos`)
        .then(res=>{
            console.log(res.data.data)
            this.department=this.filterdepartment(res.data.data)
            console.log(this.department)
        })
    },
}
</script>
<style scoped>
    .container{
        width: 100%;
    }
    .scroll{
        margin-top: 10rpx 0;
    }
    .departmentCard{
        margin: 30rpx;
        border: 4rpx;
        box-shadow: 5px 5px 5px rgb(109, 109, 109);
        border-radius: 20rpx;
        position: relative;
    }
    .img{
        width: 100%;
        height: 400rpx;
        background-image: url("https://gimg2.baidu.com/image_search/src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fimages%2F20170830%2F0192eb242e5640448e1522c79c14f3bf.jpeg&refer=http%3A%2F%2F5b0988e595225.cdn.sohucs.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1623250447&t=fe5248ca133578a36d084874b487e87b");
        background-repeat:no-repeat; 
        background-size:100% 100%;
        -moz-background-size:100% 100%;
        border-radius: 20rpx;
        /* opacity: 90%; */
    }
    .departName{
        position: absolute;
        top: 1rpx;
        right: 20rpx;
        font-weight: 1000;
        font-size: 50rpx;
        display: flex;
        flex-direction: row-reverse;
        margin-right: 30rpx;
        margin-top: 30rpx;
        color: coral;
    }
</style>

