<template>
    <div>
     <mt-header title="登录" fixed class="header">
        <router-link to="/" slot="left">
    <mt-button icon="back">back</mt-button>
  </router-link>
   
</mt-header> 
 <div class="container">
        <mt-field label="昵称:" placeholder="输入你昵称" v-model="name" :state="state.name"></mt-field>
        <mt-field label="密码:" placeholder="输入你的密码" type="password" v-model="password" :state="state.password"></mt-field>
        <mt-field label="验证码" v-model="validC" :state="state.validC" class="validCode">
            <div class="_validCode"><validCode v-model="validCode" :refresh="refreshCode" @sendData="getCode" ref='vCode'></validCode></div>
</mt-field>
    </div>
    <div class="msg">
    {{message}}
</div>
    <mt-button type="primary" class="mbtn" @click="login" size="large">登录</mt-button>
    </div>
</template>
<script>
  import validCode from '../components/verificationCode/index'
  import {getUser} from  '../network/user'
  import { Indicator } from 'mint-ui';
export default {
    components:{
        validCode
    },
    data() {
        return {
            name:'',
            password:'',
            state:{
                name:'error',
                password:'error',
                validC:'error'
                
            },
            validC:'',
            validCode:'',
             refreshCode:0,
             message:''
        }
    },
    watch: {
        validC(newVal,oldVal){
            if(this.validCode.toUpperCase() == newVal.toUpperCase()){
                this.state.validC = 'success'
            }else{
                this.state.validC ='error'
            }
        },
        name(newVal,oldVal){
            if(newVal!=''){
                this.state.name ='success'
            }else{
                this.state.name ='error'
            }
        },
        password(newVal,oldVal){
            if(newVal!=''){
                this.state.password ='success'
            }else{
                this.state.password ='error'
            }
        },
    },
    methods: {
          getCode(data){
              this.validCode = data;//在data中定义一个 validCode:'',用来记录验证码
              },
              login(){
                   var boo = false
                    for(var key in this.state) {
                        if(this.state[key]!='success') {
                             boo = false
                                break
                            }
                        boo = true
                    }
                    if(!boo){
                        this.message = '请填写完整的登录信息！'
                    }else{
                        var user =  {
                         flag: 2,//登录标志
                        name:this.name,
                        password:this.password,
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
                                title: '提示信息',
                                message: res.message,
                                showCancelButton: true,
                                 confirmButtonText:"完成",
                                  cancelButtonText:"退出"
                                }).then(action => {
                                    if(action == 'confirm'){
                                        this.$store.commit('changeUser',res.user)
                                        console.log(this.$store.state.user);
                                        
                                        this.$router.push({
                                            path:`/`
                                        })
                                        }else{
                                            this.$store.commit('changeUser',null)
                                            this.$router.go(-1)
                                            
                                        }
                                        })    
                   }else{
                       this.message = ''
                       this.name = ''
                       this.validC = ''
                       this.message = res.message
                        this.state.name = 'error'
                        this.state.password = 'error'
                        this.state.validC = 'error'
                        this.$refs.vCode.refreshCode()
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
.validCode{
    position: relative;
}
._validCode{
    position: absolute;
    right: 30px;
    top: -23px;
    z-index: 9;
 
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