<template>
  <div class="page-tabbar">
    <div class="page-wrap">
      <!-- <div class="page-title">Tabbar</div> -->
      <!-- <div>
        <mt-cell class="page-part" title="当前选中" :value="selected" />
      </div> -->
 
	<!-- tabcontainer -->
      <mt-tab-container class="page-tabbar-container" v-model="selected" >
        <mt-tab-container-item id="首页" v-if="selected =='首页'">
            <home/>
        </mt-tab-container-item>
        
        <mt-tab-container-item id="分类"  v-if="selected =='分类'">
            <category/>
        </mt-tab-container-item>

        <mt-tab-container-item id="精选文章" v-if="selected =='精选文章'">
       <my-article></my-article>
        </mt-tab-container-item>
        <mt-tab-container-item id="购物车"  v-if="selected =='购物车'">
         <cart/>
        </mt-tab-container-item>
        <mt-tab-container-item id="我的" v-if="selected =='我的'">
          <mypro/>
        </mt-tab-container-item>
      </mt-tab-container>
    </div>
 
    <mt-tabbar v-model="selected" fixed>
      <mt-tab-item id="首页">
        <img slot="icon" src="../assets/tabbar/home1.png" v-if="selected=='首页'">
        <img slot="icon" src="../assets/tabbar/home.png" v-else>

        首页
      </mt-tab-item>
      <mt-tab-item id="分类">
        <img slot="icon" src="../assets/tabbar/category1.png" v-if="selected=='分类'">
        <img slot="icon" src="../assets/tabbar/category.png" v-else>

        分类
      </mt-tab-item>
      <mt-tab-item id="精选文章">
        <img slot="icon" src="../assets/tabbar/article1.png" v-if="selected=='精选文章'">
        <img slot="icon" src="../assets/tabbar/article.png" v-else>
        精选文章
        
      </mt-tab-item>
       <mt-tab-item id="购物车">
        <img slot="icon" src="../assets/tabbar/cart1.png" v-if="selected=='购物车'">
        <img slot="icon" src="../assets/tabbar/cart.png" v-else>
        购物车
      </mt-tab-item>
      <mt-tab-item id="我的">
        <img slot="icon" src="../assets/tabbar/me1.png" v-if="selected=='我的'">
        <img slot="icon" src="../assets/tabbar/me.png" v-else>
        我的
      </mt-tab-item>
    </mt-tabbar>
  </div>
</template>
 
<script>
import Home from '../components/tabcontent/Home'
import Category from '../components/tabcontent/Category'
import Mypro from '../components/tabcontent/Mypro'
import Cart from '../components/tabcontent/Cart'

import MyArticle from '../components/tabcontent/MyArticle'
export default {
  // name: 'home',
  data() {
    return {
      selected: '首页'
    };
  },
  created() {
    if(this.$route.params.id == '购物车'){
      this.selected = '购物车'
    }
  },
  components:{
      Home,
      Category,
      Mypro,
      Cart,
      
      MyArticle
  }
};
</script>
 
<style>
.mint-tabbar.is-fixed{
  background-color: rgb(252, 236, 247);
  color: #111;
}
div  .mint-tabbar > .mint-tab-item.is-selected{
  background-color: pink;
  color: #d4237a;
  
}

.mint-tab-container{

  margin-bottom: 60px;
}
  /* .page-tabbar {
    overflow: hidden;
    height: 100vh;
  }
 
  .page-wrap {
    overflow: auto;
    height: 100%;
    padding-bottom: 100px;
  } */
</style>