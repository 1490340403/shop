<template>
  <div class="mapContainer">
    <input
      type="text"
      placeholder="请输入搜索内容"
      focus="true"
      @input="changeVal"
      v-model="cityName"
    />
    <scroll-view class="scroll" scroll-y>
      <div
        class="result"
        v-for="(item, index) in tips"
        :key="index"
        @click="clickCity(item)"
      >
        {{ item.name }}
      </div>
    </scroll-view>
    <div class="map">
      <div class="mapTitle">当前地址:{{ address }}</div>
      <map
        id="map"
        :longitude="longitude"
        :latitude="latitude"
        scale="16"
        :markers="markers"
        style="width: 100%; height: 600rpx;"
      ></map>
    </div>
  </div>
</template>

<script>
import "./index.css";
import amapFile from "../../utils/amap-wx.js";
export default {
  data() {
    return {
      tips: [],
      longitude: "",
      latitude: "",
      markers: [],
      address: "",
      cityName: "",
    };
  },
  mounted() {
    this.getLocation();
  },
  methods: {
    clickCity(val){
      console.log(val)
    },
    getLocation() {
      var that = this;
      var myAmapFun = new amapFile.AMapWX({
        key: "256d94ac927c73a25e9177d789a1d060",
      });
      myAmapFun.getPoiAround({
        iconPathSelected: "/static/images/marker.png",
        success: function (data) {
          const dataMarkers = data.markers;
          if (dataMarkers && dataMarkers.length > 0) {
            that.markers = dataMarkers;
            that.longitude = dataMarkers[0].longitude;
            that.latitude = dataMarkers[0].latitude;
            that.address = dataMarkers[0].address;
          }
          console.log(data);
        },
      });
    },
    changeVal(e) {
      const { value } = e.target;
      var that = this;
      var myAmapFun = new amapFile.AMapWX({
        key: "256d94ac927c73a25e9177d789a1d060",
      });
      myAmapFun.getInputtips({
        keywords: value,
        location: "",
        success: function (data) {
          if (data && data.tips) {
            that.tips = data.tips;
          }
        },
      });
    },
  },
};
</script>

<style></style>
