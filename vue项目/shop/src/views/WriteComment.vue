<template>
    <div>
        <mt-header title="写评论" class="header" fixed>
        <mt-button icon="back" slot="left" @click="back">返回</mt-button>
    </mt-header>  
        <div class="container" v-if="order">
        
<div class="card" style="width:100%" v-for="(item,index) in order.books" :key="index">
 
  <ul class="list-group list-group-flush">
    <li class="list-group-item">书名：{{item.bookName}}</li>
    <li class="list-group-item">
         <div class="text">
                    <div class="t" >商品描述：</div>
                    
                    <div v-if="flag">
                        <div :class="[item.grade>=1 ? 'item1' :'item2']" @click="bGrade('1',item)"></div>
                    <div :class="[item.grade>=2 ? 'item1' :'item2']" @click="bGrade('2',item)"></div>
                    <div :class="[item.grade>=3 ? 'item1' :'item2']" @click="bGrade('3',item)"></div>
                    <div :class="[item.grade>=4 ? 'item1' :'item2']" @click="bGrade('4',item)"></div>
                    <div :class="[item.grade>=5 ? 'item1' :'item2']" @click="bGrade('5',item)"></div>
                    <span class="msg">{{item.gmsg}}</span>
                    </div>
                </div>
    </li>
    <li class="list-group-item"><mt-field  placeholder="默认好评：这是一本值得购买的书！" type="textarea" rows="4" v-model="item.comment"></mt-field></li>
     <li class="list-group-item"></li> 
    
   
  </ul>

  </div>
  <mt-button type="primary" @click="goComment()">评论</mt-button>
  </div>
    </div>
</template>
<script>
import { Indicator } from 'mint-ui';
import {getOrder} from '../network/order'
import {getComment} from '../network/comment'
export default {
    
    data() {
        return {
            order:null,
            comments:[],
            flag:true,
            toastInstanse: null
            
            
        }
    },
    created() {
        var id = this.$route.params.id
        getOrder({flag:4,orderId:id}).then(res=>{
            this.order = res
            this.order.books.forEach(item=>{
                item.grade = 5,
                item.gmsg = "非常好"
                item.comment = ''
            })
        })
    },
    methods: {
        back(){
            this.$router.go(-1)
        },
         bGrade(a,item){
 
            this.flag = false
             
             
           if(a == 1){
               this.flag = true
               item.grade = 1
               item.gmsg = '非常差'
           }
           if(a == 2){
               this.flag = true
                item.grade = 2
                item.gmsg = '差'
                
                
                
           }
           if(a== 3){
               this.flag = true
                item.grade = 3
                item.gmsg = '一般'
           }
           if(a == 4) {
               this.flag = true
                  item.grade = 4
                item.gmsg = '好' 
           }
           if(a == 5){
               this.flag = true
                item.grade = 5
                item.gmsg = '非常好'
           }
        },
        goComment(){
           

            var comment ={}
            this.order.books.forEach(item=>{
                if(item.comment.length<=0){
                    item.comment ='默认好评：这是一本值得购买的书！'
                }
                comment.gmsg = item.gmsg
                comment.grade = item.grade
                comment.comment = item.comment
                comment.bookId = item.bookId
                comment.userAvatar = this.$store.state.user.avatar
                comment.userName = this.$store.state.user.name
                 Indicator.open({
       text: '加载中...',
        spinnerType: 'fading-circle'
        });
                getComment({comment:comment,flag:1}).then(res=>{
                    getOrder({orderId:this.order.orderId,flag:3,state:4}).then(ret=>{
                        Indicator.close()
                        this.$router.push({
                            path:`/mycomment/1`
                        })
                    })
                })
                

                
            })
        }
    },
}
</script>
<style scoped>
.header{
    background-color: pink;
}
.container{
    margin: 0;
    padding: 0;
    margin-top: 45px;
    margin-bottom: 45px;
}
.text{
      width: 70%;
  }
  .t{
      height: 30px;
      line-height: 30px;
  }
  .item1{
      display: inline-block;
      width: 30px;
      height: 30px;
      background: url("../assets/wjx2.svg") no-repeat;
      background-size: contain;
      background-position:center; 
  }
    .msg{
      margin-left: 20px;
      color: #333;
      line-height: 30px;
  }
    .item2{
      display: inline-block;
      width: 30px;
      height: 30px;
      background: url("../assets/wjx1.svg") no-repeat;
      background-size: contain;
      background-position:center; 
  }
</style>