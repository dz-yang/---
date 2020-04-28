<template>
    <div>
            
        <mt-header title="添加地址" class="header" fixed>
  <mt-button icon="back" slot="left" @click="back">返回</mt-button>
</mt-header>  

    <div class="container">
        <mt-field label="收货人" placeholder="请输入收货人" v-model="name" :state='state.name'></mt-field>
        <mt-field label="联系方式" placeholder="请输入联系方式" v-model="tel" :state='state.tel'></mt-field>
        <my-picker @getsonaddr="getAddr"></my-picker>
        <mt-field label="详细地址" placeholder="请输入详细地址" v-model="addr2" :state='state.addr2'></mt-field>
    </div>     
<mt-button type="primary" class="mbtn" size='large' @click="saveAddr()">保存</mt-button>
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
          
                name:'',
                tel:'',
                addr1:'',
                addr2:'',
                state:{
                    name:'error',
                    tel:'error',
                    addr1:'error',
                    addr2:'error'
                }
           
        }
    },
    watch: {
        name(newVal){
            if(newVal ==''){
                this.state.name = 'error'
            }else{
                this.state.name = 'success'
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
        back(){
            this.$router.go(-1)
        },
        saveAddr(){
            var boo = false
           for(var key in this.state) {
               if(this.state[key]!='success') {
                   boo = false
                   break
               }
               boo = true
           }
           if(!boo){
                this.message = '请填写完整的地址信息！'
            }else{
                var obj  = {
                    
                    _id :this.$route.params._id,
                    name:this.name,
                    tel:this.tel,
                    addr:this.addr1+this.addr2,
                    flag:3 //添加地址标志
                }
                        Indicator.open({
                                text: '加载中...',
                                spinnerType: 'fading-circle'
                            });
                getUser(obj).then(res=>{
                    
                    if(res.code_error =='0'){
                        this.$store.commit('changeUser',res.user)
                        Indicator.close()
                        this.$router.go(-1)
                    }else{
                        alert(res.message)
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
    padding: 0;
    margin-top: 45px;
}
</style>