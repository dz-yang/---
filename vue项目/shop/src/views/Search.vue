<template>
    <div>

<div  class="header">
    <mt-search @input="search"
    	autofocus 
    	v-model="value" 
        class="search"
    	>
    </mt-search>
    <div class="back" @click="back">返回 </div>

  </div>
 
  <div v-if="!value || (value&&books.length==0)" class="snull">
      <img src="../assets/search/null.jpg"  alt="" srcset="">
  </div>
  


       <div class="categoryBook-container" v-else >
               <div class="categoryBook-book" v-for="(item,index) in books" :key="index" @click="book(item._id)">
                 
                   <div class="categoryBook-img"> <div class="number">{{index+1}}</div><img :src="item.imgs[0]" alt="" srcset=""></div>
                   <div class="categoryBook-test">
                       <div class="book-name">{{item.name}}</div>
                       <div class="book-author">{{item.author}}</div>
                       <span class="book-active">限时抢购</span>
                       <div class="price">
                           <span class="book-now-price">￥{{item.new_price}}</span>
                           <span class="book-old-price"><del>￥{{item.old_price}}</del></span>
                       </div>

                   </div>
               </div>
           </div>
    </div>
</template>
<script>
import {getBooks} from '../network/book'
import { Indicator } from 'mint-ui';
export default {
   data() {
       return {
           books:[],
           value:'',
           flag:false//是否查到内容
       }
   },
   methods: {
       search(){
          if(this.value){
             var  obj ={
               flag:3,
               value :this.value
           }
           Indicator.open({
       text: '加载中...',
        spinnerType: 'fading-circle'
        });
           getBooks(obj).then(res=>{
               this.books  =res
            
               Indicator.close()

           })
          }
       },
       back(){
           this.$router.go(-1)
       },
        book(id){
           this.$router.push({
               path:`/book/${id}`
           })

       }
   },
   
}
</script>
<style >
.header{
    position: relative;
}
.back{
    color: #fff;
    font-weight: bolder;
    text-align: center;
    z-index: 99;
    position: absolute;
    width: 50px;
    height: 50px;
    font-size: 20px;
    line-height: 50px;
    right: 0;top: 0;
    background-color: pink;
}
.mint-search{
        background-color: pink;
        height: 55px;
}
.mint-searchbar{
    background-color: pink;

}


  .categoryBook-book{
      
      display: flex;
      justify-content: space-around;
      border-top: 1px solid #ccc;
  }
  .categoryBook-img{
      position: relative;
      width: 30%;
  }
  .categoryBook-img img{
      width: 100%;
  }
  .categoryBook-test{
width: 60%;
  }
  .book-name{
      margin-top: 10px;
      font-size: 20px;
  }
  .book-author{
    margin: 10px 0;
       font-size: 12px;
       color: #666;
  }
  .book-active{
    
      background-color: red;
      color: #fff;
      font-size: 12px;
      line-height: 20px;
     border-radius: 3px;
     padding: 2px;
  }
  .price{
      padding: 3px;
  }
  .book-now-price{
      color: red;
      font-size: 22px;
  }
 .snull img{
     width: 100%;
 }


</style>