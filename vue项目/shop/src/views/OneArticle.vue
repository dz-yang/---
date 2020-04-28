<template>
    <div>
               <div v-if="article">
                    <mt-header :title="article.title" fixed class="header"> 
                    <mt-button icon="back" slot="left" @click="back">返回</mt-button>
                    </mt-header>  
                    <div class="container">
                        <div class="card" style="width: 100%">
  <img :src="article.img" class="card-img-top" alt="...">
  <div class="card-body">
    <p class="card-text" v-html="article.article">

    </p>
  </div>
</div>
                        </div>  
                </div> 
 
    </div>
</template>
<script>
import {getArticle} from '../network/article'
export default {
    data() {
        return {
            id:'',
            article:''
        }
    },
    created() {
        this.id =this.$route.params.id
        getArticle({id:this.id,flag:2}).then(res=>{
            this.article = res[0]
            console.log(this.article);
            
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
.header{
    background-color: pink;
}
.container{
    margin-top: 45px;
    margin: 0;
    padding: 0;
}
.card-text{
    text-indent:2em;
}
</style>