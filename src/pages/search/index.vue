<template>
   <div class="search">
      <div class="header">
      <div class="div">
        <img src="http://nos.netease.com/mailpub/hxm/yanxuan-wap/p/20150730/style/img/icon-normal/search2-2fb94833aa.png" alt="">
        <input type="text" confirm-type="search" focus="true" v-model="words" @focus="inputFocus" @input="tipsearch" @confirm="searchWords" placeholder="商品搜索">
        <img @click="clearInput" class="del" src="http://nos.netease.com/mailpub/hxm/yanxuan-wap/p/20150730/style/img/icon-normal/clearIpt-f71b83e3c2.png" alt="">
      </div>
      <div @click="cancel">取消</div>
    </div>
    <div v-if="words"></div>
    <div v-else>
    <div class="history">
       <div class="his_top">
          <span>搜索记录</span>
          <span></span>
       </div>
       <ul class="his_list">
          <li v-for="(item,index) in historyData" :key="index" @click="searchWords(item.keyword)">{{item.keyword}}</li>
           
       </ul>
    </div>
     <div class="history hotHis">
       <div class="his_top">
          <span>热门搜索</span>
       </div>
       <ul class="his_list">
          <li v-for="(item,index) in hotKeywordList" :class="{active:item.is_hot==1}"  :key="index" @click="searchWords(item.keyword)">{{item.keyword}}</li>
           
       </ul>
    </div>
    </div>
   </div>
</template>

<script>
import './index.css'
import { request } from "../../utils/index";
export default {
   data(){
      return {
         words:'',
         openid: '',
         historyData:[],
        hotKeywordList:[]
      }
   },
   mounted(){
      this.openid = wx.getStorageSync('openId') || '';
      this.searchWords()
   },
   methods:{
     async getHostData(){
         const data=await request("/search/indexaction?openId="+this.words)
         this.historyData=data.historyData
         this.hotKeywordList=data.hotKeywordList
      },
      async searchWords(e){
         const val=1||this.words
          const data=await request("/search/addhistoryaction",'POST',{
             openId:this.words,
             keyword:val
          })
         this.getHostData()
         console.log(data)
      },
      tipsearch(){},
      inputFocus(){},
      cancel(){
         this.words=''
      },
      clearInput(){

      }
   }
}
</script>

<style>

</style>