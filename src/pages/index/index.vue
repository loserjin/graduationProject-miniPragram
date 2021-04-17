<template>
  <div class="indexContent">
    <img class="image" :src="userInfo.avatarUrl" alt="" v-if="userInfo">
    <button @tap="getUserProfile">获取登录信息</button>
    <p class="userName" v-if="!userInfo">请登录！！</p>
    <p class="userName" v-else>你好{{userInfo.nickName}}</p>
    <button class="goStudy" @tap="toDepartment">
      <p>开始订餐</p>
    </button>
  </div>
  
</template>

<script>


export default {
  data () {
    return{
      userInfo:null,
      hasUserInfo: false,
      // hasUserInfo: false,
      // userInfo: null
    }
//     <div class="container">
//   <!-- 登录组件 https://developers.weixin.qq.com/miniprogram/dev/api/wx.getUserInfo.html -->  
//     <button v-if="!hasUserInfo" open-type="getUserInfo" @getuserinfo="onGetUserInfo">授权登录</button>
//     <!-- 登录后使用open-data -->
//     <div class="avatar-container avatar-position">
//         <image :src="userInfo.avatarUrl" v-if="hasUserInfo" class="avatar" />
//         <open-data v-if="hasUserInfo" type="userNickName"></open-data>
//     </div>
//   </div>
  },
  
  methods: {
    // handleGetUserInfo(){
    //   wx.getUserInfo({
    //     success:(data)=>{
    //       console.log(data);
    //       this.userInfo=data.userInfo
    //     },
    //     fail:()=>{
    //       console.log("获取失败")
    //     }
    //   })
    // },
    // getUserInfo(e){
    //   console.log(e)
    //   if(data.mp.detail.rawData){
    //     this.handleGetUserInfo()
    //   }
    // },
    getUserProfile(e){
      console.log(e)
      wx.getUserProfile({
        desc:'用于获取用户资料',
        success:(res)=>{
          console.log(res)
          this.userInfo=res.userInfo
          wx.setStorage({
            key:"token",
            data:res.userInfo
          })
        },
        fail:(res)=>{
          wx.showToast({
            title:'您拒绝了授权',
            icon:'none'
          })
        }
      })
    },
  
    toDepartment(){
      wx.navigateTo({
        url:'/pages/department/main'
      })
    }


    // userAuthorized() {
    //   wx.getSetting({
    //     success: data => {
    //       if (data.authSetting['scope.userInfo']) {
    //         wx.getUserInfo({
    //           success: data => {
    //               this.hasUserInfo= true,
    //               this.userInfo= data.userInfo
    //           }
    //         })
    //       } else {
    //         this.hasUserInfo=false
    //       }
    //     }
    //   })
    // },
    // onGetUserInfo(e) {
    //   console.log(e)
    //   const userInfo = e.mp.detail.userInfo
    //   if (userInfo) {
    //     // 1. 小程序通过wx.login()获取code
    //     wx.login({
    //       success: function(login_res) {
    //         //获取用户信息
    //         wx.getUserInfo({
    //           success: function(info_res) {
    //             // 2. 小程序通过wx.request()发送code到开发者服务器
    //             wx.request({
    //               url: 'http://localhost:8080/wx/login',
    //               method: 'POST',
    //               header: {
    //               'content-type': 'application/json'
    //               },
    //               data: {
    //                 code: login_res.code, //临时登录凭证
    //                 rawData: info_res.rawData, //用户非敏感信息
    //                 signature: info_res.signature, //签名
    //                 encrypteData: info_res.encryptedData, //用户敏感信息
    //                 iv: info_res.iv //解密算法的向量
    //               },
    //               success: function(res) {
    //                 if (res.data.status == 200) {
    //                   // 7.小程序存储skey（自定义登录状态）到本地
    //                   wx.setStorageSync('userInfo', userInfo);
    //                   wx.setStorageSync('skey', res.data.data);
    //                 } else{
    //                   console.log('服务器异常');
    //                 }
    //               },
    //               fail: function(error) {
    //                 //调用服务端登录接口失败
    //                 console.log(error);
    //               }
    //             })
    //           }
    //         })
    //       }
    //     })
    //     this.hasUserInfo=true,
    //     this.userInfo=userInfo
    //   }
    // }
  },
  beforeMount() {
    console.log("--beforeMount")
    // this.handleGetUserInfo()
    wx.getStorage({
      key:"token",
      success:res=>{
        console.log(res)
        this.userInfo=res.data
      }
    })
    wx.login({
    success (res) {
      if (res.code) {
        //发起网络请求
        console.log(res.code)
      } else {
        console.log('登录失败！' + res.errMsg)
      }
    }
  })
  }
  // mounted() {
  //   this.userAuthorized()
  // },
}

</script>
<style scoped>
  page{
    background: chocolate;
  }
  .indexContent{
    display: flex;
    flex-direction: column;
    align-items: center;
    
  }
  .image{
    width: 200rpx;
    height: 200rpx;
    border-radius: 100rpx;
    margin: 100rpx 0;
  }
  .userName{
    font-size: 40rpx;
    font-weight: bold;
    margin: 10rpx 0;
  }
  .goStudy{
    width: 230rpx;
    height: 80rpx;
    border: 1rpx solid #eee;
    font-size: 24rpx;
    line-height: 80rpx;
    text-align: center;
    border-radius: 10rpx;
  }
</style>