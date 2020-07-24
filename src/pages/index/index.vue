<template>
  <div class="indexBox">
    <div class="index">
      <div class="city" @click="searchCity">{{ cityName }}</div>
      <div class="search">
        <input placeholder="请输入搜索内容" />
        <span></span>
      </div>
    </div>
    <div class="swiperBox">
      <swiper
        class="swiper"
        :autoplay="true"
        :duration="true"
        :indicator-dots="true"
      >
        <block v-for="(item, index) in banner" :key="index">
          <swiper-item class="swiperItem">
            <img :src="item.image_url" class="swiperImage" />
          </swiper-item>
        </block>
      </swiper>
    </div>
    <div class="channer">
      <ul>
        <li v-for="(item, index) in channel" :key="index">
          <img :src="item.icon_url" />
          <p>{{ item.name }}</p>
        </li>
      </ul>
    </div>
    <div class="brandList">
      <div class="title">品牌制造商专供 ></div>
      <ul>
        <li v-for="(item, index) in brandList" :key="index">
          <img :src="item.new_pic_url" />
          <p class="name">{{ item.name }}</p>
          <p class="price">${{ item.floor_price }}</p>
        </li>
      </ul>
    </div>
    <div class="newGoods">
      <div class="title">
        <p>新品首发</p>
        <p>查看全部</p>
      </div>
      <scroll-view class="scroll-x" :scroll-x="true">
        <view v-for="(item, index) in newGoods" :key="index" class="rowItem">
          <div class="list">
            <img
              class="item-image"
              :src="item.list_pic_url"
              mode="aspectFill"
            />
            <p>{{ item.name }}</p>
            <p>{{ item.goods_brief }}</p>
            <p>${{ item.retail_price }}</p>
          </div>
        </view>
      </scroll-view>
    </div>
    <div class="newGoods hotGoods">
      <div class="title">
        <p>人气推荐 . 好物精选</p>
        <p>查看全部</p>
      </div>
      <scroll-view class="scroll-x" :scroll-x="true">
        <view v-for="(item, index) in hotGoods" :key="index" class="rowItem">
          <div class="list">
            <img
              class="item-image"
              :src="item.list_pic_url"
              mode="aspectFill"
            />
            <p>{{ item.name }}</p>
            <p>{{ item.goods_brief }}</p>
            <p>${{ item.retail_price }}</p>
          </div>
        </view>
      </scroll-view>
    </div>
    <div class="topicList">
        <div class="title">专题精选</div>
         <scroll-view class="scroll-x" :scroll-x="true">
        <view v-for="(item, index) in topicList" :key="index" class="rowItem">
             <div class="list">
            <img
              class="item-image"
              :src="item.item_pic_url"
              mode="aspectFill"
            />
            <p>{{ item.title }}</p>
            <p>{{ item.subtitle }}</p>
            <p>${{ item.price_info}}起</p>
          </div>
        </view>
         </scroll-view>
    </div>
    <div class="newCategoryList">
       <div class="newList" v-for="(item,index) in newCategoryList" :key="index">
         <div class="title">{{item.name}}</div>
         <div class="newLists">
         <ul>
           <li v-for="(items,j) in item.goodsList" :key="j">
             <img :src="items.list_pic_url"/>
             <p class="name">{{items.name}}</p>
             <p class="price">${{items.retail_price}}</p>
           </li>
         </ul>
          <div class="last">
              <p>{{item.name}}好物</p>
              <span class="icon"></span>
            </div>
         <div>
           
          </div>
         </div>
       </div>
    </div>
  </div>
</template>
<script>
import amapFile from "../../utils/amap-wx.js";
import "./index.css";
import { mapState, mapMutations } from "vuex";
import { request } from "../../utils/index";
export default {
  data() {
    return {
      banner: [],
      channel: [],
      brandList: [],
      newGoods: [],
      hotGoods: [],
      topicList: [],
      newCategoryList: [],
    };
  },
  computed: {
    ...mapState(["cityName"]),
  },
  mounted() {
    this.getCity();
    this.getData();
  },
  methods: {
    ...mapMutations(["CHANGE_CITY_NAME"]),
    searchCity() {
      var _this = this;
      wx.getSetting({
        success(res) {
          console.log(res, res.authSetting["scope.userLocation"]);
          if (!res.authSetting["scope.userLocation"]) {
            wx.openSetting({
              success(res) {
                _this.getCity();
              },
            });
          } else {
            wx.navigateTo({
              url: "/pages/map/main",
            });
          }
        },
      });
    },
    getCity() {
      let _this = this;
      var myAmapFun = new amapFile.AMapWX({
        key: "c484beae1f3191dd6af41da09aba4fe5",
      });
      myAmapFun.getRegeo({
        success: function (data) {
          _this.CHANGE_CITY_NAME(data[0].desc);
        },
        fail: function (info) {},
      });
    },
    async getData() {
      console.log(request);
      const result = await request("/index/index", "GET");
      this.banner = result.banner;
      this.channel = result.channel;
      this.brandList = result.brandList;
      this.newGoods = result.newGoods;
      this.hotGoods = result.hotGoods;
      this.topicList = result.topicList;
      this.newCategoryList = result.newCategoryList;
    },
  },
};
</script>
<style></style>
