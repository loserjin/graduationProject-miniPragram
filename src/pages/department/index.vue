<template>
    <div class="container">
        <div class="top">
            <div class="header-r" @tap="searchClick">
                <i class="iconfont">&#xe607;</i>
                <span>请输入菜肴名字进行搜索</span>
            </div>
        </div>
        
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
            <swiper class="swiper_container" autoplay="false" circular="true" interval="1000">
                <block v-for="(item,index) in msgList" :key="index">
                <div  @click="showAdsec(item)">
                    <swiper-item>
                    <div class="swiper_item">{{item.noticeTitle}}{{item.noticeText}}</div>
                    </swiper-item>
                </div>
                </block>
            </swiper>
        </div>
        <div class="department-c">
            <div class="header">
                <div class="time-c">
                    <div class="time" @click="showTime" v-if="param.time==0">时段：上午</div>
                    <div class="time" @click="showTime" v-else-if="param.time==1">时段：中午</div>
                    <div class="time" @click="showTime" v-else>时段：下午</div>
                    <!-- select -->
                    <div class="choices" v-show=isShowTime>
                        <div class="item" @click="choiceInterval(0)">上午</div>
                        <div class="item" @click="choiceInterval(1)">中午</div>
                        <div class="item" @click="choiceInterval(2)">下午</div>
                    </div>
                </div>
                <div class="date-c">
                    <picker mode="date" value="date" :start=startTime  :end=endTime  @change="bindDateChange">
                        <view class="picker">
                            <span>当前日期: </span>
                            <span>{{param.date}}</span>
                        </view>
                    </picker>
                </div>
            </div>
        <div class="context" v-for="(item,index) in departments" :key="index" @tap="toShopping(item,item.departmentfloorId)">
            <div class="context-l"><img :src="item.departmentfloorPic" alt=""></div>
            <div class="context-r">
                <span class="title">{{item.departmentfloorName}}</span>
                <span class="desc">南北风味尽在掌握</span>
                <span class="desc">明天伙食预定中</span>
            </div>
        </div>
        </div>

        <div class="popNotice" v-if="isShow">
            <div class="content">
                <div class="close" @click="closePop">x</div>
                <div class="title">{{notice.noticeTitle}}</div>
                <div class="text">{{notice.noticeText}}</div>
            </div>
        </div>
        <div class="beiJing-back" v-if="isShow"></div>
        
    </div>
</template>
<script>
export default {
    data() {
        return {
            isShow:false,
            startTime:'',
            endTime:"",
            departments:[],
            msgList: [
                // { url: "url", title: "今日饭堂免费送1000元大红包" },
                // { url: "url", title: "恭喜锦波获得100元奖励" },
                // { url: "url", title: "恭喜俊浩杀入总决赛成为新一轮干饭王" }
            ],
            notice:{},
            param:{
                id:'',
                floorId:'',
                date:'',
                time:0
            },
            isShowTime:false,
        }
    },
    methods: {
        toShopping(item,id){
            this.$store.commit('getDepartment',id)
            console.log(this.param)
            this.param.floorId=item.departmentfloorId
            wx.navigateTo({
                // 把当前的楼层id传到shopping页
                url:`/pages/shopping/main?param=`+JSON.stringify(this.param)
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
            if(this.param.date){
                wx.navigateTo({
                    url: `/pages/search/main?param=`+JSON.stringify(this.param)
                })
            }else{
                wx.showToast({
                    title: '请选择日期',
                    icon: 'error',
                    duration: 1000
                })
            }
            
        },
        showAdsec(item){
            this.notice=item
            this.isShow=true
        },
        closePop(){
            this.isShow=false
        },
        chocieDays(){
            var util=new Date()
            var year=util.getFullYear()
            var month=util.getMonth()+1
            var sday=util.getDate()+2
            var sdata=year+`-`+month+`-`+sday
            var edata=year+`-`+12+`-`+31
            this.startTime=sdata
            this.param.date=year+`-`+`0`+month+`-`+``+sday
            this.endTime=edata
            console.log(this.startTime)
            console.log(this.endTime)
            
            // if(month==1 || month==3 || month==5 || month==7 || month==10 || month==12){
            //     if(sday=29){
            //         month++
            //         sday=1
            //     }
            //     eday=31
            //     this.endTime=year+`-`+month+`-`+eday
            // }else if(month=2){
            //     if(year % 4 == 0 && year % 100 != 0 || year % 400 == 0){
            //         console.log('闰年')
            //         eday=28
            //         this.endTime=year+`-`+month+`-`+eday
            //         console.log(this.endTime)
            //     }else{
            //         console.log("平年")
            //         eday=29
            //         this.endTime=year+`-`+month+`-`+eday
            //         console.log(this.endTime)
            //     }
            // }else{
            //     monthday=30
            // }
            
        },
        bindDateChange: function(e) {
            console.log(e.mp.detail.value)
            console.log('picker发送选择改变，携带值为', e.mp.detail.value)
            this.param.date=e.mp.detail.value
            // wx.setStorage({
            //     key:'date',
            //     value:this.day,
            //     success:res=>{
            //         console.log(res)
            //     }
            // })
        },

        showTime(){
            this.isShowTime=!this.isShowTime
            
        },
        choiceInterval(value){
            console.log(this.param.time)
            this.param.time=value
            console.log(this.param.time)
            this.showTime()
        }
    },
    beforeMount() {
        this.param.id=parseInt(this.$mp.query.id)
        // console.log(this.param.id)
        this.chocieDays()
    },
    mounted() {
       this.$fly.get(`/wechat/departmentfloor/infos?departmentId=`+this.param.id)
        .then(res=>{
            this.departments=res.data.data
            this.$store.commit('getDepartments',this.departments)
        })
        this.$fly.get(`/wechat/notice/infos?departmentId=`+this.param.id)
        .then(res=>{
            console.log(res.data.data)
            this.msgList=res.data.data
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
        background-color: #FDFDFD;
        border-bottom: 2rpx solid #ccc;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
    }
    .department-c .header .header-l{
        margin-left: 15rpx;
    }
    .top{
        background: #FDFDFD;
        height: 60rpx;
        width: 100%;
        padding: 15rpx 0;
    }
    .top .header-r{
        display: flex;
        align-items: center;
        flex: 1;
        background-color: #F1F1F1;
        height: 60rpx;
        border-radius: 30rpx;
        margin: 0 30rpx;
    }
    .top .header-r i{
        font-size: 30rpx;
        margin-left: 20rpx;
        color: #999;
    }
    .top .header-r span{
        font-size: 30rpx;
        margin-left: 20rpx;
        color: #666;
    }
    .department-c .context{
        display: flex;
        flex-direction: row;
        background: #FDFDFD;
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
        border-radius: 15rpx;
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

    .row {
        position: fixed;
        z-index: 999;
        background-color:#fff;
        margin-bottom: 20rpx;
        }
    .date-c {
        margin-right: 10rpx;
        width: 400rpx;
    }

    .time-c{
        display: flex;
        flex-direction: column;
        position: relative;
        margin-left: 20rpx;
    }
    .time{
        height: 100rpx;
        line-height: 100rpx;
        position: relative;
        
    }
    .choices{
        position: absolute;
        width: 160rpx;
        top: 100rpx;
        z-index: 10;
        background: white;
    }
    .choices .item{
        border-bottom: 2rpx solid #999;
        height: 60rpx;
        line-height: 60rpx;
        text-align: center;
    }

    .popNotice{
        position: absolute;
        z-index: 20;
        width: 80%;
        /* height: 500rpx; */
        left: 50%;
        top: 50%;
        margin-left: -40%;
        margin-top: -250rpx;
        background-color: white;
        border-radius: 30rpx;
        display: flex;
        min-height: 400rpx; 
    }
    .popNotice .content{
        position: relative;
        display: flex;
        flex-direction: column;
        width: 100%;
    }
    .popNotice .content .close{
        position: absolute;
        width: 50rpx;
        height: 50rpx;
        /* background-color: #999; */
        border-radius: 50%;
        text-align: center;
        right: 10rpx;
        top: 10rpx;
    }
    .popNotice .content .title{
        width: 100%;
        padding: 20rpx 65rpx 10rpx 30rpx;
        align-items: center;
        font-size: 35rpx;
        font-weight: bold;
        display: flex;
        justify-content: center;
    }
    .popNotice .content .text{
        padding: 20rpx 30rpx;
        line-height: 45rpx;
        font-size: 30rpx;
        display: flex;
    }



    .beiJing-back{
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        width: 750rpx;
        bottom: 0;
        background-color: rgba(0, 0, 0, 0.7);
        z-index: 15;
    }
</style>