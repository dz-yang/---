<template>
    <div>
        <mt-header title="精选文章" fixed class="header">   
</mt-header> 
      <div class="container">
            <div class="card" style="width: 100%" v-for="(item,index) in article" :key="index" @click="look(item._id)">
                <img :src="item.img" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">{{item.title}}</h5>
                    
  </div>
</div>
      </div>
    </div>
</template>
<script>
import {getArticle} from '../../network/article'
export default {
    data() {
        return {
            article:[]
        }
        
    },
    created() { 
            getArticle({flag:1}).then(res=>{
                this.article = res
                console.log(this.article);
                
            })
        },
        methods: {
            look(id){
                this.$router.push({
                    path:`onearticle/${id}`
                })
            }
        },
}
</script>
<style scoped>
.art{ text-indent:2em;} 
.header{
    background-color: pink;
}
.container{
    margin-top: 45px;
    margin: 0;
    padding: 0;
}
.card-title{
    color:rgb(233, 36, 69);
}
</style>
