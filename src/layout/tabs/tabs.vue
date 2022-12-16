<script setup lang='ts'>
import { ref, reactive } from 'vue';

const tabScroll = ref();

const menuList = reactive([
  {
    name: 'menu1'
  },
  {
    name: 'menu2'
  },
  {
    name: 'menu3'
  },
  {
    name: 'menu4'
  },
  {
    name: 'menu5'
  }
])

const clickMenu = (e: any) => {
  tabScroll.value.style.top = e.target.offsetTop + 'px';
}
</script>

<template>
  <div class="tabs-box">
    <div class="tab-scroll" ref="tabScroll"></div>
    <ul>
      <li
        class="tabs-item"
        v-for="item in menuList"
        :key="item.name"
        @click="clickMenu($event)">
        {{ item.name }}
      </li>
    </ul>
  </div>
  
</template>

<style scoped lang='scss'>
.tabs-box {
  margin-left: 10px;
  flex: 2;
  position: relative;
  ul {
    width: 100%;
    height: 100%;
    li {
      height: 40px;
      line-height: 40px;
      border-left: 3px solid #ccc;
      padding-left: 30px;
      cursor: pointer;
    }
  }
  .tab-scroll {
    position: absolute;
    left: 0;
    top: 0;
    height: 40px;
    width: 3px;
    background: #79bbff;
    transition: top .3s;
  }
}
// .tabs {
//   flex: 2;
//   .tabs-item {
//     
//   }
//   
// }
</style>