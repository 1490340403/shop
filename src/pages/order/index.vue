<template>
  <div>11</div>
</template>

<script>
import { request } from "../../utils/index";
export default {
data(){
    return {
        openId: "oQmbb4sNZdxaUQZ0sfYgvtOP2S7c",
        addressId:''
    }
 },
 show(){
     this.getOrders()
 },
 mounted(){
     this.getOrders()
 },
 methods:{
    async getOrders(){
        console.log(1)
        const data=await request('/getOrder','GET',{
            openId:this.openId,
            addressId:this.addressId
        })
      console.log(data)
    }
  }
}
</script>

<style>

</style>