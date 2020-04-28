<template>
    <div>
          <mt-header title="确认订单" class="header" fixed>
  <mt-button icon="back" slot="left" @click="back">返回</mt-button>
</mt-header>  
<div class="container">
    <!-- 地址 -->
    <div class="card" style="width: 100%">
      <ul class="list-group list-group-flush">
        <li class="list-group-item"><span>{{addr.name}}</span><span>{{addr.tel}}</span></li>
        <li class="list-group-item">{{addr.addr}}</li>
        <div class="b" >
            <svg class="bi bi-chevron-compact-right" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" d="M6.776 1.553a.5.5 0 0 1 .671.223l3 6a.5.5 0 0 1 0 .448l-3 6a.5.5 0 1 1-.894-.448L9.44 8 6.553 2.224a.5.5 0 0 1 .223-.671z" clip-rule="evenodd"/>
                </svg>
        </div>
        <div class="d">
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
                <li class="list-group-item" v-for="(item,index) in books" :key="index">
                    <div class="d-flex flex-row bd-highlight mb-2 ">
                      <div class="p-2 bd-highlight img"><img :src="item.imgs[0]" alt=""></div>
                      <div class="p-2 bd-highlight text">
                          <div class="d-flex flex-column bd-highlight mb-2 justify-content-between">
                              <div class="p-2 bd-highlight">{{item.name}}</div>
                              <div class="p-2 bd-highlight"><span style="color:red">￥{{item.new_price}}</span> <span class="float-right" style="color:#ccc">x{{$store.state.order.num[index]}}</span> </div>
                              
    
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
                      <div class="p-2 bd-highlight">￥{{total | priceFilter(2)}}</div>
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
                      <div class="p-2 bd-highlight" style="color:red">￥{{total | priceFilter(2)}}</div>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</div>
<div class="foo">
    <div class="float-left">
        <span>共{{numall}}件，合计：</span>
        <span style="color:red">￥{{total | priceFilter(2)}}</span>

    </div>
    <mt-button type="danger" class="float-right" @click="orderOk()">确定订单</mt-button>
</div>
    </div>
</template>
<script>
import {getBooks} from '../network/book'
import {getUser} from '../network/user'
import { Indicator } from 'mint-ui';
export default {
    data() {
        return {
            books:[],
            path:'',
        }
    },
     beforeRouteEnter(to, from, next) {
   next(vm=>{          //  这里的vm指的就是vue实例，可以用来当做this使用
      vm.path = from.name
    })
  },

    methods: {
        back(){
            this.$router.go(-1)
        },
        orderOk(){
            // 确定订单
            var books = [] 
            this.books.forEach((item,index)=>{
                //该书减少N本
               var obj={
                   bookImg:item.imgs[0],
                    bookId:item._id,
                    bookName:item.name,
                    bookNum:this.$store.state.order.num[index],
                    bookPrice:item.new_price,
                }
                Indicator.open({
       text: '加载中...',
        spinnerType: 'fading-circle'
        });
               getBooks({_id:obj.bookId,opt:'yes',num:obj.bookNum,flag:5}).then(res=>{
                    Indicator.close()
               })
                books[index] =obj
            })
           var  total = this.total
           var num = this.numall
           var user= this.$store.state.user
           var userId= user._id
         var   order = {
                
                books:books,
                userId:userId,
                total:total,
                num:num,
                state:0,
                addr:this.addr,
                orderId:new Date().getTime()
            } 
            
     
         
            
            
            if(this.path=='Home'){
                this.books.forEach((item,index)=>{
             var i =  user.cart.findIndex(item1=>{
                    return item1._id ==item.bookId
                })
                user.cart.splice(i,1) 
            })
            }
            
            
           
            
            this.$store.commit('changeUser',user)
            this.$store.commit('changeOrderOk',order)
            this.$store.commit('changeOrder',null)

            
            var obj1 = {
                _id:this.$store.state.user._id,
                flag :8,//修改购物车
                cart:JSON.stringify(this.$store.state.user.cart)
            }
            getUser(obj1).then(ret=>{
                if(ret.code_error =='0'){            
                    this.$store.commit('changeUser',ret.user)
                }
            })
            this.$router.push({
                path:`/pay`
            })
       
            
        }
    },
    computed: {
        addr(){
            var index1 = this.$store.state.order.addrIndex
            return this.$store.state.user.addrs.find((item,index)=>{
                return index == index1
            })       
        },
        total(){
              return this.books.reduce((p,c,i)=>{
           return  p = parseFloat(c.new_price)*this.$store.state.order.num[i] +p
        },0)
        },
        numall(){
           return  this.$store.state.order.num.reduce((p,c,i)=>{
               return p = parseInt(c)+p
            },0)
        }
    },
    created() {


                    for(let i=0;i<this.$store.state.order.books.length;i++){
                          var obj = {
                        flag :4,
                        _id :this.$store.state.order.books[i]
                    }
                    getBooks(obj).then(res=>{
                        this.books.push(res)
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
    position: relative
}
.card .list-group-item{
    padding-left: 50px;
}
.b{
    position: absolute;
    right: 10px;
    top: 3px;
    z-index: 9;
    font-size: 30px;
}
.d{
    color: red;
    position: absolute;
    left: 10px;
    top: 2px;
    z-index: 9;
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
    line-height: 40px;
    width: 100%;
    background-color: pink;
    border-top: 1px solid #ccc;
}
</style>