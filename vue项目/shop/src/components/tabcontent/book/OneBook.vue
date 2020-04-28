<template>
    <div class="Obook">

        <div v-if="book">
    <mt-swipe :auto="4000" >
            <mt-swipe-item v-for="(item,index) in  book.imgs" :key="index"><img class="myimg" :src="item" alt="" srcset=""></mt-swipe-item>
    </mt-swipe>
 <!-- 价格   -->
<div class="d-flex bd-highlight justify-content-between align-items-center price">

  <div class="p-2 bd-highlight">
      <div>
          <span class="n_price text-danger">￥{{book.new_price }} </span><br>
          <span class="o_price text-black-50"><del>￥{{book.old_price}}</del></span> 
          <span class="text-danger o_price">  {{book.new_price/book.old_price*10 | priceFilter(1)}}折</span>
      </div>
  </div>

  <div class="p-2 flex-shrink-1 bd-highlight">

                  <div class="d-flex flex-column bd-highlight mb-2">
          <div class="p-2 bd-highlight text-center text-secondary" >
             <span style="fontSize:30px" v-if='flag' @click="show"> <svg class="bi bi-heart" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" d="M8 2.748l-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z" clip-rule="evenodd"/>
        </svg></span>
        <span style="color:red;fontSize:30px" v-else @click="show">
            <svg class="bi bi-heart-fill" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z" clip-rule="evenodd"/>
            </svg>
        </span>
        <br>
        收藏
                </div>

            </div>
    </div>
</div>  
<!-- 书名和标题 -->
<div class="d-flex flex-column bd-highlight mb-2">
  <div class="p-2 bd-highlight bname">{{book.name}}</div>
  <div class="p-2 bd-highlight"><div class="overflow-auto btitle text-secondary">{{book.title}}</div></div>
</div>
<!-- 出版和选择 -->
<div class="card">
  <ul class="list-group list-group-flush">
    <li class="list-group-item">
        <div class="d-flex flex-row bd-highlight mb-2">
  <div class="p-2 bd-highlight" >作者:</div>
  <div class="p-2 bd-highlight text-secondary" >{{book.author}}</div>
</div>
    </li>
    <li class="list-group-item">
            <div class="d-flex flex-row bd-highlight mb-2">
  <div class="p-2 bd-highlight" >出版时间:</div>
  <div class="p-2 bd-highlight text-secondary">{{book.time}}</div>
</div>
    </li>
  <li class="list-group-item position-relative" @click="changnum">
               <div class="d-flex flex-row bd-highlight mb-2" >
  <div class="p-2 bd-highlight" >已选：</div>
  <div class="p-2 bd-highlight text-secondary">{{n}}本</div>
  <svg class="bi bi-chevron-right" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
  <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z" clip-rule="evenodd"/>
</svg>
</div>
  </li>
  <li class="list-group-item">
        用户评论({{comments.length}})
    </li>
  </ul>
</div>
<!-- 弹框 -->
<mt-popup style="width:100%"
  v-model="popupVisible"
  position="bottom">
  <div class="pop">
<div class="card">
  <ul class="list-group list-group-flush">

    <li class="list-group-item" >
        <div class="d-flex flex-row bd-highlight mb-2 align-items-center">
    <div class="p-2 bd-highlight" ><img :src="book.imgs[0]" alt="" srcset="" class="img"></div>

    <div class="p-2 bd-highlight text-secondary align-bottom"  >
        <div class="p-2 bd-highlight text-danger">￥{{book.new_price}}</div>
        <div class="p-2 bd-highlight">库存：{{book.num}}</div>
    </div>
</div>
    </li>

    <li class="list-group-item">
        <div class="d-flex justify-content-between">
            <div class="p-2 bd-highlight">数量：</div>

            <div class="p-2 bd-highlight">
                <number ref='number' :num="book.num" :n1="'1'" :bookId ="'0'"/>
            </div>
        </div>
    </li>

     <li class="list-group-item" >
         <div class="gbtn" v-if="book.num != 0">
             <button type="button" class="btn btn-warning" @click="addCart">加入购物车</button>
            <button type="button" class="btn btn-danger" @click="buy">立即购买</button>
         </div>
         <div class="gbtn" v-else>
             <button type="button" class="btn btn-secondary" disabled>已售罄</button>
         </div>
     </li>
  </ul>
</div>
  </div>
</mt-popup>

    </div>
<footer v-if="book">
   
 
  <div class="item float-left" @click="goCart()">
    <div class="icon"><img src="../../../assets/tabbar/cart.png" alt=""></div>
    <div class="text">购物车</div>
  </div>
<div class="gbtn1 float-right" v-if="this.book.num != 0 ">
             <button type="button" class="btn btn-warning" @click="changnum">加入购物车</button>
            <button type="button" class="btn btn-danger" @click="changnum">立即购买</button>
         </div>
         <div class="gbtn1 float-right" v-else>
             <button type="button" class="btn  btn-warning out" disabled>已售罄</button>
         </div>
</footer>
    </div>
</template>
<script>
import {getBooks} from '../../../network/book'
import {getUser} from  '../../../network/user'
import {getComment} from  '../../../network/comment'
import Number from '../../number/Number'
import { Toast } from 'mint-ui';

export default {
    components:{
        Number,
    },
    data() {
        return {
            n:1,
            book:null,
            popupVisible:false,
            flag:true,
            user:null,
            comments:[]
        }
    },
    props:{
        id:{
           
            required:true
        }
    },
   
    created() {
        this.user = this.$store.state.user
     var obj = {
      flag:4,
      _id :this.$route.params.id
    }
   getBooks(obj).then(res=>{
    this.book = res   
   })
   getComment({flag:2,bookId:this.$route.params.id}).then(res=>{
       this.comments = res
      
   })
   
     
    },
    watch: {
        popupVisible(newVal){
            if(!newVal){
                     this.n = this.$refs.number.n
            }
        }
    },
    methods: {
        changnum(){
        
            this.popupVisible = true
        },
        show(){
            // 收藏
           
            
            this.flag = this.flag ? false :true
        },
        addCart(){
            // 加入购物车
           if(!this.user){ //没有登录
               this.$router.push({
                   path:`/login`
               })
           }else{ //已经登录 
            this.n = this.$refs.number.n
               var obj = {
                   cart:{
                    bookId:this.book._id,
                    num :this.n
                   },
                   _id:this.user._id,
                   flag:7
               }
                getUser(obj).then(res=>{
                    if(res.code_error=='0'){
                        this.$store.commit('changeUser',res.user)
                        this.user=this.$store.state.user
                        Toast({
                     message: '添加成功！',
                    position: 'middle',
                        duration: 2000
                        });
                    }
                    
                })
           }
        },
        goCart(){
            
            
            this.$router.push({
                path:`/`
            })
        },
        buy(){
            // 立即购买
            if(!this.$store.state.user){
                this.$router.push({
                    path:`/login`
                })
            }else{
                
            this.n = this.$refs.number.n
             var addrIndex = this.user.addrs.findIndex(item=>{
                //  获得地址索引
                    return item.flag == 'true' || item.flag == true
             })
             var order = {
                    addrIndex:addrIndex,
                    books:[this.book._id],
                    num:[this.n]
                }
                  this.$store.commit('changeOrder',order)
                
                
                
                this.$router.push({
                    path:`/order`
                })
            }
        }
    },
}
</script>
<style scoped>
.Obook{
    margin-top: 45px;
    margin-bottom: 45px;
}
.mint-swipe{
    width: 100%;
    margin-top: 40px;
    height:280px;

}
.mint-swipe img{
    width: 100%;
    height: 100%;
}
/* .price{
    border-bottom: 1px solid #000;
} */
.n_price{
    /* 现价 */
    font-size: 30px;
     padding-left: 5px;
   
}
.o_price{
    /* 原价 */
    padding-left: 5px;
    font-size: 14px;
}
.btitle{
    /* 标题 */
    height: 50px;
}
.bname{
    /* 书名 */
    font-size: 20px;
    font-weight: bold;
}
.bi-chevron-right{
    position: absolute;
    right: 5px;
    top: 25px;
    font-size: 25px;
}
.img{
    width: 150px;
}
.gbtn{
    display: flex;
}
.gbtn button{
    width: 100%;
}
footer{
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  height: 50px;
  background-color: pink;
 
}
.item{
  color: #fff;
  margin-left: 30px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  text-align: center;
}
.icon img{
  width: 20px;
}
.tabc{
  /* tab中间容器 */
  margin-top: 50px;
  margin-bottom: 50px;
}
.gbtn1{
    display: flex;
}
.gbtn1 button{
   width: 120px;
   height:50px;
}
.gbtn1 .out{
  width: 200px;
}
.myimg{
    width: 80%;
    text-align: center;
}
</style>