<template>
    <div class="comment">
      <div class="c" v-if="comments.length<=0">
          没有评论~
      </div>
      <div class="container" v-else>
<div class="card" style="width: 100%"  v-for="(item,index) in comments" :key="index">
  <ul class="list-group list-group-flush">
    <li class="list-group-item">
<div class="d-flex flex-row bd-highlight mb-2">
  <div class="p-2 bd-highlight img"><img src="../../../assets/avatar.jpg" alt=""></div>
  <div class="p-2 bd-highlight">
      <div>用户昵称：{{item.userName}}</div>
      <div v-if="item.grade=='5'"> 评分：<span class="grade">★★★★★</span></div>
      <div v-if="item.grade=='4'"> 评分：<span class="grade">★★★★☆</span></div>
      <div v-if="item.grade=='3'"> 评分：<span class="grade">★★★☆☆</span></div>
      <div v-if="item.grade=='2'"> 评分：<span class="grade">★★☆☆☆</span></div>
      <div v-if="item.grade=='1'"> 评分：<span class="grade">★☆☆☆☆</span></div>
  </div>
</div>
    </li>
    <li class="list-group-item">
        {{item.comment}}
    </li>
    
  </ul>
</div>
      </div>
    </div>
</template>
<script>
import {getComment} from  '../../../network/comment'
export default {
    props:{
        bookId:{
        },
    },
    data() {
        return {
            comments:[]
        }
    },
    created() {
          getComment({flag:2,bookId:this.$route.params.id}).then(res=>{
       this.comments = res
       console.log(this.comments); 
   })
    },
}
</script>
<style scoped>
.comment{
   
    margin-top: 45px;
}
.container{
 margin: 0;
    padding: 0;
}
.img{
    width: 30%
}
.img img{
    width: 60%;
    border-radius: 50%;
}
.grade{
    color: red;
}
.c{
    text-align: center;
}
</style>