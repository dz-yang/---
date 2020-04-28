<template>
    <div>
        <mt-header title="评论中心" class="header" fixed>
            <mt-button icon="back" slot="left" @click="back">返回</mt-button>
        </mt-header> 
        <div class="container">
<mt-navbar class="page-part" v-model="selected">
  <mt-tab-item id="0">待评论</mt-tab-item>
  <mt-tab-item id="1">已评论</mt-tab-item>
</mt-navbar>

<!-- tab-container -->
<mt-tab-container v-model="selected">
  <mt-tab-container-item id="0">
     <about-order :state="'3'"/>
  </mt-tab-container-item>
  <mt-tab-container-item id="1">
     <about-order :state="'4'"/>
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
            selected:0
        }
    },
    components:{
        AboutOrder
    },
    created() {
        this.selected = this.$route.params.id
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
    margin: 0;
    padding: 0;
    margin-top: 45px;

}

</style>