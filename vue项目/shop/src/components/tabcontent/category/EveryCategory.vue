<template>
    <div>
 
       <div class="categoryBook-container" >
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
import {getBooks} from '../../../network/book'
import { Indicator } from 'mint-ui';
export default {
    data() {
        return {
            books:[]
        }
    },
    props:{
        category:{
            type:String,
            required:true
        }
    },
    created() {
        var flag =2
        var category=this.category
        var obj = {flag:flag,category:category}
        Indicator.open({
       text: '加载中...',
        spinnerType: 'fading-circle'
        })
        getBooks(obj).then(res=>{
            this.books=res
            Indicator.close()
            
        })
    },
    methods: {
           book(id){
           this.$router.push({
               path:`/book/${id}`
           })

       }
    },
}
</script>
<style scoped>

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
  .number{
      position: absolute;
      background-color: red;
      color: #fff;
      font-size: 12px;
      width: 20px;
      height: 20px;
      top: 0;
      left: 0;
      text-align: center;
      line-height: 20px;
      border-radius: 2px;
  }
 
</style>