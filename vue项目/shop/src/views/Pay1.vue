<template>
    <div>
        <mt-header title="支付" class="header" fixed>
  <mt-button icon="back" slot="left" @click="back">返回</mt-button>
</mt-header>  
<div class="container">
    <div class="card" style="width: 100%">
      <ul class="list-group list-group-flush">
        <li class="list-group-item">
            <div class="d-flex flex-row bd-highlight mb-2 justify-content-between">
              <div class="p-2 bd-highlight">应付金额</div>
              <div class="p-2 bd-highlight" style="color:red">￥{{total |priceFilter}}</div>
            </div>
        </li>
        
        <li class="list-group-item">
            <div class="d-flex flex-row bd-highlight mb-2 justify-content-between">
              <div class="p-2 bd-highlight">订单号</div>
              <div class="p-2 bd-highlight">{{orderId}}</div>
            </div>
        </li>
        
      </ul>
</div>
<div class="card" style="width: 100%">
  <div class="card-header">
    选择支付方式
  </div>
  <ul class="list-group list-group-flush">
    <li class="list-group-item" @click="pay()"> <img src="../assets/pay/zhifubao.jpg" alt=""> 支付宝支付</li>
    <li class="list-group-item" @click="pay()"><img src="../assets/pay/weixin.jpg" alt=""> 微信支付</li>
    
  </ul>
</div>
</div> 
    </div>
</template>
<script>
import {getOrder} from '../network/order'
import { Indicator } from 'mint-ui';
export default {
    data() {
        return {
            total:'',
            orderId:''
        }
    },
    created() {
       this.total = this.$route.params.total
       this.orderId = this.$route.params.bookId
        
    },
    methods: {
        back(){
            this.$router.push({
                path:`/myorder/0`
            })
        },
        pay(){
            this.$messagebox({
                title: '付款',
                message: parseFloat(this.total).toFixed(2),
                showCancelButton: true,
                 confirmButtonText:"确定支付",
                  cancelButtonText:"取消支付"
                }).then(action => {
                    if(action == 'confirm'){   
                        Indicator.open({
       text: '加载中...',
        spinnerType: 'fading-circle'
        }); 
                        getOrder({orderId:this.orderId,flag:3,state:1}).then(res=>{
                            Indicator.close()
                             this.$router.push({
                                  path:`/myorder/1`
                                       })
        
                       })
                        }else{
                      this.$router.push({
                                  path:`/myorder/0`
                                       })         
                }
            })    
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
    margin-bottom: 45px;
}
.list-group-item img{
    width: 30px;
}
</style>