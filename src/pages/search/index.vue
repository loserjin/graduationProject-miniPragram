<template>
    <div class="container">
        <div class="content">
            <div class="search-c">
                <div class="search-bar">
                    <i class="iconfont">&#xe607;</i>
                    <input type="text"  confirm-type="搜索" v-model.trim="product"  @confirm="search" placeholder="请输入你想要查找的菜品"/>
                    <div class="cancle" @click="cancle">
                        <i class="iconfont">&#xe605;</i>
                    </div>
                </div>
                <span class="search-btn" @click="search">搜索</span>
            </div>
        </div>
        <div class="searchList">
            <span class="title">搜索内容</span>
            <scroll-view class="list-c" v-if="status">
                <div class="listItem" v-for="(item,index) in productList" :key="index" @click="toShopping(item,item.departmentfloorId)">
                    <div class="listItem-l">
                        <img src="" alt="">
                    </div>
                    <div class="listItem-r">
                        <div class="listItem-r-top">
                            <span class="menuName">{{item.menuName}}</span>
                            <span>{{item.departmentfloorName}}</span>
                        </div>  
                        <div class="listItem-r-mid">
                            <span>售价：{{item.menuMoney}}元</span>
                            <span class="time">预定时间：{{day}}下午</span>
                        </div>
                    </div>
                </div>
            </scroll-view>
            <div v-if="!status">
                <span>{{message}}</span>
            </div>
        </div>
    </div>
</template>
<script>
import { mapState,mapMutations} from 'vuex'
export default {
    data() {
        return {
            product:null,
            productList:[],
            status:true,
            message:'抱歉，暂时无法找到你所需结果',
            department:null,
            day:'',

            param:{
                id:'',
                floorId:'',
                date:'',
                time:''
            }
        }
    },
    computed:{
        ...mapState(['department'])
    },
    methods: {
        toShopping(item,id){
            console.log(item)
            this.param.id=item.departmentId
            this.param.floorId=item.departmentfloorId
            this.param.time=item.dailymenuTime
            wx.navigateTo({
                url:'/pages/shopping/main?param='+JSON.stringify(this.param)
            })
        //     this.$store.commit('getDepartment',id)
        //     this.department=this.$store.state.department
        //     var that=this
        //     wx.setStorage({
        //        key:'item',
        //        data:that.department
        //    })
        //     wx.navigateTo({
        //         // 把当前的楼层id传到shopping页
        //         url:'/pages/shopping/main?id='+id 
        //     })
        },
        cancle(){
            this.product=null
        },
        search(){
            this.$fly.get(`/wechat/dailymenu/infos`,{
                "date":this.param.date,
                "menuName":this.product
            })
            .then(res=>{
                this.productList=res.data.data
                console.log(res)
                if(this.productList.length==0){
                    this.status=false
                }else{
                    this.status=true
                }
            },(err)=>{
                if(err.status=404){
                    this.status=false
                    this.message='服务器出错,请重试或联系工作人员'
                }     
            })
        }
    },
    beforeMount() {
        // console.log(this.$mp.query.param)
        this.param.date=JSON.parse(this.$mp.query.param).date
        this.day=this.param.date.slice(5,10)

        // console.log(this.day)
        // console.log(this.date)
    },
    onUnload(){
        this.cancle()
        this.productList=[]
        this.status=true
    },
}
</script>
<style scoped>
page {
    background: white;
}
.content{
    display: flex;
    flex-direction: column;
}
.content .search-c{
    display: flex;
    align-items: center;
    margin-top: 20rpx;
}
.search-c .search-bar{
        align-items: center;
        justify-content: center;
        display: flex;
        flex: 1;
        background: #e9e9e9;
        height: 60rpx;
        border-radius: 8rpx;
        padding-left: 20rpx;
        margin-left: 30rpx;
} 
.search-c .search-bar i{
        margin-right: 20rpx;
        color: #999999;
        font-size: 32rpx;
}
.search-c .search-bar input{
        display: flex;
        flex: 1;
        width: 100%;
        font-size: 28rpx;
        height: 32rpx;
        margin-top: 5rpx;
}
.search-bar .cancle{
        display: flex;
        align-items: center;
        justify-content: center;
        width: 50rpx;
        height: 60rpx;
        margin-left: 20rpx; 
}
.search-bar .cancle i{
        color: #999999;
        font-size: 30rpx;
}
.search-c .search-btn {
        width: 100rpx;
        height: 60rpx;
        font-size: 30rpx;
        line-height: 60rpx;
        text-align: center;
}





.searchList{
    display: flex;
    flex-direction: column;
    margin: 0 30rpx;
    
}
.searchList .title{
    margin: 10rpx 0;
    border-bottom: 2rpx solid #ccc;
}
.list-c{
    display: flex;
    flex-direction: column;
    margin-top:10rpx;
}
.listItem{
    display: flex;
    border-bottom: 2rpx solid #ccc;
    width: 690rpx;
}
.list-c .listItem-l img{
    width: 130rpx;
    height: 130rpx;
    background-color: blue;
    border-radius: 15rpx;
}
.list-c .listItem-r{
    width: 550rpx;
    margin: 0 10rpx;
    display: flex;
    flex-direction: column;
}
.list-c .listItem-r span{
    font-size: 30rpx;

}
.list-c .listItem-r-top .menuName{
    font-size: 35rpx;
}
.list-c .listItem-r-top{
    display: flex;
    justify-content: space-between;
}
.list-c .listItem-r-mid{
    margin-top: 30rpx;
    display: flex;
    justify-content: space-between;
}
.list-c .listItem-r-mid .time{

}
</style>