<template>
    <div>
         <mt-header title="购物车" fixed class="header">
              <mt-button  style="color:black" slot="right" @click="edit" v-if="flag">编辑</mt-button>
              <mt-button  style="color:black" slot="right" @click="edit" v-else>取消</mt-button>
</mt-header> 
       <div class="kong" v-if="!user">
           您还没登录呢~  
           <router-link to='/login'><mt-button type="primary">去登录</mt-button></router-link>
             <router-link to='/register'><mt-button type="danger">去注册</mt-button></router-link>
       </div>
       <div class="div container" v-else>

           <div class="nhas" v-if="this.user.cart.length<=0">
               <img src="../../assets/cart/cart.jpg" alt="" srcset="">
           </div>
      

<div v-else>
    <div class="card" style="width: 100%" v-if="books.length == user.cart.length" >
  <ul class="list-group list-group-flush">
      <li class="list-group-item" > 
                <!-- 全选 -->
        <div class="d-flex flex-row bd-highlight mb-2">
          <div class="p-2 bd-highlight">
              <input type="checkbox"  id="all" @click="checkAll" v-model="checkall">
          </div>
          <div class="p-2 bd-highlight">谢谢您的购买！</div>
          
        </div>
      </li>
    <li class="list-group-item" v-for="(item,index) in this.user.cart" :key="item.bookId"> 
            <div class="d-flex flex-row bd-highlight mb-3">
              <div class="p-2 bd-highlight">
                  <input type="checkbox"  v-model="checked" :value="item.bookId">
              </div>
              <div class="p-2 bd-highlight bookimg ">
                  <!-- 图片 -->
                  <img :src="books[index].imgs[0]" alt="" srcset="" class="">
              </div>
              <div class="p-2 bd-highlight justify-content-between">
                  <div class="d-flex flex-column bd-highlight mb-3">
                      <div class="p-2 bd-highlight" >{{books[index].name}}</div>
                      <div class="p-2 bd-highlight">库存：{{books[index].num}}件</div>
                      <div class="p-2 bd-highlight">
                          <div class="d-flex flex-row bd-highlight mb-2  justify-content-between" >
                          <div class="p-2 bd-highlight" style="color:red">￥{{books[index].new_price | priceFilter(2)}}</div>
                          
                          <div class=" bd-highlight">
                              <number :num='parseInt(books[index].num)' :n1='item.num>books[index].num ? books[index].num:item.num' :bookId='item.bookId' ></number>
                          </div>
                        
                        </div>
                      </div>
                    </div>
              </div>
            </div>
    </li>
  </ul>
  <div class="foo">
           <div class="d-flex flex-row bd-highlight mb-2 justify-content-between" >
               <div class="p-2 bd-highlight">
              <input type="checkbox"  id="all" @click="checkAll" v-model="checkall">全选
          </div>
                <div class="p-2 bd-highlight " v-if="flag">
                    合计：<span class="tot"> ￥{{total |priceFilter(2)}}</span>
                    <mt-button type="danger" @click="pay()">去结算</mt-button>
                </div>
                <div v-else>
                      <mt-button type="danger" @click="del">删除</mt-button>
                </div>
           </div>
       </div>
</div>
</div>
                
        
       </div>
    </div>
</template>
<script>
import {getBooks} from '../../network/book'
import {getUser} from '../../network/user'
import Number from '../number/Number.vue'
import { Indicator } from 'mint-ui';
import { Toast } from 'mint-ui';
export default {
      components:{
        Number,
    },
    data() {
        return {
         
            books:[],
           checkall:false,
           checked:[],
           flag:true
           
        }
    },
    computed: {
        user(){
            return this.$store.state.user
        },
    total(){
        return this.books.reduce((p,c,i)=>{
           return  p = parseFloat(c.new_price)*this.$store.state.user.cart[i].num +p
        },0)
    }
    },
  
       created() {  
            if(this.user){
                
                
                if(this.user.cart){
                     this.user.cart.forEach(item=>{
                    var obj = {
                        flag :4,
                        _id :item.bookId
                    }
                    Indicator.open({
       text: '加载中...',
        spinnerType: 'fading-circle'
        })
                    getBooks(obj).then(res=>{
                        this.books.push(res)
                        Indicator.close()
                    })
                })
                }
               
            }
        },
        methods: {
            checkAll(){
                if(!this.checkall){
                    this.user.cart.forEach(item=>{
                        this.checked.push(item.bookId)
                    })
                   
                }else{
                    this.checked = []
                    //  console.log(this.checked);
                }
            },
            edit(){
                this.flag = this.flag ?false:true
                 this.checked = []
                 this.checkall = false
                    
            },
            del(){
                  
              if(this.checked.length<=0){
                 Toast({
                     message: '请选择商品！',
                    position: 'middle',
                        duration: 2000
                        });
              }else{
                    var user = this.user
                for(let i =0; i<=this.checked.length;i++){
                     this.books.forEach((item,index)=>{
                        if(this.checked[i] ==item._id){
                            this.books.splice(index,1)
                            return
                        }
                    })
                    user.cart.forEach((item,index)=>{
                        if(this.checked[i] ==item.bookId){
                            this.user.cart.splice(index,1)
                            return
                        }
                    })
                   
                }
                if(this.checked){
                    
                            this.$messagebox({
                                title: '提示信息',
                                message:'删除成功',
                                showCancelButton: true,
                                 confirmButtonText:"完成",
                                 
                                })
                }
               
                
                this.$store.commit('changeUser',user)
              
               
                    
              }
                
               
                

                
            },
            pay(){
              
                if(this.checked.length<=0){
                  Toast({
                     message: '请选择商品！',
                    position: 'middle',
                        duration: 2000
                        });
                  return 
              }
               var addrIndex = this.user.addrs.findIndex(item=>{
                    return item.flag == 'true' || item.flag == true
                })
                var numall=[]
                this.checked.forEach(item=>{
                     var num = this.$store.state.user.cart.find((item1)=>{
                            return item ==item1.bookId
                 }).num 
                 numall.push(num)    
                })
               
                var order = {
                    addrIndex:addrIndex,
                    books:this.checked,
                    num:numall
                }
                
                
                this.$store.commit('changeOrder',order)
                
                
                if(this.$store.state.order){
                      this.$router.push({
                    path:`/order`
                })
                }
              
    
                
                
            }
        },
        destroyed() { 
           if(this.user){
              
               
               if(this.user.cart){
                var obj = {
                _id:this.$store.state.user._id,
                flag :8,//修改购物车
                cart:JSON.stringify(this.$store.state.user.cart)
            }
            getUser(obj).then(ret=>{
                if(ret.code_error =='0'){            
                    this.$store.commit('changeUser',ret.user)
                }
            })
           }
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
    margin-top: 45px;
     
    padding: 0;
}
.nhas img{
    margin-top: 100px;
    width: 100%;
}
.bookimg{
    width: 20%;
}
.bookimg img{
    width: 100%;
}
.foo{
    position: fixed;
    bottom:50px;

    width: 100%;
    background-color: #fff;
    border-top: 1px solid #ccc;
}
.tot{
    color: red;
    margin-right: 20px;

}
.kong{
    margin-top: 150px;
    text-align: center;
}
</style>