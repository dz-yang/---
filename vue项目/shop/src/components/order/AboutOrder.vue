<template>
    <div>
        <div class="dimg" v-if="orders.length<=0">
            <img src="../../assets/order/order.jpg" alt="">
            <div class="dmsg">
                没有相关的信息
            </div>
        </div>
<div class="card" style="width: 100%;" v-for="(item,index) in orders" :key="index" v-else @click="look(item.orderId)">
  <ul class="list-group list-group-flush">
    <li class="list-group-item"><span class="float-left orderId">订单号：{{item.orderId}}</span>
    <span class="float-right msg" v-if="item.state ==0">待付款</span>
    <span class="float-right msg" v-if="item.state ==1">待发货</span>
    <span class="float-right msg" v-if="item.state ==2">待收货</span>
    <span class="float-right msg" v-if="item.state ==3">交易成功</span>
    <span class="float-right msg" v-if="item.state ==4">完成</span>
    </li>
    <li class="list-group-item">
<div class="d-flex flex-row bd-highlight mb-2 " v-for="(item1,index1) in item.books" :key="index1" @click="look(item.orderId)">
  <div class="p-2 bd-highlight img"><img :src="item1.bookImg" alt=""></div>
  <div class="p-2 bd-highlight text" >
      <div class="d-flex flex-column bd-highlight mb-2 justify-content-between">
  <div class="p-2 bd-highlight" style="fontSize:14px">{{item1.bookName}}</div>
  <div class="p-2 bd-highlight">
      <div class="d-flex flex-row bd-highlight mb-2 justify-content-between">
      <div class="p-2 bd-highlight" style="color:red" >￥{{item1.bookPrice | priceFilter(2)}}</div>
      <div class="p-2 bd-highlight">x{{item1.bookNum}}</div>
      </div>
      </div>
  
</div>
  </div>
  
</div>
    </li>
   <li class="list-group-item">
       <div class="float-left num">
           共{{item.num}}件商品
       </div>
       <div class="float-right">
           <span class="num">实付款：</span>
           <span>￥{{item.total|priceFilter}}</span>
       </div>
   </li>
   <li class="list-group-item" v-if="item.state == '0'">
       <div class="float-right">
           <mt-button type="default" @click="cansel(item,index)">取消支付</mt-button>
           <mt-button type="danger" @click="pay(item,index)">支付</mt-button>
       </div>
   </li>
    <li class="list-group-item" v-if="item.state == '1'">
       <div class="float-right">
            <mt-button type="danger" @click='moni(item)' title="模拟后台发货!">会尽快处理您的订单！</mt-button>
          
       </div>
   </li>
   <li class="list-group-item" v-if="item.state == '4'">
       <div class="float-right">
          完成
       </div>
   </li>
    <li class="list-group-item" v-if="item.state == '2'">
       <div class="float-right">
          <mt-button type="danger" @click='orderOk(item)'>确定收货</mt-button>
       </div>
   </li>
   <li class="list-group-item" v-if="item.state == '3'">
       <div class="float-right">
          <mt-button type="danger" @click.stop="comment(item)">去评论</mt-button>
       </div>
   </li>
  </ul>
</div>       
    </div>
</template>
<script>
import {getOrder} from '../../network/order'
import {getBooks} from '../../network/book'
import { Indicator } from 'mint-ui';

export default {
    data() {
        return {
            orders:[],
            
        }
    },
    props:{
        state:{
            type:String
        },
        mykey:{
            type:String,
            default:'',
        }
    },
    computed: {
      
        user(){
            return this.$store.state.user
        }
    },
    watch: {
        state(newVal){
            Indicator.open({
       text: '加载中...',
        spinnerType: 'fading-circle'
        })
            getOrder({userId:this.user._id,flag:1,state:this.state}).then(res=>{
                this.orders = res
                Indicator.close()
        })
        },
        mykey(newVal){
            console.log(newVal);
            
            if(newVal !='') {
                Indicator.open({
       text: '加载中...',
        spinnerType: 'fading-circle'
        })
            getOrder({userId:this.user._id,flag:1,state:this.state}).then(res=>{
            this.orders = res
                       Indicator.close()
            
             this.orders =  this.orders.filter(item=>{
                  return item.orderId.includes(newVal)
               })
               
           
             })
           }
            
        }
    },
    created() {
            Indicator.open({
       text: '加载中...',
        spinnerType: 'fading-circle'
        })
        getOrder({userId:this.user._id,flag:1,state:this.state}).then(res=>{
            this.orders = res
            Indicator.close()
             })
        
    },
    methods: {
        look(id){
            this.$router.push({
                path:`/detailorder/${id}`
            })
        },
        cansel(item,index){
            this.$messagebox({
                title: '提示信息',
                message: '是否取消订单',
                showCancelButton: true,
                 confirmButtonText:"确定",
                  cancelButtonText:"取消"
                }).then(action => {
                    if(action == 'confirm'){   
                        Indicator.open({
       text: '加载中...',
        spinnerType: 'fading-circle'
        }) 
                 item.books.forEach(obj=>{
                     getBooks({_id:obj.bookId,opt:'no',num:obj.bookNum,flag:5}) 
                 })
                getOrder({userId:this.user._id,flag:2,orderId:item.orderId}).then(res=>{
                   this.orders.splice(index,1)
                   Indicator.close()
                    })
                         
                        }else{
                            
                }
            })

        },
        pay(item,index){
           this.$router.push({
               path:`/pay1/${item.total}/${item.orderId}`
           })
        },
        orderOk(item){
            this.$emit('fun','3')
            Indicator.open({
       text: '加载中...',
        spinnerType: 'fading-circle'
        })
             getOrder({orderId:item.orderId,flag:3,state:3}).then(res=>{
                             Indicator.close()
        
                       })
                       
        },
        moni(item){
            // 模拟后台发货
               this.$emit('fun','2')
            Indicator.open({
       text: '加载中...',
        spinnerType: 'fading-circle'
        })
             getOrder({orderId:item.orderId,flag:3,state:2}).then(res=>{
                             Indicator.close()
        
                       })
                       
        
        },
        comment(item){
           this.$router.push({
               path:`/writecomment/${item.orderId}`
           })
        }

    },
  
}
</script>
<style scoped>
.card .orderId{
    font-size: 12px;
   
}
.card .msg{
    color: rgb(240, 155, 18);
}
.bd-highlight .img{
    width: 30%;
}
.bd-highlight .text{
    width: 70%;
}
.bd-highlight .img img{
    width: 100%;
}
.num{
    font-size: 12px;
    color: rgb(119, 117, 117);
}
.dimg img{
    width: 100%;
}
.dmsg{
    text-align: center;
    color: rgb(48, 112, 230);
}
</style>