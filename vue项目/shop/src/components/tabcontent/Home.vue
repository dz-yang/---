<template>
<div>
     
            <!-- 头部:显示标题 -->
    <mt-header fixed title="购物街" class="header"></mt-header>  
       
    <div class="swipe">
<mt-swipe :auto="4000">
  <mt-swipe-item v-for="(item,index) in swipes" :key="index"> <img :src="item.img" alt="" srcset=""> </mt-swipe-item>
  
</mt-swipe>
    </div>
    <div class="nav">
        <recommend-view></recommend-view>
    </div>
    <div>
        <hot :title="'图书畅销榜'" :category="'hot'"/>
        <hot :title="'图书新书榜'" :category="'new'"/>
    </div>
</div>
</template>
<script>
import RecommendView from './home/RecommendView'
import Hot from './home/Hot'
import {getSwipes} from '../../network/swipe'
import { Indicator } from 'mint-ui';
export default {
    data() {
        return {
            swipes:null
        }
    },
    components:{
        RecommendView ,
        Hot
    },
    created() {
    Indicator.open({
  text: '加载中...',
  spinnerType: 'fading-circle'
});
      
        getSwipes().then(res=>{
            this.swipes = res
            Indicator.close();
        })
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
.mint-swipe{
       width: 100%;
    margin-top: 40px;
    height:200px;

}
.mint-swipe img{
    width: 100%;
    height: 100%;
}
div .mint-tabbar > .mint-tab-item.is-selected{
    background-color: pink;
}
.nav{
    width:100%;
}
</style>