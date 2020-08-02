<template>
    <div class="address">
      <div class="item" v-if="listData.length !== 0">
        <div class="list" v-for="(item, index) in listData" :key="index">
          <div class="addresslist">
            <div>
              <span>{{item.name}}</span>
              <div class="moren" v-if="item.is_default">默认</div>
            </div>
            <div class="info" @click="selAddress(item.id)">
              <p>{{item.mobile}}</p>
              <p>{{item.address+item.address_detail}}</p>
            </div>
            <div @click="toDetail(item.id)"></div>
          </div>
        </div>
      </div>

      <div class="center" v-else>
        <p>收货地址在哪里?</p>
      </div>
    <div class="bottom">
      <div @click="wxaddress(1)">+新建地址</div>
      <div @click="wxaddress">一键导入微信地址</div>
    </div>
  </div>
</template>

<script>
import './index.css'
import { request } from "../../utils/index";
export default {
  data(){
    return {
      listData:[],
      openId: "oQmbb4sNZdxaUQZ0sfYgvtOP2S7c",
    }
  },
  onShow(){
this.getAddress()
  },
  mounted(){
    
  },
  methods:{
  async  getAddress(){
      const data=await request('/getAddressList','GET',{
        openId:this.openId
      })
      this.listData=data.data
      console.log(data)
    },
    selAddress(id){},
    toDetail(id){
       wx.navigateTo({
        url: "/pages/addAddress/main?id="+id
      });
    },
    wxaddress(id){
      if(id==1){
         wx.navigateTo({
        url: "/pages/addAddress/main"
      });
      }else{
         wx.chooseAddress({
            success: (res) => {
              let result = encodeURIComponent(JSON.stringify(res));
              wx.navigateTo({
        url: "/pages/addAddress/main?res="+result
      });
            }
         })   
      }
    }
  }
}
</script>

<style>

</style>