<template>
    <div>
        <mt-header title="管理收货地址" class="header" fixed>
  <mt-button icon="back" slot="left" @click="back">返回</mt-button>
</mt-header>
<div class="container">
<div class="card" style="width: 100%" v-for="(item,index) in this.user.addrs" :key="index">
  <ul class="list-group list-group-flush">
    <li class="list-group-item">
        <div class="addrname"><span>{{item.name}}</span>  <span> {{item.tel}}</span></div>
        <div class="addr1">{{item.addr}}</div>
    </li>
    <li class="list-group-item opt"> 
        <div class="r" v-if='item.flag' style="color:red" @click="mraddr(index,item)">
           <svg class="bi bi-circle-fill" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <circle cx="8" cy="8" r="8"/>
            </svg>
             默认地址
        </div>
        
       <div v-else @click="mraddr(index,item)"><svg class="bi bi-circle" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" clip-rule="evenodd"/>
            </svg> 默认地址 </div>
       

        <div class="edit" @click="edit(index)">
            <svg class="bi bi-pencil-square" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456l-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
            <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" clip-rule="evenodd"/>
            </svg> 编辑
        </div>
        <div class="del" v-if="!item.flag" @click="del(index)">
            <svg class="bi bi-trash" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
            <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" clip-rule="evenodd"/>
            </svg> 删除
        </div>
        </li>

  </ul>
</div>

</div>
<mt-button type="primary" class="mbtn" size='large' @click="addAddr(user._id)">添加地址</mt-button>
    </div>
</template>
<script>
import {getUser} from '../network/user'
import { Indicator } from 'mint-ui';
export default {
    data() {
        return {
           
            _id:'',
            user:null,
           selected:'',
        //     addrs:[
        //         {name:'dz',tel:'15018559439',addr:'广东省湛江吴川十八迷路',flag:true},
        //         {name:'yy',tel:'14054559439',addr:'广东省湛江十八迷路',flag:false},
        //          {name:'dsf',tel:'14054559439',addr:'广东省湛江十八迷路',flag:false},
        //         ]
        addrs:null
        }
    },
    watch: {
        
    },
    created() {
        this._id = this.$route.params._id
        this.user = this.$store.state.user
     
       
        
        this.selected = this.user.addrs.findIndex(item=>{
            return item.flag == true

        })
       
        
 
  
      
        
    },
    methods: {
        back(){
            this.$router.go(-1)
        },
        mraddr(i,item){
            // 默认地址的改变   
            if(item.flag == true){
                item.flag = true
                this.selected = i
            }else{
                 var obj = {
                    flag: 4, //修改默认地址
                    _id:this.user._id,
                    oldi:this.selected,
                    newi:i               
                }
                item.flag = true 
                this.user.addrs[this.selected].flag = false
                this.selected = i
               Indicator.open({
                                text: '加载中...',
                                spinnerType: 'fading-circle'
                            });
                 getUser(obj).then(res=>{
                   Indicator.close()
                    if(res.code_error =='0'){
                        this.$store.commit('changeUser',res.user)
                        this.user = this.$store.state.user
                    }else{
                        alert(res.message)
                    }
                    
                })
            }
        },
        addAddr(_id){
            // 添加地址
            this.$router.push({
                path:`/addaddr/${_id}`
            })
        },
        del(i){
            // 删除地址
            var obj = {
                flag:5,//删除地址标志
                _id:this._id,
                i:i
            }
            getUser(obj).then(res=>{
                   
                    if(res.code_error =='0'){
                        this.$store.commit('changeUser',res.user)
                        this.user = this.$store.state.user
                    }else{
                        alert(res.message)
                    }    
                })
        },
        edit(i){
            //修改地址
             this.$router.push({
                path:`/editaddr/${i}`
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
}
.opt{
    position: relative;
}
.edit{
    position: absolute;
    right: 10px;
    top:18px;
}
.del{
    position: absolute;
    right: 80px;
    top:18px;
}
.addrname{
    font-size: 18px;
    
}
.addrname span{
    margin-right: 20px;
}
.addr1{
    line-height: 40px;
    font-size: 20px;
}

</style>