<template>
   <div class="cart">
    <div class="top">
      <div>30天无忧退货</div>
      <div>48小时快速退款</div>
      <div>满88元免邮费</div>
    </div>
    <div class="cartlist">
      <div class="item" v-for="(item, index) in listData" :key="index">
        <div class="con">
          <div class="left">
            <div class="icon" @click="changeColor(index, item.goods_id)" :class="[Listids[index] ? 'active' : '']"></div>
            <div class="img">
              <img :src="item.list_pic_url" alt="">
            </div>
            <div class="info">
              <p>{{item.goods_name}}</p>
              <p>¥{{item.retail_price}}</p>
            </div>
          </div>
          <div class="right">
            <div class="num">x {{item.number}}</div>
          </div>
        </div>
      </div>
    </div>

    <div class="fixed">
      <div class="left" @click="allCheck" :class="{'active': allcheck}">
        全选({{isCheckedNumber}})
      </div>
      <div class="right">
        <div>¥{{allPrice}}</div>
        <div @click="orderDown">下单</div>
      </div>
    </div>
   </div>
</template>

<script>
import './index.css'
export default {
data(){
    return{
        listData:[],
        Listids:[],
        allPrice:0,
        isCheckedNumber:0
    }
}
}
</script>

<style>

</style>