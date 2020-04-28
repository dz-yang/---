<template>
    <div class="recommend">
       <div class="box"><a  @click="getBookList('hot','图书畅销榜')"><div class="pic">hot</div><div class="text">畅销榜</div></a></div>
       <div class="box"><a  @click="getBookList('new','图书新书榜')"><div class="pic">new</div><div class="text">新书榜</div></a></div>
       <div class="box"><a  @click="getBookList('cut','图书秒杀榜')"><div class="pic">cut</div><div class="text">秒杀榜</div></a></div>
       <div class="box"><a  @click="getBookList('sales','图书促销榜')"><div class="pic">sales</div><div class="text">促销榜</div></a></div>
    </div>
</template>
<script>
export default {
    name:'RecommendView',
    props:{
        recommends:{
    
            default(){
                return []
            }
        }
    },
    methods: {
        getBookList(category,title){
             this.$router.push({
          path: `/booklist/${category}/${title}`,
        })
        }
    },
}
</script>
<style scoped>
a{
    text-decoration: none;
}
    .recommend{
        width: 100%;
        display: flex;
        justify-content: space-around;
    }
    .box{
        display: flex;
        flex-direction: column;
        justify-content: center;
        width: 100%;
        padding: 20px 0;
            background-color: rgb(252, 236, 247);
   
    box-shadow: 0 -2px 1px rgba(100,100,100,.1);
    }
    .pic{
        background-color: #f1c7cd;
        width: 80px;
        height: 80px;
        border-radius: 50%;
        line-height: 80px;
        text-align: center;
        color: rgb(252, 236, 247);
        font-size: 28px;
        font-weight: bold;
        
    }
    .text{
        padding: 15px;
        color: black;
        /* text-align: center; */
    
    }
</style>