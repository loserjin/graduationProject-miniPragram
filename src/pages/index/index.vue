<template>
  <div class="indexContent">
    <div class="image-c">
      <img class="image" :src="userInfo.avatarUrl" alt="" v-if="userInfo">
    </div>
    <button @click="getUserProfile">{{userInfo?'更新头像':'获取登录信息'}}</button>
    <p class="userName" v-if="!userInfo">请登录！！</p>
    <p class="userName" v-else>你好{{userInfo.nickName}}</p>
    <button class="goStudy" @click="toDepartment" v-show="userInfo">
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
    }
  },
  
  methods: {
    getUserProfile(){
      var that=this
      wx.getUserProfile({
        desc:'用于获取用户资料',
        success:(res)=>{
          console.log(res.userInfo) 
           wx.login({
             success(code){
               console.log(code.code)
               if(code.code){
                 that.$fly.post(`/wxLogin?code=${code.code}`,
                {
                  "province":res.userInfo.province,
                  "county":res.userInfo.country,
                  "avatarUrl":res.userInfo.avatarUrl,
                  "gender":res.userInfo.gender,
                  "nickName":res.userInfo.nickName
                }
                ).then(flyRes=>{
                  console.log(flyRes)
                   wx.setStorage({
                      key:"token",
                      data:flyRes.headers.authorization
                    })
                    wx.setStorage({
                      key:'userInfo',
                      data:res.userInfo
                    })
                  that.userInfo=res.userInfo
                }).catch(err=>{
                  console.log(err)
                  if(err.status=404){
                    wx.showToast({
                      title:'服务器错误，请稍后重试',
                      icon:'none'
                    })
                  }
                })
               }
             }
           })
        },
        fail:(err)=>{
          wx.showToast({
            title:'拒绝',
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
  },
  beforeMount() {
    console.log("--beforeMount")
    wx.getStorage({
      key:"token",
      success:(res)=>{
        console.log('已读取本地token')
        wx.getStorage({
          key:'userInfo',
          success:(userInfo)=>{
            console.log('有token，自动获取userinfo')
            this.userInfo=userInfo.data
          },
          fail:(err1)=>{
            console.log('未获取到userinfo')
          }
        })
      },
      fail:(err)=>{
        console.log('查找不到本地token')
        wx.showModal({
          title:'请登录',
          content:'如果不登录将无法订餐',
          success:(res)=>{
            if(res.cancel){
              console.log('直接退出小程序')
            }else if(res.confirm){
              console.log('请求登录')
              this.getUserProfile()
            }   
          },        
        })
      }
    })
    // wx.showModal({
    //   title:'请登录',
    //   content:'如果不登录将无法订餐',
    //   success:()=>{
    //     this.getUserProfile()
    //   },
    //   fail:()=>{
    //     wx.showToast({
    //         title:'您拒绝了授权',
    //         icon:'none'
    //       })
    //   }
    // })
    // wx.getStorage({
    //   key:"token",
    //   success:res=>{
    //     console.log('已读取本地token')
    //     console.log(res.data)
    //   },
    //   fail:res=>{
    //     console.log('查找不到本地token')
    //   }
    // })
  }
}


</script>
<style scoped>
  .indexContent{
    display: flex;
    flex-direction: column;
    align-items: center;
    
  }
  .image-c{
    width: 200rpx;
    height: 200rpx;
    margin: 120rpx 0;
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