<template>
    <div class="hot">
<div class="hot-title">
    {{title}}
    <span href="" @click="getBookList(category,title)">查看更多></span> </div>
<div class="hot-book">
   <div v-for="(book) in books" :key='book.id' class="hot-top-book" @click="bookd(book._id)" >
       <img :src="book.imgs[0]" alt="" >
        <div class="hot-book-title"><span>{{book.name}}</span> <br>
        <div class="title">{{book.title}}</div>
        <br><span style="color:red">￥{{book.new_price}}</span><br></div>
        </div>
    
    
</div>
    </div >
</template>
<script>
import {getBooks} from '../../../network/book'
import { Indicator } from 'mint-ui';
export default {
    data() {
    return {
       books:[]
     
   };
   
},
props:{
       category:{
           type:String,
           required:true,
       },
       title:{
           type:String,
           required:true,
       }
       
   },
methods: {
        bookd(id){
           this.$router.push({
               path:`/book/${id}`
           })

       },
         getBookList(category,title){
             this.$router.push({
          path: `/booklist/${category}/${title}`,
        })
        }
          
},
created() {
    var obj={
        flag:1,
        category:this.category,
        limit:6
    }
       Indicator.open({
  text: '加载中...',
  spinnerType: 'fading-circle'
});
    getBooks(obj).then(res=>{
        this.books = res
        Indicator.close();
    })
    
},

}
</script>
<style scoped>
.hot{
     background-color: #ddd;
}
    .hot-title{
        text-align: center;
        padding: 20px;
        position: relative;
       
    }
    .hot-title span{
position: absolute;
right: 10px;
bottom: 0;
color: rgb(84, 151, 238);
    }
    .hot-book{
        background-color:  rgb(252, 236, 247);
        display: flex;
           flex-flow: row wrap;
     align-content: flex-start;
     justify-content: space-around
    
    }
    .hot-top-book{
     
        background-color: #fff;
  
        width: 100%;
        flex: 0 0 47%;
        margin-top: 10px;
    }
    .hot-top-book img{
        width: 100%;
    }
    .hot-book-title{
   display: flex;
        flex-direction: column;
        justify-content: space-around;
     
    }
    .title{
       display: box;
       display: -webkit-box;
       -webkit-line-clamp:2;
       -webkit-box-orient: vertical;
       overflow: hidden;
       text-overflow: ellipsis;
       font-size: 10px;
       color: #ccc;
    }
</style>