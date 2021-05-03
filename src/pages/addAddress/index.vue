<template>
    <div class="container">
        <div class="addressForm">
            <div class="userInfo">
                <div class="name">
                    <span>姓名</span>
                    <input type="text" maxlength="10" v-model="address.useraddressName">
                </div>
                <!-- <div class="gender">
                    <span>性别</span>
                    <radio-group class="group">
                        <span v-for="(item,index) in gender" :key=index @click="choiceGender(item)">
                            <radio>{{item.name}}</radio>
                        </span>
                    </radio-group>
                </div>  -->
            </div>
            <div class="phone">
                <span>联系电话</span>
                <input  type="number" v-model="address.useraddressTel">
            </div>
            <div class="address">
                <span>详细地址</span>
                <textarea  cols="30" rows="5" v-model="address.useraddress"></textarea>
            </div>
        </div>
        <div class="btn">
            <button class="clear" @click="clear">重置</button>
            <button class="submit" @click="submit">提交</button>
        </div>
        
    </div>
</template>

<script>
export default {
    data() {
        return {
            address:{
                useraddressId:'',
                useraddressName:'',
                gender:'',
                useraddressTel:'',
                useraddress:'',
            }
           
            // gender:[
            //     {value:'1',name:'男'},
            //     {value:'2',name:'女'}
            // ],
            
        }
    },
    methods: {
        // choiceGender(item){
        //     this.userGender=item.value
        //     console.log(this.userGender)
        // },
        clear(){
            this.address.useraddressId=""
            this.address.useraddressName="",
            this.address.useraddressTel="",
            this.address.useraddress=""
        },
        submit(){
            if (this.address.useraddressName == "" || this.address.useraddressTel == "" || this.address.useraddress == "")
            {
                wx.showToast({
                    title: '请输入完整信息',
                    icon: 'error',
                    duration: 2000
                })
            }else{
                if(this.address.useraddressId==''){
                    this.$fly.post(`/useraddress/edit`,{
                    "useraddressName":this.address.useraddressName,
                    "gender":this.address.gender,
                    "useraddressTel":this.address.useraddressTel,
                    "useraddress":this.address.useraddress
                    }).then(res=>{
                        if(res.status==200){
                            wx.showToast({
                                title: '添加成功',
                                icon: 'success',
                                duration: 1000,
                                success:(res)=>{
                                    this.clear()
                                    setTimeout(function () {
                                      wx.redirectTo({
                                        url: '/pages/address/main'
                                    })
                                    }, 1000)
                                    
                                }
                            })
                        }
                    })
                }else{
                    this.$fly.post(`/useraddress/edit`,{
                        "useraddressId":this.address.useraddressId,
                        "useraddressName":this.address.useraddressName,
                        "gender":this.address.gender,
                        "useraddressTel":this.address.useraddressTel,
                        "useraddress":this.address.useraddress
                        }).then(res=>{
                            if(res.status==200){
                                wx.showToast({
                                    title: '修改成功',
                                    icon: 'success',
                                    duration: 1000,
                                    success:(res)=>{
                                        this.clear()
                                        wx.removeStorage({
                                            key: 'address',
                                            success (res) {
                                                console.log('删除address')
                                            }
                                        })
                                        setTimeout(function () {
                                          wx.navigateBack({
                                            url: '/pages/address/main'
                                        })
                                        }, 1000)
                                    }
                                })
                            }
                        })
                }
                
            }
        }
    },
    beforeMount() {
        var that=this
        // console.log(this.$mp)
        // if(this.$mp.query.id){
        // }
        wx.getStorage({
            key:'address',
            success:(res)=>{
                console.log(res.data)
                that.address=res.data
                console.log(that.address)
            }
        })
    },
    onUnload(){
        wx.removeStorage({
            key: 'address',
            success (res) {
                console.log('删除address')
            }
        })
    },
}
</script>

<style scoped>

 .addressForm{
     margin: 10rpx 20rpx;
     background-color: white;
 }
 .userInfo{
     margin: 10rpx;
     font-size: 35rpx;
 }
 .userInfo .name{
     display: flex;
     align-items: center;
     padding-bottom: 10rpx;
     border-bottom: 2rpx solid #ccc;
 }
 .userInfo .name input{
     margin-left: 20rpx;
     width: 80%;
 }
 .userInfo span{
     height: 80rpx;
     line-height: 80rpx;

 }
 .userInfo .gender{
     display: flex;
     align-items: center;
     padding-bottom: 10rpx;
     border-bottom: 2rpx solid #ccc;
 }
 .userInfo .gender .group{
     margin-left: 20rpx;
 }
 .userInfo .gender .group span{
     margin-left: 10rpx;
 }
 .phone,.address{
     margin-left: 10rpx;
 }
 .phone{
     display: flex;
     align-items: center;
     height: 80rpx;
     line-height: 80rpx;
     padding-bottom: 10rpx;
     border-bottom: 2rpx solid #ccc;
 }
 .phone input{
     margin-left: 20rpx;
 }
 .address span{
     height: 80rpx;
     line-height: 80rpx;
 }
 .btn{
     position: absolute;
     bottom: 0;
     width: 100%;
     display: flex;
     align-items: center;
 }
 .btn button{
     width: 50%;
 }
</style>