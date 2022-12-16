<script setup lang='ts'>

</script>

<template>
  <el-carousel
    height="200px"
    trigger="click"
    arrow="hover"
    interval="5000">
    <el-carousel-item v-for="item in 4" :key="item">
      <div class="carousel-box">
        <h1>{{item}}</h1>
      </div>
    </el-carousel-item>
  </el-carousel>
</template>

<style scoped lang='scss'>
.carousel-box {
  box-sizing: border-box;
  height: 100%;
  width: 100%;
  padding: 0 100px;
  background: #ccc;
}
.el-carousel__item:nth-child(n) {
  background-color: #F0F2F5;
}
</style>