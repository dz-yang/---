<template>
    <div>
        <div >
            <button class="btn" @click="red">-</button>
        <span class="num" >{{n}}</span>
        <button class="btn" @click="add">+</button>
        </div>
    </div>
</template>
<script>
import {getUser} from '../../network/user'
export default {
    data() {
        return {
           n:1
        }
    },
    props:{
        num:{
            defualt:0,
        },
        n1:{
            defualt:0,
        },
        bookId:{
            defualt:0
        }
    },
    created() {
        if(this.n1 != 0){
            this.n = parseInt(this.n1)
        }
        
    },
    methods: {
        red(){
            // this.num = parseInt(this.n1)
            if(this.num<=0){
                this.n =0
            }else if(this.n<=1){
                this.n=1
            }else{
                this.n =this.n-1
            }
            if(this.bookId!=0){
                var user = this.$store.state.user
                 var i  = user.cart.findIndex(item=>{
                     return  item.bookId == this.bookId
                 })
                 user.cart[i].num = this.n
                 this.$store.commit('changeUser',user)
            }
        
        },
        add(){
        
             if(this.num<=0){
                this.n =0
            }else if(this.n>this.num){
                alert('最多购买'+this.num +'本')
                this.n = this.num
            }else{
                this.n = this.n+1
            }
            if(this.bookId!=0){
                 var user = this.$store.state.user
                
                 
                 var i  = user.cart.findIndex(item=>{
                     return  item.bookId == this.bookId
                 })
       
                 
                 user.cart[i].num = this.n
                 
                 
                     
                        
                 this.$store.commit('changeUser',user)

                 
            }
        }
    },
}
</script>
<style scoped>
 .btn{
     width: 30px;
     background-color: rgb(245, 244, 244);
     font-size: 16px;
 }
 .num{
     display: inline-block;
     text-align: center;
     width: 30px;
 }
</style>