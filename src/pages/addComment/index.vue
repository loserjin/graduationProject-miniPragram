<template>
    <div class="container">
        <div class="content">
            <div class="text">
                <textarea class="input" cols="30" rows="5" v-model="comment"></textarea>
            </div>
            <div class="star-c">
                <span>评分:</span>
                <!-- 评分开关 -->
                <div class="star" v-if="star==0">
                    <i class="iconfont dark" @click=changeStar(1)>&#xe60d;</i>
                    <i class="iconfont dark" @click=changeStar(2)>&#xe60d;</i>
                    <i class="iconfont dark" @click=changeStar(3)>&#xe60d;</i>
                    <i class="iconfont dark" @click=changeStar(4)>&#xe60d;</i>
                    <i class="iconfont dark" @click=changeStar(5)>&#xe60d;</i>
                </div>
                <!-- 评分展示 -->
                <div class="star" v-if="star==1">
                    <i class="iconfont bright">&#xe60d;</i>
                    <i class="iconfont dark" @click=changeStar(2)>&#xe60d;</i>
                    <i class="iconfont dark" @click=changeStar(3)>&#xe60d;</i>
                    <i class="iconfont dark" @click=changeStar(4)>&#xe60d;</i>
                    <i class="iconfont dark" @click=changeStar(5)>&#xe60d;</i>
                </div>
                <div class="star" v-else-if="star==2">
                    <i class="iconfont bright" @click=changeStar(1)>&#xe60d;</i>
                    <i class="iconfont bright">&#xe60d;</i>
                    <i class="iconfont dark" @click=changeStar(3)>&#xe60d;</i>
                    <i class="iconfont dark" @click=changeStar(4)>&#xe60d;</i>
                    <i class="iconfont dark" @click=changeStar(5)>&#xe60d;</i>
                </div>
                <div class="star" v-else-if="star==3">
                    <i class="iconfont bright" @click=changeStar(1)>&#xe60d;</i>
                    <i class="iconfont bright" @click=changeStar(1)>&#xe60d;</i>
                    <i class="iconfont bright">&#xe60d;</i>
                    <i class="iconfont dark" @click=changeStar(4)>&#xe60d;</i>
                    <i class="iconfont dark" @click=changeStar(5)>&#xe60d;</i>
                </div>
                <div class="star" v-else-if="star==4">
                    <i class="iconfont bright" @click=changeStar(1)>&#xe60d;</i>
                    <i class="iconfont bright" @click=changeStar(2)>&#xe60d;</i>
                    <i class="iconfont bright" @click=changeStar(3)>&#xe60d;</i>
                    <i class="iconfont bright">&#xe60d;</i>
                    <i class="iconfont dark" @click=changeStar(5)>&#xe60d;</i>
                </div>
                <div class="star" v-else-if="star==5">
                    <i class="iconfont bright" @click=changeStar(1)>&#xe60d;</i>
                    <i class="iconfont bright" @click=changeStar(2)>&#xe60d;</i>
                    <i class="iconfont bright" @click=changeStar(3)>&#xe60d;</i>
                    <i class="iconfont bright" @click=changeStar(4)>&#xe60d;</i>
                    <i class="iconfont bright">&#xe60d;</i>
                </div>
            </div>
            <div class="namestatus">
                <span>是否匿名</span>
                <radio-group class="group">
                    <span v-for="(item,index) in gender" :key=index @click="choicenamestatus(item)">
                        <radio>{{item.name}}</radio>
                    </span>
                </radio-group>
            </div>
            <button @click=subComment>提交</button>
        </div>
        
    </div>    
</template>
<script>
export default {
    data() {
        return {
            comment:'',
            star:0,
            namestatus:0,
            param:{},
            gender:[
                {value:0,name:'不匿名'},
                {value:1,name:'匿名'}
            ],
        }
    },
    methods: {
        changeStar(value){
            this.star=value
        },
        choicenamestatus(item){
            this.namestatus=item.value
            console.log(this.namestatus)
        },
        // changenNamestatus(value){
        //     this.namestatus=value
        // },
        subComment(){
            this.$fly.post(`/wechat/discuss/edit?namestatus=`+this.namestatus,{
                    "discussText": this.comment,
                    "discussStart": this.star,
                    "departmentId": this.param.id,
                    "departmentName": this.param.name,
                    "departmentfloorId": this.param.floorId,
                    "departmentfloorName": this.param.floorName,
            })
            .then(res=>{
                console.log(res.data)
            })
        }
    },
    beforeMount() {
        this.param=JSON.parse(this.$mp.query.param)

    },
}
</script>
<style scoped>
    .container{
        width: 100%;
        display: flex;
        flex-direction: column;
    }
    .content{
        margin: 20rpx;
    }
    .text{
        display: flex;
    }
    .input{
        width: 100%;
        border: 2rpx solid #ccc;
    }
    .star{
        display: flex;
        align-items: center;
    }
    .star i{
        font-size: 30rpx;
        margin-left: 5rpx;
    }
    .star .bright{
        color: #F2A50C;
    }
    .star .dark{
        color: #ccc;
    }
</style>