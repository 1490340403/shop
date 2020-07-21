<template>
  <div class="index">
    <div class="city" @click="searchCity">{{ cityName }}</div>
    <div class="search">
      <input placeholder="请输入搜索内容" />
      <span></span>
    </div>
  </div>
</template>
<script>
import amapFile from "../../utils/amap-wx.js";
import "./index.css";
export default {
  data() {
    return {
      cityName: "上海1",
    };
  },
  methods: {
    searchCity() {
      var _this=this
      wx.getSetting({
        success(res) {
          console.log(res,res.authSetting['scope.userLocation'])
          if(!res.authSetting['scope.userLocation']){
            wx.openSetting({
              success(res){
                _this.getCity()
              }
            })
          }else{
            wx.navigateTo({
              url: "/pages/map/main"
            });
          }
        },
      });
    },
    getCity(){
       let _this = this
      var myAmapFun = new amapFile.AMapWX({key:'256d94ac927c73a25e9177d789a1d060'});
      myAmapFun.getRegeo({
        success: function (data) {
          // 成功回调
          console.log(data,data)
          // ........
        },
        fail: function (info) {
         console.log(info,'info')
        }
      })
    }
  },
};
</script>
<style></style>
