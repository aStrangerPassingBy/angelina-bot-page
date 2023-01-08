<script setup lang="ts">
import botListBox from './components/botListBox.vue';
import fnSituation from './components/fnSituation.vue';
import tokenSituation from './components/tokenSituation.vue';
</script>

<template>
  <div class="console-box">
    <div class="console-box-left">
      <botListBox class="boxList-box box-shadow"></botListBox>
    </div>
    <div class="console-box-right">
      <tokenSituation class="tokenSituation-box box-shadow"></tokenSituation>
      <fnSituation class="fnSituation-box box-shadow"></fnSituation>
    </div>
  </div>
</template>

<style scoped lang="scss">
.console-box {
  display: flex;
  width: 100%;
  height: 100%;
  .console-box-left {
    width: 50%;
    margin: 10px;
    .boxList-box {
      height: 100%;
    }
  }
  .console-box-right {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 50%;
    margin: 10px;
    .tokenSituation-box{
      height: 45%;
    }
    .fnSituation-box {
      height: 50%;
    }
  }
}
.box-shadow {
  box-sizing: border-box;
  border: 1px solid #ccc;
  border-radius: 10px;
  box-shadow: 5px 5px 5px #888888;
  padding: 10px;
}
</style>