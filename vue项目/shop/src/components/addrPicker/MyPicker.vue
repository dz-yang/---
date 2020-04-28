<template>
<!-- 导入cityData.json的包 -->
<!-- <my-picker @getsonaddr="getAddr"></my-picker> -->
<!-- 提交联动地址和状态给父组件 -->
 <!-- getAddr(addr,state){
            this.addr1 = addr 
            this.state.addr1 =state
            console.log(this.addr1);
            console.log(this.state.addr1); 
        } -->
    <div>
       <div @click="showAddressPicker">
          <mt-field label="地址:" placeholder="请选择三级地址" v-model="region"  readonly="readonly" :state="Sregion"></mt-field>
       </div>
     <!-- <input type="text" placeholder="请选择三级地址" v-model="region" maxlength="80" readonly="readonly" @click="showAddressPicker" /> -->
       <mt-popup v-model="regionVisible" position="bottom">
         <div class="popbtn">
           <mt-button @click="cancle" plain size="small">取消</mt-button>
             <mt-button @click="define" plain type="primary" size="small">确定</mt-button>
         </div>
       <mt-picker :slots="myAddressSlots" valueKey="name" :visibleItemCount="5" @change="addressChange" :itemHeight="40" ref="pickCom"></mt-picker>
       </mt-popup>
   </div>
</template>
<script>

import threeLevelAddress from '../../assets/json/cityData.json'
export default {
    data() {
            return {
                Sregion:'error',
                yladdr:'',
                oldCityList: '',
                oldQuList: '',
                oldSlots: '',
                region: '', //三级地址
                province: '', //省
                city: '', //市
                county: '', //县
                provinceCode: '', //省级代码
                cityCode: '', //市级代码
                countyCode: '', //县级代码

                regionVisible: false, //弹出框是否可见
                regionInit: false, //禁止地区选择器自动初始化，picker组件会默认进行初始化，导致一进入页面就会默认选中一个初始3级地址

                //picker组件插槽
                myAddressSlots: [           //省
                    {
                        flex: 1,
                        values: this.getProvinceArr(), //省份数组
                        className: 'slot1',
                        textAlign: 'center'
                    },             //分隔符
                    {
                        divider: true,
                        content: '',
                        className: 'slot2'
                    },          //市
                    {
                        flex: 1,
                        values: this.getCityArr("北京市"),
                        className: 'slot3',
                        textAlign: 'center'
                    }, {
                        divider: true,
                        content: '',
                        className: 'slot4'
                    },          //县
                    {
                        flex: 1,
                        values: this.getCountyArr("北京市", "市辖区"),
                        className: 'slot5',
                        textAlign: 'center'
                    }
                ]
            }
        },
        watch: {
          region(newVal){
            if(newVal!=0){
              this.Sregion  = 'success'
              
              this.$emit('getsonaddr',this.region,this.Sregion)
              
            }else{
              this.Sregion  = 'error'
               this.$emit('getsonaddr',this.region,this.Sregion)
            }
          }
        },
        methods: {
            cancle() {
                this.regionVisible=false;
                this.region = this.yladdr

                },
                define() {
                  this.yladdr = this.region
                   this.$emit('getsonaddr',this.region,this.Sregion)
                    this.popupVisible = false;
                    // 获取变换后的城市数据
                    var valueArr = this.$refs.pickCom.getValues()
                    this.oldSlots = valueArr.concat();
                    this.oldCityList = this.$refs.pickCom.getSlotValues(2);
                    this.oldQuList = this.$refs.pickCom.getSlotValues(4);
                    var text = '';
                    this.oldSlots.forEach(item => {
                        text += item.name
                    });
                    this.regionVisible=false;
                    //输出文本，可以显示到页面中
                    // console.log(text);
                },
                //打开地址选择器
                showAddressPicker() {
                    this.regionVisible = true;
                },
                //picker组件的change事件，进行取值赋值
                addressChange(picker, values) {
                    if (this.regionInit) {           //取值并赋值
                        this.region = values[0]["name"] + values[1]["name"] + values[2]["name"];
                        this.province = values[0]["name"];
                        this.city = values[1]["name"];
                        this.county = values[2]["name"];
                        this.provinceCode = values[0]["code"];
                        this.cityCode = values[1]["code"];
                        this.countyCode = values[2]["code"];

                                   //给市、县赋值
                        picker.setSlotValues(1, this.getCityArr(values[0]["name"]));
                        picker.setSlotValues(2, this.getCountyArr(values[0]["name"], values[1]["name"]));
                    } else {
                        this.regionInit = true;
                    }
                },      //遍历json，返回省级对象数组
                getProvinceArr() {
                    let provinceArr = [];
                    threeLevelAddress.forEach(function(item) {
                        let obj = {};
                        obj.name = item.name;
                        obj.code = item.code;
                        provinceArr.push(obj);
                    });
                    return provinceArr;
                },        //遍历json，返回市级对象数组
                getCityArr(province) {
                    // console.log("省：" + province);
                    let cityArr = [];
                    threeLevelAddress.forEach(function(item) {
                        if (item.name === province) {
                            item.children.forEach(function(args) {
                                let obj = {};
                                obj.name = args.name;
                                obj.code = args.code;
                                cityArr.push(obj);
                            });
                        }
                    });
                    return cityArr;
                },      //遍历json，返回县级对象数组
                getCountyArr(province, city) {
                    let countyArr = [];
                    threeLevelAddress.forEach(function(item) {
                        if (item.name === province) {
                            item.children.forEach(function(args) {
                                if (args.name === city) {
                                    args.children.forEach(function(param) {
                                        let obj = {};
                                        obj.name = param.name;
                                        obj.code = param.code;
                                        countyArr.push(obj);
                                    })
                                }
                            });
                        }
                    });
                    return countyArr;
                },
        },
        mounted() { 
        
        }
}
</script>
<style scoped>
.popbtn {
    display: flex;
    justify-content: space-between;
 
}
 .popbtn  button {
        margin: 10px;
    }
.mint-popup-bottom {
    width: 100%!important;
    z-index: 5555;
}
</style>