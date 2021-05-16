<template>
    <div class="container">
        <div class="header">请扫码以下二维码进行就餐付款</div>
        <div id="twodcode">
        <image class="twoDCode" :src="qrcodeURL"></image>
        </div>
    </div>
	
</template>
<script>
const QR = require('@/utils/weapp-qrcode.js')        
export default{
		data(){
			return{
				qrcodeURL:"",
				codeText:'',
                id:''
			}
		},
		methods:{
			drawImg: function () {
   				var imgData = QR.drawImg(this.codeText, {
                                    typeNumber: 4,
                                    errorCorrectLevel: 'M',
                                    size: 500
                                })
   				this.qrcodeURL=imgData;
  			},
            filterarr(arr){
                var str=''
                for(var i=0;i<arr.length;i++){
                    str=str+arr[i].menuName+`,`
                }
                return str
            } 
		},
        beforeMount() {
            console.log(this.$mp.query.id)
            this.id=this.$mp.query.id
        },
		mounted(){
            this.$fly.get(`/wechat/userorderdetail/infos?userorderId=`+this.id)
            .then(res=>{
                console.log(res.data.data.records)
                this.codeText=this.filterarr(res.data.data.records)
                console.log(this.codeText)
                this.drawImg();
            })
			
		
		}
	}
</script>
<style scoped>
    .container{
        width: 100%;
        height: 100vh;
        background-color: brown;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    .header{
        height: 80rpx;
        font-size: 35rpx;
        font-weight: bold;
        line-height: 80rpx;
    }
    .twoDCode{
        width: 200px;
        height: 200px;
    }
 
</style>