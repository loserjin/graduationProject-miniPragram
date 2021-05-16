<template>
<!-- -c表示容器 -->
<!-- -l和-r表示左边和右边 -->
    <div class="container">
        <!-- 上边局域栏 -->
        <div class="header-c">
            <div class="header">
                <div class="header-l">
                   <img class="shop-logo" :src="department.departmentfloorPic" alt="">
                </div>
                <div class="header-r">
                    <div class="header-r-title">
                        <span>{{department.departmentName}}</span>
                        <div class="title-l"></div>
                        <span>{{department.departmentfloorName}}</span>
                    </div>
                    <span class="header-r-notice">预定时间：16:00-1:00</span>
                </div>
            </div>
            <div class="cate-c">
                <div class="cate"  @click="changCate(1)">
                    <span :class="{'select':cate==1}">菜单</span>
                    <div :class="{'line':cates==1}"></div>
                </div>
                 <div class="cate"  @click="changCate(2)">
                    <span :class="{'select':cate==2}">评论</span>
                    <div :class="{'line':cates==2}"></div>
                </div>
                
            </div>
        </div>
        <!-- 左边容器 -->
        <div v-if="cate==1">
            <!-- 中间商品内容部分 -->
            <div class="list-c">
                <!-- 商品列表分类 -->
                <scroll-view class="list-l" :scroll-y="true">
                    <div class="list-l-item" :class="{active:index===tagIndex}" v-for="(item,index) in type" :key="index" @click="categoryClick(item.typeId,index)">
                        <span>{{item.typeName}}</span>          
                    </div>
                </scroll-view>
                <!-- 商品内容选择 -->
                <scroll-view class="list-r" :scroll-y="true">
                    <div class="section">
                        <span>{{typeName}}</span>
                    </div>
                    <div class="item-list" v-for="(item,index) in food" :key="index" @click=showFood(item)>
                        <div class="item">
                            <div class="item-l">
                                <img :src="item.menuPic" alt="">
                            </div>
                            <div class="item-r">
                                <span class="title">{{item.menuName}}</span>
                                <span class="description">订金：{{item.menuFMoney}}</span>
                                <div class="item-r-bottom">
                                    <span class="price">标价：{{item.menuMoney}}</span>
                                    <div class="change-num">
                                        <div class="btn-reduce" @click.stop="removeToCart(item)" v-if="item.count">
                                            <i class="iconfont">&#xe6b8;</i>
                                        </div>
                                        <span class="btn-num" v-if="item.count">{{item.count}}</span>
                                        <div class="btn-add" @click.stop="addToCart(item)"><i class="iconfont">&#xe602;</i></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                </scroll-view>
            </div>
            
            <!-- 下部分购物车栏 -->
            <div class="footer-c">
                <div class="cart-img" @click="showCart">
                    <i class="iconfont" :class="{cartActive:isCart===true}">&#xe601;</i>
                    <span class="countSum" v-show="totalCount">{{totalCount}}</span>
                </div>
                <div class="cart-content">
                    <div class="total-price">
                        <span>￥{{totalPrice}}</span>
                        <span class="fprice">定金:￥{{totalFPrice}}</span>
                    </div>
                    <button class="sub-button"  @click="toSubmit" :disabled="btn" >结算</button>
                </div>
                
            </div>

            <!-- 黑背景模糊墙 -->
            <div  class="beiJing-back" @click="cartClose" v-show="listShow"></div>

            <!-- 购物车 弹窗层 -->
            <div class="cart-c" v-show="listShow">
                <div class="cart-c-top">
                    <div class="top-r">购物车</div>
                    <div class="top-l" @click="clearCart">清空</div>
                </div>
                <scroll-view class="cart-c-list" scroll-y="true">
                    <div class="cart-list-item" v-for="(item,index) in myCart" :key="index">
                        <span>{{item.menuName}}</span>
                        <div class="item-view">
                                <div class="cartPrice"><span>￥{{item.menuMoney}}</span></div>
                                <div class="btnUpData">
                                    <div class="btn-reduce" @click="removeCart(item)"><i class="iconfont">&#xe6b8;</i></div>
                                    <div class="btn-num">{{item.count}}</div>
                                    <div class="btn-add" @click="addCart(item)"><i class="iconfont">&#xe602;</i></div>
                                </div>   
                        </div>
                    </div>
                </scroll-view>
            </div>
            

            <!-- 菜品详情 -->
            <div class="previewModal" v-if="isShow">
                <div class="modal-c">
                <div class="header-p">
                    <img class="item-img" :src="foodModal.menuPic" alt="">
                    <span class="title">{{foodModal.menuName}}</span>
                    <div>
                    <span class="desc" v-for="(item,i) in foodModal.menucomponents" :key="i">{{item.componentName}}</span>
                    </div>
                </div>
                
                <div class="footer-p">
                    <span class="price">￥{{foodModal.menuMoney}}</span>
                    <div class="upBtn">
                        <div class="btn-reduce" @click="removeCart(foodModal)" v-if="foodModal.count"><i class="iconfont">&#xe6b8;</i></div>
                        <span class="btn-num" v-if="foodModal.count">{{foodModal.count}}</span>
                        <div class="btn-add" @click="addCart(foodModal)"><i class="iconfont">&#xe602;</i></div>
                    </div>
                </div>
                </div>
                <div class="cancle" @click="closePreview">
                    <i class="iconfont">&#xe605;</i>
                </div>
            </div>
        </div>
        <!-- 右边容器 -->
        <div v-else>
            <div class="comment-c">
                <div class="comment-c-header">食堂评论</div>
                <scroll-view class="comment-scroll">
                    <div class="comment" v-for="(item,index) in commentList" :key="index">
                        <div class="comment-l">
                            <img src="" alt="">
                        </div>
                        <div class="comment-r">
                            <div class="comment-r-haeder">
                                <div class="commentName">{{item.discussName}}</div>
                                <div class="commentTime">{{item.discussCreatime}}</div>
                            </div>
                            <div class="comment-r-middle">
                                <div class="star" v-if="item.discussStart==1">
                                    <i class="iconfont bright">&#xe60d;</i>
                                    <i class="iconfont dark">&#xe60d;</i>
                                    <i class="iconfont dark">&#xe60d;</i>
                                    <i class="iconfont dark">&#xe60d;</i>
                                    <i class="iconfont dark">&#xe60d;</i>
                                </div>
                                <div class="star" v-else-if="item.discussStart==2">
                                    <i class="iconfont bright">&#xe60d;</i>
                                    <i class="iconfont bright">&#xe60d;</i>
                                    <i class="iconfont dark">&#xe60d;</i>
                                    <i class="iconfont dark">&#xe60d;</i>
                                    <i class="iconfont dark">&#xe60d;</i>
                                </div>
                                <div class="star" v-else-if="item.discussStart==3">
                                    <i class="iconfont bright">&#xe60d;</i>
                                    <i class="iconfont bright">&#xe60d;</i>
                                    <i class="iconfont bright">&#xe60d;</i>
                                    <i class="iconfont dark">&#xe60d;</i>
                                    <i class="iconfont dark">&#xe60d;</i>
                                </div>
                                <div class="star" v-else-if="item.discussStart==4">
                                    <i class="iconfont bright">&#xe60d;</i>
                                    <i class="iconfont bright">&#xe60d;</i>
                                    <i class="iconfont bright">&#xe60d;</i>
                                    <i class="iconfont bright">&#xe60d;</i>
                                    <i class="iconfont dark">&#xe60d;</i>
                                </div>
                                <div class="star" v-else-if="item.discussStart==5">
                                    <i class="iconfont bright">&#xe60d;</i>
                                    <i class="iconfont bright">&#xe60d;</i>
                                    <i class="iconfont bright">&#xe60d;</i>
                                    <i class="iconfont bright">&#xe60d;</i>
                                    <i class="iconfont bright">&#xe60d;</i>
                                </div>
                                <div class="text">{{item.discussText}}</div>
                                <div class="img" v-if="item.img">图片</div>
                            </div>
                        </div>
                    </div>
                </scroll-view>
            </div>
        </div>
        
    </div>
</template>

<script>
import {mapState,mapGetters} from 'vuex'
export default {
    data() {
        return {
            // 当前饭堂信息
            department:{},
            cate:1,
            cates:1,
            tagIndex:0, 
            //购物车显示
            isCart:false,
            //详情显示
            isShow: false,
            floorId:0,
            typeId:0,
            typeName:'',
            type:[],
            goods:[],
            // 全部food
            foods:[],
            // 分好类的food
            food:[],
            // 点击传的food
            foodModal:[],
            commentList:[],
            //接受前面传过来的id、日期、时段
            param:{}
        }
    },
    methods: { 
        changCate(index){
            this.cate=index
            this.cates=index
        },
        //左侧点击按钮，切换分类
        categoryClick(id, index) {
            this.tagIndex = index;
            this.food=this.filterFoods(this.foods,id)
            this.typeName=this.type[index].typeName     
        },
        //点击切换菜品详情显示状态
        toggleShow () {
            this.isShow = !this.isShow
        },
        showFood(item){
            this.foodModal=item
            this.toggleShow()
        },
        //关闭显示菜品详情
        closePreview() {
            this.isShow=false
        },
        //点击购物车图标
        showCart(){
            //当总数量大于才切换
            if(this.totalCount>0){
                this.isCart=!this.isCart
            }
        },
        //点击黑色遮罩关闭购物车
        cartClose(){
            this.isCart=false
        },
        // 菜品上的增加很减少
        removeToCart(food){
            this.$store.commit('recrementMycart',food)
        },
        addToCart(food){
            this.$store.commit('incrementMycart',food)
        },
        // 购物车上的增加和减少
        removeCart(food){
            this.$store.commit('recrementMycart',food)
        },
        addCart(food){
            this.$store.commit('incrementMycart',food)
        },
        clearCart(){
            this.$store.commit('cartClear')
        },   
        toSubmit(){
            wx.navigateTo({
                url: `/pages/submitOrder/main?param=`+JSON.stringify(this.param)
                }) 
        },
        filterType(arr,id){
            var newArr=arr.filter((item)=>{
                return item.departmentfloorId==id
            })
            return newArr
        },
        filterFoods(arr,id){
            var newArr2=arr.filter((item)=>{
                return item.typeId==id
            })
            return newArr2
        }

    },
    computed:{
       ...mapState(['myCart']),
       ...mapGetters(['totalPrice','totalCount','totalFPrice']),
       listShow(){
           if(this.totalCount===0){
               //每次清空购物车重置isCart
               this.isCart=false
            //    return false
           }
           return this.isCart
       },
       btn(){
           if(this.totalCount>0){ 
               return false
           }else{   
               return true
           }
       }
    },
    onUnload(){
        this.$store.commit('cartClear')
        this.typeName=''
        this.tagIndex=0
    },
    beforeMount() {
        // 拿到楼层ID
        // console.log(this.$mp.query.param)
        var that=this
        if(this.$mp.query.param){
             var param=JSON.parse(this.$mp.query.param)
            this.floorId=parseInt(param.floorId)
            this.param=param
            this.department=param
            console.log(this.param)
        }else{
            wx.getStorage({
                key: 'key',
                success: function(res){
                    // success
                    that.floorId=res.data
                    console.log(that.floorId)      
                }
            })
        }
        wx.getStorage({
                key: 'item',
                success: function(res){
                    // success
                    console.log(res)
                   that.department=res.data  
                }
            })
        
    },
    mounted() {       
        this.$fly.get(`/wechat/type/infos`)
        .then(res=>{
            this.type=this.filterType(res.data.data,this.floorId)
            if(this.type.length>0){
                this.typeId=this.type[0].typeId
                this.typeName=this.type[0].typeName 
            } 
        }),
        this.$fly.get(`/wechat/dailymenu/infos`,{
            "departmentId":this.param.id,
            "departmentfloorId":this.param.floorId,
            // "date":this.param.date,
            "date":this.param.date,
            "time":this.param.time
        })
        .then(res=>{
            console.log(res)
            this.goods=res.data.data
            if(this.goods){
                var data=this.goods.filter((item)=>{
                    return item.departmentfloorId===this.floorId
                })
                this.foods=data
                console.log(this.foods)
                this.food=this.filterFoods(this.foods,this.typeId) 
            }  
        })
        this.$fly.get(`/wechat/discuss/infos?departmentId=`+ this.param.id+`&&departmentfloorId=`+this.param.floorId)
        .then(res=>{
            this.commentList=res.data.data
        })
        // this.$fly.get(`/wechat/discuss/infos?departmentId=4&&departmentfloorId=8`)
        // .then(res=>{
        //     this.commentList=res.data.data
        // })
    },
    
}
</script>
<style  scoped>
.container{
    display: flex;
    flex-direction: column;
    position: relative;
    
}
.container .header-c{
    display: flex;
    flex-direction: column;
    position: fixed;
    width: 750rpx;
}
.header-c .header{
    display: flex;
    align-items: center;
    background: #fafafa;
    height: 150rpx;
}
.header-c .header-l{
    display: flex;
    margin-left: 16rpx;
}
.header-c .header-l .shop-logo{
    height: 120rpx;
    width: 120rpx;
    border-radius: 8rpx;
    background: red;
}
.header-c .header-r{
    display: flex;
    flex-direction: column;
    margin: 0 20rpx;
}
.header-c .header-r .header-r-title{
    display: flex;
    align-items: center;
    font-size: 40rpx;
    color: black;
}
.header-c .header-r .header-r-title .title-l{
    margin: 0 20rpx;
    width: 2rpx;
    height: 30rpx;
}
.header-c .header-r .header-r-notice{
    font-size: 30rpx;
    color: black;
    line-height: 30rpx;
    height: 30rpx;
    overflow: hidden;
    margin: 10rpx 0;
}
.header-c .cate-c{
    display: flex;
    height: 70rpx;
    background-color: white;
    align-items: center;
    box-sizing: border-box;
    border-bottom: 1rpx solid rgb(153, 149, 149);
    position: relative; 
}
.header-c .cate-c .cate{
    margin-left: 20rpx;
    height: 60rpx;
    position: relative;
    width: 120rpx;

    text-align: center;
}
.header-c .cate-c span{
    font-size: 35rpx;
    color: #000;
    line-height: 60rpx;

    
}
.header-c .cate-c .cate span{
    color: #666;
}
.header-c .cate-c .cate .select{
    color: black;
}
.header-c .cate-c .line{
    position: absolute;
    background-color: rgb(224, 74, 14);
    bottom: 2rpx;
    width: 60rpx;
    height: 4rpx;
    left: 30rpx;
}

/* 中间内容部分 */
.container .list-c{
    display: flex;
    position: fixed;
    top: 220rpx;
    bottom: 150rpx;
    width: 100%;
}


/* 左边列表内容 */
.list-c .list-l{
    display: flex;
    flex-direction: column;
    width: 160rpx;
    background: #FAFAFA;
}
.list-c .list-l .list-l-item{
    display: flex;
    width: 160rpx;
    align-items: center;
    justify-content: center;
    padding: 20rpx;
    box-sizing: border-box;
    position: relative;
    color: #999999;
}
.list-c .list-l .list-l-item span{
    font-size: 30rpx;
    
    margin-left: 10rpx;
}
.list-c .list-l .list-l-count{
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #e74c3c;
    width: 30rpx;
    height: 30rpx;
    border-radius: 15rpx;
    right: 0;
    top: 6rpx;
    position: absolute;
    font-size: 30rpx;
    color: #fff;
}
.active{
    color: black;
    background-color: #FFFFFF;
}
.active span{
    color: #000;
    font-weight: bold;
}



/* 右边信息内容 */
.list-c .list-r{
    display: flex;
    flex-direction: column;
    background-color: #fff;
    
} 
.list-c .list-r .section{
    display: flex;
    height: 70rpx;
    align-items: center;
    margin-left: 20rpx;
    background: white;
}
.list-c .list-r .section span{
    font-size: 30rpx;
    color: #000;
}

.list-c .list-r .item-list{
    display: flex;
    flex-direction: column;
    justify-items: center;
    margin: 10rpx 20rpx;
    border-bottom: 2rpx solid #ccc ;
    
}
.item-list .item{
    display: flex;
    justify-content: center;
    align-items: center;
    background: white;
}
.item .item-l img{
    width: 160rpx;
    height: 160rpx;
    background-size: cover;
    background: green;
    border-radius: 15rpx;
}
.item .item-r{
    display: flex;
    flex-direction: column;
    margin-left: 20rpx;
    justify-content: space-between;
    width: 370rpx;
    background: #fff;
    
}
.item .item-r .title{
    font-size: 30rpx;
    color: #000;
    height: 35rpx;
    margin-top: 5rpx;
    line-height: 35rpx;
    overflow: hidden;
    font-weight: bold;
    
    
}
.item .item-r .description{
    font-size: 25rpx;
    line-height: 30rpx;
    height: 30rpx;
    overflow: hidden;
    margin-top: 10rpx;
    
}
.item .item-r .item-r-bottom{
    display: flex;
    align-items: center;
    justify-content: space-between;
   
}
.item .item-r .item-r-bottom .price{
    font-size: 32rpx;
    color: #000;
    font-weight: bold;
    
}
.item .item-r-bottom .change-num{
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 8rpx 12rpx;
}

.change-num i{
    
    font-size: 35rpx;
    font-weight: bold;
}
.change-num  span{
    margin:0 8rpx ;
}
.footer-c{
    position: fixed;
    z-index: 860;
    width: 100%;
    bottom: 0;
    height: 150rpx;
    widows: 750rpx;
    background: #9ca8b8;
    display: flex;
    
}
.footer-c .cart-img{
    width: 120rpx;
    height: 120rpx;
    background-color: white;
    margin: 0 30rpx;
    border-radius: 50%;
    position: relative;
    border: 2rpx solid #ccc;
    top: -20rpx;
    display: flex;
    justify-content: center;
    align-items: center;
}
.footer-c .cart-img .iconfont{
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 80rpx;
}

.footer-c .countSum{
    position: fixed;
    bottom: 130rpx;
    left: 120rpx;
    z-index: 801;
    width: 40rpx;
    height: 40rpx;
    line-height: rpx;
    border-radius: 50%;
    text-align: center;
    font-size: 28rpx;
    background-color: red;
    color: white;
}
.footer-c .cart-content{
    margin-top: 10rpx;
    margin-bottom: 30rpx;
    display: flex;
    width: 590rpx;
    justify-content: space-between;
    align-items: center;
}
.footer-c .total-price{
    margin-left: 10rpx;
    font-size: 48rpx;
    color: white;
}
.footer-c .total-price .fprice{
    margin-left: 20rpx;
    font-size: 35rpx;
}
.footer-c .sub-button{
    margin-right: 20rpx;
    width: 200rpx;
    height: 100rpx;
    background: rgb(42, 149, 199);
}
.cartActive{
    color: coral;
}



/* 购物车弹出黑色背景层 */
.beiJing-back{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    width: 750rpx;
    bottom: 150rpx;
    background-color: rgba(0, 0, 0, 0.7);
    z-index: 800;
}

.cart-c{
    position: fixed;
    left: 0;
    right: 0;
    bottom: 150rpx;
    width: 750rpx;
    min-height: 210rpx;
    z-index: 850;
    background-color: white;
}
.cart-c .cart-c-top{
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 80rpx;
    font-size: 28rpx;
    background-color: rgba(240, 240, 240, 1);
    border-bottom: 1rpx solid rgba(170, 170, 170, 170);
}
.cart-c .cart-c-top .top-r{
    margin-left: 30rpx;
}
.cart-c .cart-c-top .top-l{
    margin-right: 30rpx;
}
.cart-c-list{
    width: 750rpx;
    min-height: 80rpx;
    max-height: 240rpx;
    padding-bottom: 50rpx;
    overflow: scroll;
}
.cart-c-list .cart-list-item{
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 15rpx;
    padding-bottom: 15rpx;
    border-bottom: 1rpx solid rgba(170, 170, 170, 0.3);
}
.cart-c-list .cart-list-item span{
    margin-left: 30rpx;
}
.cart-c-list .cart-list-item .item-view{
    width: 250rpx;
    margin-right: 30rpx;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.cart-c-list .cart-list-item .btnUpData{
    width: 150rpx;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

  
.btn-num{
    width: 50rpxs;
    height: 50rpx;
    font-size: 28rpx;
    display: flex;
    justify-content: center;
    align-items: center;
}




.previewModal{
    position: fixed;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.3);
    z-index: 920;
    flex-direction: column;
    display: flex;
    justify-content: center;
    align-items: center;
    }
    .modal-c{
        display: flex;
        flex-direction: column;
        background-color: white;
        width: 90%;
        margin-right: 40rpx;
        margin-left: 40rpx;
        border-radius: 10rpx;
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
    
    .cancle{
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 40rpx;
    }
    .cancle i{
        font-size: 60rpx;
        color: rgb(134, 128, 128);
    }


    .btn-reduce,.btn-add{
        width: 50rpx;
        height: 50rpx;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .change-num i{
        font-size: 40rpx;
        color: #218868;
    }
    .btnUpData i{
        font-size: 40rpx;
        color: #218868;
    }
    .upBtn i{
        font-size: 40rpx;
        color: #218868;
    }
    .btn-num{
        width: 50rpxs;
        height: 50rpx;
        font-size: 28rpx;
        display: flex;
        justify-content: center;
        align-items: center;
    }




    /* 右侧容器 */
    .container .comment-c{
    display: flex;
    position: fixed;
    top: 220rpx;
    bottom: 0rpx;
    width: 100%;
    flex-direction: column;
    }
    .container .comment-c .comment-c-header{
        margin: 20rpx;
        background:white;
        text-align: center;
        padding: 10rpx;
        border-radius: 15rpx;
    }
    .container .comment-c .comment-scroll{
        display: flex;
        flex-direction: column;
        background: white;
    }
    .comment{
        display: flex;
        border-bottom: 2rpx solid #999;
    }
    .comment .comment-l{
        padding-top: 15rpx;
        padding-left: 15rpx;
    }
    .comment .comment-r{
        padding: 20rpx 20rpx 20rpx 20rpx;
        width: 100%;
    }
    .comment-r{
        display: flex;
        flex-direction: column;
    }
    .comment .comment-r .comment-r-haeder{
        display: flex;
        width: 100%;
        justify-content: space-between;
        margin-bottom: 10rpx;
    }
    .comment-r-haeder .commentName{
        font-size: 34rpx;
    }
    .comment-r-haeder .commentTime{
        font-size: 26rpx;
        color: #999999;
    }
    .comment-r-middle{
        width: 100%;
    }
    .comment-r-middle .star{
        display: flex;
        height: 50rpx;
        line-height: 50rpx;
    }
    .comment-r-middle .star i{
        font-size: 30rpx;
        margin-left: 5rpx;
    }
    .comment-r-middle .star .bright{
        color: #F2A50C;
    }
    .comment-r-middle .star .dark{
        color: #ccc;
    }
    .comment-r-middle .text{
        font-size: 28rpx;
        margin-bottom: 10rpx;
    }
    .comment-r-middle .img{
        width: 150rpx;
        height: 150rpx;
        background: chocolate;
    }




    .comment-scroll img{
        width: 80rpx;
        height: 80rpx;
        border-radius: 50%;
        background: rosybrown;
    }
</style>
