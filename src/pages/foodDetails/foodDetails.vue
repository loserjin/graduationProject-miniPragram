<template>
  <div class="previewModal" v-if="isShow">
    <div class="modal-c">
      <div class="header-p">
        <img class="item-img" src="" alt="">
        <span class="title">{{food.menuName}}</span>
        <div>
          <span class="desc" v-for="(item,i) in food.menucomponents" :key="i">{{item.componentName}}</span>
        </div>
      </div>
      
      <div class="footer-p">
        <span class="price">￥{{food.menuMoney}}</span>
        <div class="upBtn">
            <div class="btn-reduce" @tap="removeCart(food)" v-if="food.count">-</div>
            <span class="btn-num" v-if="food.count">{{food.count}}</span>
            <div class="btn-add" @tap="addCart(food)">+</div>
        </div>
      </div>
    </div>
    <div class="food-cover" @click="toggleShow">
    </div>
  </div>
</template>


<script>
  export default {
    props: {
      food: Object
    },

    data () {
      return {
        isShow: false
      }
    },

    methods: {
      toggleShow () {
        this.isShow = !this.isShow
        console.log(this.food)
      },
      removeCart(food){
            this.$store.commit('recrementMycart',food)
        },
        addCart(food){
            this.$store.commit('incrementMycart',food)
        },
    },
  }
</script>

<style scoped>
    .previewModal{
      display: flex;
      flex-direction: column;
      position: fixed;
      z-index: 990;
      top: 50%;
      margin-top: -50%;
      margin-left: 40rpx;
      margin-right: 40rpx;
      width: 90%;
    }
    .modal-c .header-p{
      display: flex;
      flex-direction: column;
      background-color: #fff;
    }
    .modal-c .header-p .item-img{
      width: 100%;
      height: 400rpx;
      background-color: #e7ac40;
      border-top-left-radius: 10rpx;
      border-top-right-radius: 10rpx;
    }
    .modal-c .header-p .title{
      font-size: 35rpx;
      color: #333;
      font-weight: bold;
      margin-left: 16rpx;
      margin-right: 16rpx;
    }
    .modal-c .header-p .desc{
      display: inline-block;
      font-size: 28rpx;
      color: #333;
      margin-left: 16rpx;
      margin-top: 30rpx;
      margin-bottom: 20rpx;
    }
    .footer-p{
      display: flex;
      align-items: center;
      height: 80rpx;
      background-color: #f4f4f4;
      padding: 0 20rpx;
      border-bottom-left-radius: 10rpx;
      border-bottom-right-radius: 10rpx;
    }
    .footer-p .price{
      font-size: 36rpx;
      color: red;
      flex: 1;
      font-weight: bold;
    }
    .upBtn{
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 8rpx 12rpx;
    }
    .upBtn span{
      margin:0 10rpx ;
    }
    .btn-reduce,.btn-add{
        width: 50rpx;
        height: 50rpx;
        background-color: #e64340;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        border-radius: 50%;
    }
    .btn-num{
        width: 50rpxs;
        height: 50rpx;
        font-size: 28rpx;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .food-cover{
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        width: 750rpx;
        bottom: 0;
        background-color: rgba(0, 0, 0, 0);
        z-index: 500;
    }
</style>