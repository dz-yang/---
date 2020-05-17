<template>
    <div>
        <mt-header title="订单详情" class="header" fixed>
        <mt-button icon="back" slot="left" @click="back">返回</mt-button>
    </mt-header>  
        <div class="container" v-if="order">

<div class="card" style="width: 100%;">
  <ul class="list-group list-group-flush"> 
      <li class="list-group-item"><span class="float-left orderId">订单号：{{order.orderId}}</span>
    <span class="float-right msg" v-if="order.state ==0">待付款</span>
    <span class="float-right msg" v-if="order.state ==1">待发货</span>
    <span class="float-right msg" v-if="order.state ==2">待收货</span>
    <span class="float-right msg" v-if="order.state ==3">交易成功</span>
    </li>
      <li class="list-group-item item"><span>{{order.addr.name}}</span><span>{{order.addr.tel}}</span></li> 
      <li class="list-group-item item">{{order.addr.addr}}</li>
      <div class="b" >
           <svg class="bi bi-geo-alt" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" clip-rule="evenodd"/>
            </svg>
        </div>
  </ul>
</div>

<div class="bookcontainer">
        <div class="card" style="width: 100%;">
            <div class="card-header">
                谢谢您的购买！
            </div>
            <ul class="list-group list-group-flush">
                <li class="list-group-item" v-for="(item,index) in order.books" :key="index">
                    <div class="d-flex flex-row bd-highlight mb-2 ">
                      <div class="p-2 bd-highlight img"><img :src="item.bookImg" alt=""></div>
                      <div class="p-2 bd-highlight text">
                          <div class="d-flex flex-column bd-highlight mb-2 justify-content-between">
                              <div class="p-2 bd-highlight">{{item.bookName}}</div>
                              <div class="p-2 bd-highlight"><span style="color:red">￥{{item.bookPrice}}</span> <span class="float-right" style="color:#ccc">x{{item.bookNum}}</span> </div>
                              
    
                            </div>
                      </div>
                      
                    </div>
                </li>
                 <div class="card-header">
                </div>
                <li class="list-group-item">
                    <div class="d-flex flex-row bd-highlight mb-2 justify-content-between">
                      <div class="p-2 bd-highlight">运费</div>
                      <div class="p-2 bd-highlight">快递￥0.00</div>
                    </div>
                </li>
                 <li class="list-group-item">
                    <div class="d-flex flex-row bd-highlight mb-2 justify-content-between">
                      <div class="p-2 bd-highlight">优惠券</div>
                      <div class="p-2 bd-highlight">快递￥0.00</div>
                    </div>
                </li>
                <div class="card-header">
                </div>
                <li class="list-group-item">
                    <div class="d-flex flex-row bd-highlight mb-2 justify-content-between">
                      <div class="p-2 bd-highlight">商品总价</div>
                      <div class="p-2 bd-highlight">￥{{order.total | priceFilter(2)}}</div>
                    </div>
                </li>
                <li class="list-group-item">
                    <div class="d-flex flex-row bd-highlight mb-2 justify-content-between">
                      <div class="p-2 bd-highlight">运费</div>
                      <div class="p-2 bd-highlight">￥0.00</div>
                    </div>
                </li>
                <li class="list-group-item">
                    <div class="d-flex flex-row bd-highlight mb-2 justify-content-between">
                      <div class="p-2 bd-highlight">订单总价</div>
                      <div class="p-2 bd-highlight" style="color:red">￥{{order.total | priceFilter(2)}}</div>
                    </div>
                </li>
                
            </ul>
        </div>
    </div>

        
<div class="foo">
  <div v-if="order.state == '0'">
       <div class="float-right">
           <mt-button type="default" @click="cansel()">取消支付</mt-button>
           <mt-button type="danger" @click="pay()">支付</mt-button>
       </div>
   </div>
    <div v-if="order.state == '1'">
       <div class="float-right" style="color:red;fontSize:20px">
          会尽快处理您的订单！
       </div>
   </div>
    <div v-if="order.state == '2'">
       <div class="float-right">
          <mt-button type="danger" @click="orderOk">确定收货</mt-button>
       </div>
   </div>
   <div v-if="order.state == '3'">
       <div class="float-right">
          <mt-button type="danger" @click='goComment'>去评论</mt-button>
       </div>
   </div>
   <div v-if="order.state == '4'">
       <div class="float-right" style="color:red;fontSize:20px; marginRight:20px">
          已完成！
       </div>
   </div>
</div>
</div>
    </div>
</template>
<script>
import {getOrder} from '../network/order'
import {getBooks} from '../network/book'
import { Indicator } from 'mint-ui';


export default {
    data() {
        return {
            order:null
        }
    },
    created() {
        var _id = this.$route.params.id
        Indicator.open({
       text: '加载中...',
        spinnerType: 'fading-circle'
        });
        getOrder({flag:4,orderId:_id}).then(res=>{
            this.order = res
            Indicator.close()
        })
    },
    methods: {
        back(){
            this.$router.go(-1)
        },
         cansel(){
         
            this.$messagebox({
                title: '提示信息',
                message: '是否取消订单',
                showCancelButton: true,
                 confirmButtonText:"确定",
                  cancelButtonText:"取消"
                }).then(action => {
                    if(action == 'confirm'){   
                         
                 this.order.books.forEach(obj=>{
                            Indicator.open({
                        text: '加载中...',
                        spinnerType: 'fading-circle'
                        });
            
                     getBooks({_id:obj.bookId,opt:'no',num:obj.bookNum,flag:5}).then(res=>{
                         
                     })
                 })
                getOrder({userId:this.$store.state.user._id,flag:2,orderId:this.order.orderId}).then(res=>{
                        Indicator.close()
                    this.$router.push({
                        path:`/myorder/-1`
                    })
                    })
                         
                        }else{
                            
                }
            })

        },
        pay(){
           this.$router.push({
               path:`/pay1/${this.order.total}/${this.order.orderId}`
           })
        },
         orderOk(){
           
             getOrder({orderId:this.order.orderId,flag:3,state:3}).then(res=>{
                 this.$router.push({
                     path:`/myorder/4`
                 })
                       })
                       
        },
        goComment(){
             this.$router.push({
               path:`/writecomment/${this.order.orderId}`
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
.card{
    position: relative;
}
.card .item{
    padding-left: 50px;
}
.b{
     color: red;
    position: absolute;
    left: 10px;
    top: 50px;
    z-index: 10;
    font-size: 30px;
}
.img{
    width: 30%;
    
}
.img img{
    width: 100%;
    
}
.text{
    width: 80%;
}
.foo{
    position: fixed;
    bottom:0px;
    height: 50px;
 line-height: 40px;
    width: 100%;
   background-color: rgb(250, 214, 216);
    /* border-top: 1px solid #ccc; */
}
.card .orderId{
    font-size: 14px;
   
}
.card .msg{
    color: rgb(240, 155, 18);
}
</style>