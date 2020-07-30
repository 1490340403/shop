<template>
  <div class="goodDetail">
    <div class="banner">
      <swiper
        class="swiper"
        :autoplay="true"
        :duration="true"
        :indicator-dots="true"
      >
        <block v-for="(item, index) in banner" :key="index">
          <swiper-item class="swiperItem">
            <img :src="item.img_url" class="swiperImage" />
          </swiper-item>
        </block>
      </swiper>
        <button class="share" hover-class="none" open-type="share">
            分享商品
        </button>
    </div>
    <div class="info">
        <div>30天无忧退货</div>
        <div>48小时快速退款</div>
        <div>满88元包邮</div>
    </div>
    <div class="price_info">
        <p class="name">{{info.name}}</p>
        <p class="goods_brief">{{info.goods_brief}}</p>
        <p class="price">{{info.retail_price}}</p>
    </div>
    <div class="section-nav"  @click="close">
        <div>请选择规格参数</div>
        <div></div>
    </div>
    <div class="canshu">
      <div class="title">商品参数</div>
      <ul class="can_list">
        <li v-for="(item,index) in attribute" :key="index">
          <p>{{item.name}}</p>
          <span>{{item.value}}</span>
        </li>
      </ul>
    </div>
    <div class="pop" v-show="showPop" >
        <div class="popBox active" :class="[showPop?'active':'']">
            <div class="top">
                <div class="left">
                    <img :src="info.primary_pic_url"/>
                </div>
                <div class="right">
                    <p>价格￥:{{info.retail_price}}</p>
                    <p>请选择数量</p>
                </div>
                <div class="close" @click="close">关闭</div>
            </div>
            <div class="bottom">
                <div @click="des">-</div>
                <div>{{num}}</div>
                <div @click="add">+</div>
            </div>
        </div>
    </div>
     <wxParse :content="info.goods_desc" />
     <div class="footer">
       <div @click="changeColl"><span class="collect" :class="[showColl?'active':'']"></span>
        
       </div>
       <div>
         <span class="car"></span>
         <span class="num">{{catNum}}</span>
       </div>
       <div @click="goOrder">立即购买</div>
       <div @click="addCar">加入购物车</div>

     </div>
  </div>
</template>

<script>
import { request } from "../../utils/index";
import "./index.css";
import wxParse from 'mpvue-wxparse'
export default {
  data() {
    return {
      id: 1009024,
      openId: "oQmbb4sNZdxaUQZ0sfYgvtOP2S7c",
      banner: [],
      info:{},
      showPop:false,
      num:1,
      attribute:[],
      catNum:0,
      showColl:'',
      money:''
    };
  },
   components: {
    wxParse
  },
  onShareAppMessage: function () {
    return {
      title: this.info.name,
      path:"/pages/goodDetail/main?id="+this.id
    }
  },
  mounted() {
    this.openId = wx.getStorageSync("openId") || "oQmbb4sNZdxaUQZ0sfYgvtOP2S7c";
    this.getData();
  },
  methods: {
async goOrder(){
   if(!this.showPop){
      this.showPop=true
      return
    }
  const data=await request('/addOrder','POST',{
    openId: this.openId,
    id:this.id,
    money:this.money
  })
  if(data.data){
    wx.navigateTo({
      url: '/pages/order/main'
    });
      
  }
},
 async addCar(){
    if(!this.showPop){
      this.showPop=true
      return
    }
    const data=await request('/addCar','POST',{
        openId: this.openId,
        id:this.id,
        num:this.num,
        money:this.money
      })
      if(data){
        this.catNum+=this.num
        wx.showToast({
          title: '加入购物车成功',
          icon: 'success',
          duration: 2000
        })

      }
  },
  async  changeColl(){
      this.showColl=!this.showColl
      const data=await request('/changeColl','POST',{
        openId: this.openId,
        id:this.id,
      })
    },
    close(){
        this.showPop=!this.showPop
    },
    des(){
        if(this.num>1){
            this.num--
        }
    },
    add(){
        this.num++
    },
    async getData() {
      const data = await request("/goodDetail", "GET", {
        id: this.id,
        openId: this.openId,
      });
      console.log(data.showColl);
      this.banner = data.gallery;
      this.info=data.info
      this.attribute=data.attribute
      this.showColl=data.showColl.length>0?true:false
      this.money=data.info.retail_price
      this.catNum=data.shopNum
    },
  },
};
</script>

<style>
@import url("~mpvue-wxparse/src/wxParse.css");
</style>
