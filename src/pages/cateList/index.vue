<template>
   <div class="categoryList">
    <scroll-view scroll-x="true" class="head" :scroll-left="scrollLeft">
      <div @click="changeTab(index, item.id)" v-for="(item, index) in navData" :key="index" :class="[nowIndex == index ? 'active' : '']">
        {{item.name}}
      </div>
    </scroll-view>
    <div class="info">
      <p>{{currentNav.name}}</p>
      <p>{{currentNav.front_desc}}</p>
    </div>
    <div class="list" v-if="goodsList!== 0">
      <div class="item" v-for="(item, index) in goodsList" :key="index" @click="goodsDetail(item.id)">
        <img :src="item.list_pic_url" alt="">
        <p class="name">{{item.name}}</p>
        <p class="price">¥ {{item.retail_price}}</p>
      </div>
    </div>
    <div class="none" v-else>数据库暂无数据...</div>
  </div>
</template>

<script>
import { request } from "../../utils/index";
import './index.css'
export default {
   methods:{
      changeTab(index,item){
         this.nowIndex=index
         this.id=item
         if(index>4){
            this.scrollLeft=index*60
         }else{
            this.scrollLeft=0
         }
         this.getHeader()
      },
      goodsDetail(){},
   async  getHeader(){
         const data =await request('/getNavData','GET',{
            id:this.id
         })
         const res=await request('/goodsList','GET',{
            id:this.id
         })
         console.log(res,76)
         this.goodsList=res.data
         this.navData=data.navData
         this.currentNav=data.currentNav
         console.log(data.currentNav,this.currentNav)
      }
   },
  data() {
    return {
       nowIndex:0,
      id: "",
      scrollLeft:'',
      navData:[],
      goodsList:[],
      currentNav:''
    };
  },
  mounted() {
     this.id = this.$root.$mp.query.id||1005000;
   this.getHeader()
  },
};
</script>

<style></style>
