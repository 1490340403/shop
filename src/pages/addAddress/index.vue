<template>
  <div class="addaddress">
    <div class="item">
      <input type="text" placeholder="姓名" v-model="userName">
    </div>
    <div class="item">
      <input type="text" placeholder="手机号码" v-model="telNumber">
    </div>
    <div class="item">
      <picker mode="region" @change="bindRegionChange" :value="region" :custom-item="customItem">
        <input type="text" placeholder="身份、城市、区县" v-model="address">
      </picker>
    </div>
    <div class="item">
      <input type="text" placeholder="详细地址，如楼道、楼盘号等" v-model="detailaddress">
    </div>

    <div class="item itemend">
      <checkbox-group @change="checkboxChange">
        <label class="checkbox">
          <checkbox class="box" value="true" :checked="checked" color="#b4282d"></checkbox>
          设置为默认地址
        </label>
      </checkbox-group>
      <div @click="wxaddress">一键导入微信</div>
    </div>

    <div class="bottom" @click="saveAddress">保存</div>
  </div>
</template>

<script>
import './index.css'
import { request } from "../../utils/index";
export default {
    data(){
        return {
            userName:'',
            telNumber:'',
            region:"",
            address:'',
            customItem:'全部',
            detailaddress:'',
            checked:false,
            id:'',
            openId: "oQmbb4sNZdxaUQZ0sfYgvtOP2S7c",
            res:""
        }
    },
    onShow(){
        this.id=this.$root.$mp.query.id
         this.res=this.$root.$mp.query.res
        if(this.id){
            this.getData()
        }
        if(this.res){
             this.res = JSON.parse(decodeURIComponent(this.$root.$mp.query.res))
      console.log(this.res, '------')
      this.userName = this.res.userName
      this.telNumber = this.res.telNumber
      this.address = `${this.res.provinceName} ${this.res.cityName} ${this.res.countyName}`
      this.detailaddress = this.res.detailInfo
        }
    },
    mounted(){
     
    },
    methods:{
      async  getData(){
          var data=await request('/getDetailAddress','GET',{
              openId:this.openId,
              id:this.id
          })
          data=data.data
          this.address=data[0].address
          this.address_detail=data[0].address_detail
          this.checked=data[0].is_default==1?true:false  
          this.telNumber=data[0].mobile
          this.userName=data[0].name
      },
        checkboxChange(e){
            const val=e.mp.detail
            this.checked=val.value.length>0?true:false
        },
        bindRegionChange(e){
            const val=e.mp.detail
            this.address=`${val.value[0]}${val.value[1]}${val.value[2]}`
        },
        wxaddress(){
          wx.chooseAddress({
            success: (res) => {
                this.userName=res.userName
                this.telNumber=res.telNumber
                this.address=`${res.provinceName}${res.cityName}${res.countyName}`
                this.detailaddress=res.detailInfo
            },
            fail: function(err) {
                console.log(err)
            }
          })
  
        },
      async  saveAddress(){
            const {userName,telNumber,address,detailaddress,checked,id,openId}=this
            const data=await request('/updataAddress','POST',{
                userName,
                telNumber,
                address,
                detailaddress,
                checked,
                id,
                openId
            })
            if(data.data){
                wx.showToast({
                    title: '保存成功',
                    icon: 'success',     //默认值是success,就算没有icon这个值，就算有其他值最终也显示success
                    duration: 2000,      //停留时间
                    success:function(){
                       setTimeout(()=>{
                            wx.navigateBack({
                            delta: 1
                        });
                       },2000)
                          
                    }
                    })
            }
        }
    }
}
</script>

<style>

</style>