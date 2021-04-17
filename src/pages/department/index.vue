<template>
    <div class="container">
        <div class="swiper">
            <swiper autoplay="false" circular="false" interval="2000">
                <swiper-item>
                    <img mode="widthFix" src="/static/images/department1.jpg" alt="">
                </swiper-item>
                <swiper-item>
                    <img mode="widthFix" src="/static/images/department2.jpg" alt="">
                </swiper-item>
                <swiper-item>
                    <img mode="widthFix" src="/static/images/department3.jpg" alt="">
                </swiper-item>
                <swiper-item>
                    <img mode="widthFix" src="/static/images/department4.jpg" alt="">
                </swiper-item>
                <swiper-item>
                    <img mode="widthFix" src="/static/images/department5.jpg" alt="">
                </swiper-item>
            </swiper>  
        </div>
        <div class='adsec'>
            <i class="iconfont">&#xe70a;</i>
            <text class='text'>公告：</text>
            <swiper class="swiper_container" autoplay="false" circular="true" interval="3000">
                <block v-for="(item,index) in msgList" :key="index">
                <navigator url="" open-type="navigate">
                    <swiper-item>
                    <div class="swiper_item">{{item.title}}</div>
                    </swiper-item>
                </navigator>
                </block>
            </swiper>
        </div>
        <div class="department-c">
            <div class="header">
                <span class="header-l">请选择饭堂</span>
                <div class="header-r" @tap="searchClick">
                    <i class="iconfont">&#xe607;</i>
                    <span>请输入名字进行搜索</span>
                </div>
            </div>
           <div class="context" v-for="(item,index) in departments" :key="index" @tap="toShopping(item,item.departmentfloorId)">
               <div class="context-l"><img src="" alt=""></div>
               <div class="context-r">
                   <span class="title">{{item.departmentfloorName}}</span>
                   <span class="desc">南北风味尽在掌握</span>
                   <span class="desc">明天伙食预定中</span>
               </div>
           </div>
        </div>
        
        
    </div>
</template>
<script>
export default {
    data() {
        return {
            departments:[],
            msgList: [
                { url: "url", title: "今日饭堂免费送1000元大红包" },
                { url: "url", title: "恭喜锦波获得100元奖励" },
                { url: "url", title: "恭喜俊浩杀入总决赛成为新一轮干饭王" }
            ]
        }
    },
    methods: {
        toShopping(item,id){
            this.$store.commit('getDepartment',id)
            wx.navigateTo({
                // 把当前的楼层id传到shopping页
                url:'/pages/shopping/main?id='+id 
            }),
            console.log(item)
           wx.setStorage({
               key:'item',
               data:item
           })
            wx.setStorage({
                key:"key",
                data:id
            })
        },
        searchClick(){
            wx.navigateTo({url: '/pages/search/main'})
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
        align-items: center;
    }

    /* 图片轮播图 */
    .container .swiper{
        width: 100%;
        border: 2rpx solid red;
    }
    .container .swiper img{
        width: 100%;
    }

   .adsec{
        width: 95%;
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        align-items: center;
        margin: 10rpx auto;
        background:rgba(254,242,242,1);
        border-radius:6px;
        padding: 7rpx 10rpx;
        height: 50rpx;
        }
        .adsec .text{
            margin-left: 10rpx;
        }
        
        .swiper_container {
        height: 55rpx;
        width: 70%;
        line-height: 55rpx;
        padding-left: 10rpx;
        }
        
        .swiper_item {
        font-size: 25rpx;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        letter-spacing: 2px;
        }

    .department-c{
        display: flex;
        flex-direction: column;
        width: 750rpx;
    }
    .department-c .header{
        height: 100rpx;
        line-height: 100rpx;
        color: brown;
        background-color: #f3f3f3;
        border-bottom: 2rpx solid #ccc;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
    }
    .department-c .header .header-l{
        margin-left: 15rpx;
    }
    .department-c .header .header-r{
        display: flex;
        align-items: center;
        flex: 1;
        background-color: #ccc;
        height: 60rpx;
        border-radius: 30rpx;
        margin-left: 30rpx;
    }
    .department-c .header .header-r i{
        font-size: 30rpx;
        margin-left: 20rpx;
        color: #666;
    }
    .department-c .header .header-r span{
        font-size: 30rpx;
        margin-left: 20rpx;
        color: #666;
    }
    .department-c .context{
        display: flex;
        flex-direction: row;
        background: #f3f3f3;
        padding: 15rpx 20rpx; 
        border-bottom: 2rpx solid #ccc;
    }
    .department-c .context .context-l{
        width: 150rpx;
        height: 150rpx;
        background: red;
        border-radius: 15rpx;
    }
    .context .context-l img{
        width: 150rpx;
        height: 150rpx;
    }
    .department-c .context .context-r{
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        margin-left: 15rpx;
    }
    .context-r .title{
        font-size: 30rpx;
        font-weight: bold;
    }
    .context-r .desc{
        font-size: 25rpx;
    }

    
</style>