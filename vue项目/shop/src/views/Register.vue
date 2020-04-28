<template>
    <div>
     <mt-header title="注册" fixed class="header">
  <router-link to="/" slot="left">
    <mt-button icon="back">back</mt-button>
  </router-link>
    
</mt-header>
<div class="container">
<mt-field label="昵称:" placeholder="输入2-6位昵称" v-model="name" :state="state.name"></mt-field>
<mt-field label="密码:" placeholder="输入6-11字母或数字位密码" type="password" v-model="password" :state="state.password"></mt-field>
<mt-field label="再次密码:" placeholder="输入密码" type="password" v-model="password1" :state="state.password1"></mt-field>
<mt-field label="手机号码:" placeholder="输入手机号码" type="tel" v-model="tel" :state="state.tel"></mt-field>
<mt-field label="收货人:" placeholder="输入2-6位" v-model="name1" :state="state.name1"></mt-field>
  <my-picker @getsonaddr="getAddr"></my-picker>
   <mt-field label="详细地址:" placeholder="输入地址" v-model="addr2" :state="state.addr2"></mt-field>
</div>
<div class="msg">
    {{message}}
</div>
<mt-button type="primary" class="mbtn" @click="register" size="large">注册</mt-button>
    </div>
</template>
<script>
import MyPicker from '../components/addrPicker/MyPicker'
import {getUser} from  '../network/user'
import { Indicator } from 'mint-ui';
export default {
    components:{
        MyPicker
    },
    data() {
        return {
            state:{
                name:'error',
                password:'error',
                password1:'error',
                tel:'error',
                addr2:'error',
                 addr1:'error',
                 name1:'error'
                
            },
            name:'',
            name1:'',
            password:'',
            password1:'',
            tel:'',
            addr1:'',
            addr2:'',
            // popupVisible:true
            message:'',
        }
        
    },
    watch: {
        name(newVal,oldVal){
            if(newVal.length<2||newVal.length>7){
                this.state.name = 'error'
            }else{
                if(newVal.length>0 && newVal.length<7){
                    this.state.name = "success"
                }
            }
        },
          name1(newVal,oldVal){
            if(newVal.length<2||newVal.length>7){
                this.state.name1 = 'error'
            }else{
                if(newVal.length>0 && newVal.length<7){
                    this.state.name1 = "success"
                }
            }
        },
        password(newVal,oldVal){
            this.password1 =''
            var c =  /^[a-zA-Z0-9]{6,8}$/;
            if((newVal).match(c)){
                this.state.password = 'success'
            }else{
                 this.state.password = 'error'
            }
        },
          password1(newVal,oldVal){
         if(this.state.password =='error' ){
             this.state.password1 = 'error'
         }else if(this.password1 == this.password){
             this.state.password1 = 'success'
         }else{
                this.state.password1 = 'error'
         }
     },
     tel(newVal,oldVal){ 
        var c=/^[1][3,4,5,6,7,8,9][0-9]{9}$/;
         if((newVal).match(c)){
             this.state.tel = 'success'
         }else{
             this.state.tel = 'error'
         }
     },
     addr2(newVal,oldVal){
         if(newVal!=''){
             this.state.addr2 = 'success'
         }else{
             this.state.addr2 = 'error'
         }
     }

    },
    methods: {
        getAddr(addr,state){
            this.addr1 = addr
            this.state.addr1 =state
            
        },
        register(){
            var boo = false
           for(var key in this.state) {
               if(this.state[key]!='success') {
                   boo = false
                   break
               }
               boo = true
           }
            if(!boo){
                this.message = '请填写完整的注册信息！'
            }else{
               var user =  {
                   flag:1,//注册标志
                   name:this.name,
                   password:this.password,
                   tel:this.tel,
                   addr:{
                       name:this.name1,
                       tel:this.tel,
                       addr:this.addr1+this.addr2,
                       flag:true
                   }
               }
               Indicator.open({
       text: '加载中...',
        spinnerType: 'fading-circle'
        });
               getUser(user).then(res=>{
                 Indicator.close()
                   if(res.code_error=='0'){
                       
                       this.message =res.message
                            this.$messagebox({
                                title: '注册成功',
                                message: res.message,
                                showCancelButton: true,
                                 confirmButtonText:"去登录",
                                  cancelButtonText:"返回"
                                }).then(action => {
                                    if(action == 'confirm'){
                                        this.$router.push({
                                            path:`/login`
                                        })
                                        }else{
                                            this.$router.go(-1)
                                            
                                        }
                                        })    
                   }else{
         
                       this.message = res.message
                        this.state.name = 'error'
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
    margin-top: 45px;
}
.mbtn{
    position: fixed;
    bottom: 0;
}
.msg{
    margin-top: 50px;
    color: red;
    text-align: center;
}
</style>