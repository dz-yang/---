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
       <div class="order-container"  >
               <about-order :state="'-1'" :mykey ='value'></about-order>
           </div>
    </div>
</template>
<script>
import {getOrder} from '../network/order'
import AboutOrder from '../components/order/AboutOrder'
export default {
   data() {
       return {
           orders:[],
           value:'',
           flag:false//是否查到内容
       }
   },
   components:{
       AboutOrder
   },
   methods: {
       search(){
       
       },
       back(){
           this.$router.go(-1)
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


  .order-book{
      
      display: flex;
      justify-content: space-around;
      border-top: 1px solid #ccc;
  }
  .order-img{
      position: relative;
      width: 30%;
  }
  .order-img img{
      width: 100%;
  }
  .order-test{
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