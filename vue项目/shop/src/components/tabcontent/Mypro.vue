<template>
    <div>
   <mt-header fixed title="我的" class="header"></mt-header>  
       
<div class="d-flex bd-highlight bgc">
  <div class=" flex-grow-1 bd-highlight avatext">
      <div class="avatar">
          <img src="../../assets/avatar.jpg" alt="">
      </div>
      <div class="name" v-if="user">
          昵称:{{user.name}}
          
      </div>
      <div class="mbtn" v-else>
          <router-link to='/login'><mt-button size="small" type="default" >登录</mt-button></router-link>
          <router-link to='/register'><mt-button size="small" type="default">注册</mt-button></router-link>
          
         
      </div>
  </div>
 
  <div class="p-2 bd-highlight">
   <div class="addr" @click="addr">
       <div>
          <svg class="bi bi-geo-alt" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" clip-rule="evenodd"/>
         </svg>
        </div>
        <div class="text">
            地址管理
        </div>
   </div>
  </div>
</div>

<div class="my_like">
          <div class="item">
            <div class="t">0</div>
            <div class="b">铃铛</div>
          </div>
            <div class="item">
            <div class="t">0</div>
            <div class="b">收藏</div>
          </div>
            <div class="item">
            <div class="t">0</div>
            <div class="b">喜欢</div>
          </div>
            <div class="item">
            <div class="t">0</div>
            <div class="b">礼券</div>
          </div>
        </div>

<div class="card" style="width: 100%">
  <ul class="list-group list-group-flush">
   <li class="list-group-item" @click="order('-1')">
       全部订单
   </li>
    
    <li class="list-group-item">
        
        <div class="nav" >
          <div class="nav_item" @click="order('0')">
            <div class="item_t"><img src="../../assets/profile/pay.svg" alt=""></div>
            <div class="item_b">待付款</div>
          </div>
          <div class="nav_item" @click="order('1')">
            <div class="item_t"><img src="../../assets/profile/back.svg" alt=""></div>
            <div class="item_b">待发货</div>
          </div>
          <div class="nav_item" @click="order('2')">
            <div class="item_t"><img src="../../assets/profile/get.svg" alt=""></div>
            <div class="item_b">待收货</div>
          </div>
          <div class="nav_item"  @click="comment">
            <div class="item_t"><img src="../../assets/profile/comment.svg" alt=""></div>
            <div class="item_b">待评论</div>
          </div>
          
         
 
        </div>
    </li>
    <li class="list-group-item" @click="showinp">个人资料</li>
       <li class="list-group-item" v-if='show1'>
         <mt-field label="id" :value ='user._id' disabled></mt-field>
         <mt-field label="昵称"  :value ='user.name' disabled></mt-field>
         <mt-field label="手机号码" :value ='user.tel' disabled></mt-field>
         
       </li>
       
       <li class="list-group-item"  @click="showmsg" >我的消息</li>
       <li class="list-group-item" v-if="show2">无</li>
       <li class="list-group-item" @click="showbtn">账号管理</li>
       <li class="list-group-item" v-if='show'>
          <mt-button type="danger"  size='large' @click="logout">退出</mt-button>
       </li>
     
  </ul>
</div>




    </div>

</template>
<script>
export default {
    data() {
        return {
            user:null,
            show:false,
            show1:false,
            show2:false,
            show3:false,
            show4:false,
        }
    },
    created() {
        this.user = this.$store.state.user
       
    },
    methods: {
        addr(){
            if(!this.user){
               this.$messagebox({
                                title: '提示信息',
                                message:" 请去登录！",
                                showCancelButton: true,
                                 confirmButtonText:"登录",
                                  cancelButtonText:"返回"
                                }).then(action => {
                                    if(action == 'confirm'){  
                                        this.$router.push({
                                            path:`/login`
                                        })
                                        }else{
                                        }
                                        }) 
            }else{
              this.$router.push({
                path:`/addrmanagement/${this.user._id}`
              })
            }
        },
        showbtn(){
          //显示退出按钮
         if(!this.user){
               this.$messagebox({
                                title: '提示信息',
                                message:" 请去登录！",
                                showCancelButton: true,
                                 confirmButtonText:"登录",
                                  cancelButtonText:"返回"
                                }).then(action => {
                                    if(action == 'confirm'){  
                                        this.$router.push({
                                            path:`/login`
                                        })
                                        }else{
                                        }
                                        }) 
            }else{
              this.show = this.show ?false: true
            }
          
        },
        logout(){
          //退出登录
          this.$store.commit('changeUser',null)
          this.user = null
        },
        showinp(){
          // 个人资料
         
          if(!this.user){
            this.$messagebox({
                                title: '提示信息',
                                message:" 请去登录！",
                                showCancelButton: true,
                                 confirmButtonText:"登录",
                                  cancelButtonText:"返回"
                                }).then(action => {
                                    if(action == 'confirm'){  
                                        this.$router.push({
                                            path:`/login`
                                        })
                                        }else{
                                        }
                                        }) 
          }
         else{
              this.show1 = this.show1 ?false: true
            }
          
        },
        showmsg(){
          // 个人消息
          if(this.user){
            this.show2 =this.show2?false:true
          }else{
              this.$messagebox({
                                title: '提示信息',
                                message:" 请去登录！",
                                showCancelButton: true,
                                 confirmButtonText:"登录",
                                  cancelButtonText:"返回"
                                }).then(action => {
                                    if(action == 'confirm'){  
                                        this.$router.push({
                                            path:`/login`
                                        })
                                        }else{
                                        }
                                        }) 
          }
        },
        order(a){
          if(this.user){
            this.show3 =this.show3?false:true
            this.$router.push({
            path:`/myorder/${a}`
          })
          }else{
            this.$messagebox({
                                title: '提示信息',
                                message:" 请去登录！",
                                showCancelButton: true,
                                 confirmButtonText:"登录",
                                  cancelButtonText:"返回"
                                }).then(action => {
                                    if(action == 'confirm'){  
                                        this.$router.push({
                                            path:`/login`
                                        })
                                        }else{
                                        }
                                        }) 
          }
         

        },
        comment(){
           if(this.user){
            this.show4 =this.show4?false:true
            this.$router.push({
            path:`/mycomment/0`
          })
          }else{
           this.$messagebox({
                                title: '提示信息',
                                message:" 请去登录！",
                                showCancelButton: true,
                                 confirmButtonText:"登录",
                                  cancelButtonText:"返回"
                                }).then(action => {
                                    if(action == 'confirm'){  
                                        this.$router.push({
                                            path:`/login`
                                        })
                                        }else{
                                        }
                                        }) 
          }
          
        
    },
    }
    
}
</script>
<style scoped>
.header{
    background-color: pink;
    position: fixed;
    top: 0;
}
.d-flex{
    margin-top: 45px;
}
.addr{
    color: #fff;
    padding-top: 10px;
    display: flex;
    flex-direction: column;
    text-align: center;
}
.avatext{
    display: flex;

}
.avatar img{
    width: 80px;
    height: 80px;
    border-radius: 50%;
}
.name{
    padding: 20px;
    font-size: 20px;
}
.bgc{
    background-color: pink;
   padding: 20px;
   padding-bottom: 10px;
}
.my_like{
    background-color: pink;
    border-bottom: 1px solid pink;
    
text-align: center;
  display: flex;
  justify-content: space-around;
 
}
.item{
  display: flex;
  font-size: 20px;
  flex-direction: column;
 justify-content: space-around;
  height: 60px;
  line-height: 30px;
}
.nav{
  color: #333;
 
  background-color: #fff;
  
  border-radius: 5px;
  display: flex;
   justify-content: space-around;
}
.nav_item{
  display: flex;
  font-size: 15px;
  flex-direction: column;
 justify-content: center;
 
  line-height: 20px;
}
.mbtn{
    padding-top: 22px;
}
.mbtn button{
    margin-left: 5px;
}
.mint-field-core{
  background-color: #FFF;
}
</style>