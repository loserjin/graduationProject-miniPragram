<template>
  <div class="indexContent">
    <img class="image" :src="userInfo.avatarUrl" alt="">
    <button open-type="getUserInfo"  @getuserinfo="getUserInfo">获取登录信息</button>
    <p class="userName">你好{{userInfo.nickName}}</p>
    <button class="goStudy" @tap="toDetail">
      <p>开始订餐</p>
    </button>
  </div>
</template>

<script>


export default {
  data () {
    return{
      userInfo:{}
    }
    
  },
  
  methods: {
    handleGetUserInfo(){
      wx.getUserInfo({
        success:(data)=>{
          console.log(data);
          this.userInfo=data.userInfo
        },
        fail:()=>{
          console.log("获取失败")
        }
      })
    },
    getUserInfo(data){
      console.log(data)
      if(data.mp.detail.rawData){
        this.handleGetUserInfo()
      }
    },
    toDetail(){
      wx.navigateTo({
        url:'/pages/shopping/main'
      })
    }
  },

  beforeMount() {
    console.log("--beforeMount")
    this.handleGetUserInfo()
  },
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