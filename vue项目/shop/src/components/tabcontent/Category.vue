<template>
    <div>
       <header>
           <mt-header fixed title="分类" class="header">
                  <router-link to="/search" slot="right">
		    <mt-button icon="search" ></mt-button>
    </router-link>
               </mt-header>  
       </header>
       <div class="container">
         <mt-navbar class="page-part" v-model="selected">
  <mt-tab-item id="hot">热销</mt-tab-item>
  <mt-tab-item id="new">新书</mt-tab-item>
  <mt-tab-item id="3">儿童图书</mt-tab-item>
  <mt-tab-item id="4">科学技术</mt-tab-item>
  <mt-tab-item id="5">教育考试</mt-tab-item>
  <mt-tab-item id="6">人文社会</mt-tab-item>
  <mt-tab-item id="7">文学艺术</mt-tab-item>
</mt-navbar>

<!-- tab-container -->
<mt-tab-container v-model="selected">
  <mt-tab-container-item id="hot">
    <every-category :category="selected"  v-if="selected == 'hot'"></every-category>
  </mt-tab-container-item>
  <mt-tab-container-item id="new">
    <every-category :category="selected"  v-if="selected == 'new'"></every-category>
  </mt-tab-container-item>
  <mt-tab-container-item id="3" >
    
  </mt-tab-container-item>
</mt-tab-container>
       </div>
    </div>
</template>
<script>
import EveryCategory from  './category/EveryCategory'

export default {
    components:{
        EveryCategory
    },
    data() {
        return {
            selected:'hot'
        }
    },
}
</script>
<style scoped>

.header{
    background-color: pink;
}
.container{
    margin-top: 50px;
}
.nav{
    white-space: nowrap;
    overflow: hidden;
}
.mint-navbar{
    display: block;
    white-space: nowrap;
    overflow: auto;
}
.mint-navbar .mint-tab-item{
    display: inline-block;
    width: 100px;
}
.mint-navbar .mint-tab-item.is-selected{
        border-bottom:5px solid #26a2ff;
    color: #26a2ff;
    margin-bottom: -3px;
}
</style>