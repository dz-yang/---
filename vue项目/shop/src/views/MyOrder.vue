<template>
    <div>
        <mt-header title="我的订单" fixed class="header" >
            <router-link to="/" slot="left">
		        <mt-button icon="back">返回</mt-button>
            </router-link>
            <router-link to="/searchorder" slot="right">
		        <mt-button icon="search" ></mt-button>
            </router-link>
        </mt-header>

        <div class="container">
<mt-navbar class="page-part" v-model="selected">
  <mt-tab-item id="-1">全部</mt-tab-item>
  <mt-tab-item id="0">待付款</mt-tab-item>
  <mt-tab-item id="1">待发货</mt-tab-item>
  <mt-tab-item id="2">待收货</mt-tab-item>
  <mt-tab-item id="3">已完成</mt-tab-item>
</mt-navbar>

<!-- tab-container -->
<mt-tab-container v-model="selected">
  <mt-tab-container-item id="-1" v-if="selected == -1">
    <about-order :state="selected" @fun='change'/>
  </mt-tab-container-item>
  <mt-tab-container-item id="0" v-if="selected == 0">
    <about-order :state="selected" :fun='change'/>
    
  </mt-tab-container-item>
  <mt-tab-container-item id="1" v-if="selected == 1">
   <about-order :state="selected" @fun='change'/>
  </mt-tab-container-item>
  <mt-tab-container-item id="2" v-if="selected == 2">
   <about-order :state="selected" @fun='change'/>
  </mt-tab-container-item>
  <mt-tab-container-item id="3" v-if="selected == 3">
    <about-order :state="selected" @fun='change'/>
  </mt-tab-container-item>
</mt-tab-container>
        </div>
    </div>
</template>
<script>
  import AboutOrder from '../components/order/AboutOrder'

export default {
  
    data() {
        return {
            selected:'0',
        }
    },
    components:{
        AboutOrder
    },
    created() {
      this.selected = this.$route.params.selected
    },
    methods: {
      change(a){
        this.selected = a
      
        
      }
    },
}
</script>
<style scoped>

.header{
    background-color: pink;
}
.container{
    margin: 0;
    padding: 0;
    margin-top: 45px;
 
}

</style>