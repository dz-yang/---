<template>
  <div>
<!--     
    <mt-header  fixed class="header" >
    <router-link to="/" slot="left">
		    <mt-button icon="back"></mt-button>
    </router-link>
    </mt-header> -->
    <div class="container">
         <mt-navbar class="page-part" v-model="selected"  style="position:fixed;top:0;left:0;right:0">
           <mt-button icon="back" class="back" @click="back()">返回</mt-button>
           <mt-tab-item >返回</mt-tab-item>
            
  <mt-tab-item id="商品">商品</mt-tab-item>

  <mt-tab-item id="评论">评论</mt-tab-item>
 
</mt-navbar>

<!-- tab-container -->
<mt-tab-container v-model="selected" class="tabc">
  <mt-tab-container-item id="商品" v-if="selected=='商品'">
    <one-book :id="id"></one-book>
  </mt-tab-container-item>
 
  <mt-tab-container-item id="评论" v-if="selected=='评论'">
    <book-comment :bookId='id'></book-comment>
  </mt-tab-container-item>
</mt-tab-container>
       </div>
  
<!-- <footer v-if="book">
   
 
  <div class="item float-left " >
    <div class="icon"><img src="../assets/tabbar/cart.png" alt=""></div>
    <div class="text">购物车</div>
  </div>
<div class="gbtn float-right" v-if="this.book.num == 0 ">
             <button type="button" class="btn btn-warning">加入购物车</button>
            <button type="button" class="btn btn-danger">立即购买</button>
         </div>
         <div class="gbtn float-right" v-else>
             <button type="button" class="btn  btn-warning out" disabled>已售罄</button>
         </div>
</footer> -->
  </div>
</template>
<script>
import OneBook from '../components/tabcontent/book/OneBook'
import BookComment from '../components/tabcontent/book/BookComment'
import {getBooks} from '../network/book'
import { Indicator } from 'mint-ui';

export default {
  components:{
    OneBook,
    BookComment
  },
  data() {
    return {
      selected:'商品',
      id:'',
      book:null
    }
  },
  created() {
    this.id = this.$route.params.id
    var obj = {
      flag:4,
      _id :this.$route.params.id
    }
    Indicator.open({
       text: '加载中...',
        spinnerType: 'fading-circle'
        });
   getBooks(obj).then(res=>{
    this.book = res
     Indicator.close()
     
   })
   
    
  },
  methods: {
   back(){
     this.$router.go(-1)
   }
  },
}
</script>
<style scoped>
*{
  margin: 0;
  padding: 0;
}
.header{
  background-color: pink;

}

.mint-navbar .mint-tab-item{
  
  border: none;
  
}
.mint-navbar .mint-tab-item:nth-child(1){
 
  border: none;

  
}

.mint-navbar .mint-tab-item.is-selected{
   border: none;
  /* color: #d4237a; */
}
.mint-navbar{
  background-color: pink;
}
/* .container{
  margin-top: 50px;
} */

.page-part{
  position: relative;
  z-index: 99;
}
.back{
  height: 40px;
  width: 100px;
  background-color: pink;
  position: absolute;
  left: -15px;
  top: 3px;
  color: #fff;
}
/* footer{
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
  tab中间容器
  margin-top: 50px;
  margin-bottom: 50px;
}
.gbtn{
    display: flex;
}
.gbtn button{
   width: 100px;
   height:50px;
}
.gbtn .out{
  width: 200px;
} */
</style>