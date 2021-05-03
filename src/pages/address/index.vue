<template>
    <div class="container">
        <scroll-view class="addressList">
            <div class="address-c" v-for="(item,index) in areaList" :key="index">
                <div class="basic-c">
                    <span class="name">{{item.useraddressName}}</span>
                    <span class="gender" v-show="gender">{{item.gender==1?'男':'女'}}</span>
                    <span class="phone">{{item.useraddressTel}}</span>
                </div>
                <div class="addressDetail">
                    
                    <span class="detailInfo">{{item.useraddress}}</span>
                </div>
                <div class="btn-c">
                    <span class="edit" @click="editAddress(item)">编辑</span>
                    <span class="clear" @click="clearAddress(item)">删除</span>
                    <span class="choice" @click="choiceAddress(item)">选择</span>
                </div>
            </div>
        </scroll-view>
        <div class="control-btn">
            <button @click="toAdd">添加地址</button>
            <button class="wxaddress" @click="wxAddress">微信添加地址</button>
        </div>
        
    </div>
</template>
<script>
export default {
    data() {
        return {
            areaList:[],
        }
    },
    methods: {
        editAddress(item){
            wx.setStorage({
                key:'address',
                data:item,
                success:(res)=>{
                    console.log(res)
                }
            })
            wx.navigateTo({
                // 把当前的楼层id传到shopping页
                url:'/pages/addAddress/main'
            })
        },
        clearAddress(item){
            console.log(item.useraddressId)
            this.$fly.post(`/useraddress/delect?useraddressId=`+item.useraddressId)
            .then(res=>{
                this.$fly.get(`/useraddress/infos?size=99`)
                .then(res=>{
                    this.areaList=res.data.data.records
                })
                wx.removeStorage({
                    key: 'address',
                    success (res) {
                        console.log('删除address')
                    }
                })
            })
        },
        choiceAddress(item){
            wx.setStorage({
                key:'address',
                data:item,
                success:(res)=>{
                    console.log('已选择地址')
                    wx.navigateBack({})
                }
            })
        },
        toAdd(){
            wx.navigateTo({
                url:'/pages/addAddress/main'
            })
        },
        wxAddress(){
            var that=this
            wx.chooseAddress({
                success:(res)=>{
                    // var address={
                    //     "useraddressName":res.userName,
                    //     "useraddressTel":res.telNumber,
                    //     "useraddress":`${res.provinceName}`+`${res.cityName}`+`${res.countyName}`+`${res.detailInfo}`
                    //     // "name": res.userName,
                    //     // "phone": res.telNumber,
                    //     // "province": res.provinceName,
                    //     // "city": res.cityName,
                    //     // "county": res.countyName,
                    //     // "detailInfo": res.detailInfo,
                    // }
                    that.$fly.post(`/useraddress/edit`,{
                        "useraddressName":res.userName,
                        "gender":"",
                        "useraddressTel":res.telNumber,
                        "useraddress":`${res.provinceName}`+`${res.cityName}`+`${res.countyName}`+`${res.detailInfo}`
                        }).then(res=>{
                            if(res.status==200){
                                wx.showToast({
                                    title:'微信地址添加成功',
                                    icon:'none'
                                })
                                this.$fly.get(`/useraddress/infos?size=99`)
                                .then(res=>{
                                    this.areaList=res.data.data.records
                                })
                            }
                        }) 
                },
                fail:()=>{
                   wx.showToast({
                      title:'微信地址添加失败',
                      icon:'none'
                    }) 
                }
            })
        },
    },
    mounted() {
        this.$fly.get(`/useraddress/infos?size=99`)
        .then(res=>{
            this.areaList=res.data.data.records
        })
    },
}
</script>
<style scoped>
    .container{
        height: 100vh;
    }
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
        margin: 20rpx 0 0 20rpx;
        display: flex;
    }
    .basic-c .gender,.phone{
        margin-left: 30rpx;
    }
    .addressDetail{
        display: flex;
        margin: 20rpx 0 0 20rpx;
    }
    .btn-c{
        display: flex;
        margin: 20rpx 0 10rpx 20rpx;
    }
    .btn-c .edit,.clear,.choice{
        width: 100rpx;
        height: 60rpx;
        font-size: 30rpx;
        line-height: 60rpx;
        border: 2rpx solid #ccc;
        border-radius: 15rpx;
        text-align: center;
    }
    .btn-c .clear,.choice{
        margin-left: 20rpx;
    }

    .control-btn{
        position: fixed;
        bottom: 0;
        display: flex;
        width: 100%;
    }
    .control-btn button{
        width: 50%;
    }
</style>