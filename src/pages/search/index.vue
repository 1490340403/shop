<template>
  <div class="search">
    <div class="header">
      <div class="div">
        <img
          src="http://nos.netease.com/mailpub/hxm/yanxuan-wap/p/20150730/style/img/icon-normal/search2-2fb94833aa.png"
          alt=""
        />
        <input
          type="text"
          confirm-type="search"
          focus="true"
          v-model="words"
          @focus="inputFocus"
          @input="tipsearch"
          @confirm="searchWords"
          placeholder="商品搜索"
        />
        <img
          @click="clearInput"
          class="del"
          src="http://nos.netease.com/mailpub/hxm/yanxuan-wap/p/20150730/style/img/icon-normal/clearIpt-f71b83e3c2.png"
          alt=""
        />
      </div>
      <div @click="cancel">取消</div>
    </div>

    <div class="searchListVal" v-if="words">
      <ul>
        <li v-for="(item, index) in searchListVal" :key="index">
          {{ item.name }}
        </li>
      </ul>
    </div>

    <div v-else>
      <div class="history" v-if="historyData.length > 0">
        <div class="his_top">
          <span>搜索记录</span>
          <span @click="clearHis"></span>
        </div>
        <ul class="his_list">
          <li
            v-for="(item, index) in historyData"
            :key="index"
            :data-keyword="item.keyword"
            @click="searchWords"
          >
            {{ item.keyword }}
          </li>
        </ul>
      </div>
      <div class="history hotHis">
        <div class="his_top">
          <span>热门搜索</span>
        </div>
        <ul class="his_list">
          <li
            v-for="(item, index) in hotKeywordList"
            :class="{ active: item.is_hot == 1 }"
            :key="index"
            :data-keyword="item.keyword"
            @click="searchWords"
          >
            {{ item.keyword }}
          </li>
        </ul>
      </div>
    </div>
    <div class="searchListVal dataList" v-if="searchListVal.length!=0">
      <div class="data_title">
        <div :class="index==0?'active':''" @click="sel(0)">综合</div>
        <div class="price"  :class="[index==1?'active':'',order=='desc'?'desc':'asc']" @click="sel(1)">价格</div>
        <div :class="index==2?'active':''" @click="sel(2)">分类</div>
      </div>
      <ul class="data_list">
         <li v-for="(item,index) in searchListVal" :key="index">
            <img :src="item.list_pic_url"/>
            <p>{{item.name}}</p>
            <p>{{item.retail_price}}元</p>
         </li>
      </ul>
    </div>
  </div>
</template>

<script>
import "./index.css";
import { request } from "../../utils/index";
export default {
  data() {
    return {
      words: "",
      order: "",
      openid: "oQmbb4sNZdxaUQZ0sfYgvtOP2S7c",
      historyData: [],
      hotKeywordList: [],
      searchListVal: [],
      index:0
    };
  },
  mounted() {
    this.openid = wx.getStorageSync("openId") || this.openid;
    //this.searchWords()
    this.getHostData();
  },
  methods: {
     sel(index){
        console.log(index)
        this.index=index
        if(index==1){
            this.order = this.order == 'asc' ? 'desc' : 'asc'
        }else{
           this.order=''
        }
        this.tipsearch()
     },
    async getHostData() {
      const data = await request("/search/indexaction?openId=" + this.openid);
      this.historyData = data.historyData;
      this.hotKeywordList = data.hotKeywordList;
    },
    async searchWords(e) {
      const val = e.currentTarget.dataset.keyword || this.words;
      const data = await request("/search/addhistoryaction", "POST", {
        openId: this.openid,
        keyword: val,
      });
      this.getHostData();
      if(e.currentTarget.dataset.keyword){
         this.words=e.currentTarget.dataset.keyword
         this.tipsearch()
      }
    },
    async tipsearch() {
      const data = await request("/search/searchList", "GET", {
        name: this.words,
        order: this.order,
      });
      this.searchListVal = data.keywords;

    },
    inputFocus() {
      this.searchListVal=[]
      this.tipsearch()
    },
    cancel() {
      this.words = "";
      this.searchListVal=[]
    },
    clearInput() {
      this.words = "";
      this.searchListVal=[]
    },
    async clearHis() {
      const data = await request(
        "/search/clearHistory?openId=" + this.openid,
        "GET"
      );
      this.historyData = data.data;
    },
  },
};
</script>

<style></style>
