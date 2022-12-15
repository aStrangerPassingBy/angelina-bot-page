<script setup lang='ts'>
import { ref, onMounted } from 'vue'
import { useI18n } from 'vue-i18n';
import useGlobalStore from '@/stores';
import { setLocalStorage, getLocalStorage } from '@/utils/utils'

const emits = defineEmits<{
  (e: 'afterSwitch'): void
}>()

const i18n = useI18n();
const globalStore = useGlobalStore();

const language = ref<boolean>(false)

const switchLanguage = (lang: string) => {
  globalStore.updateLanguage(lang);
  i18n.locale.value = lang;
  setLocalStorage('language', lang);
  emits('afterSwitch');
};

onMounted(() => {
  const lang = getLocalStorage('language');
  if(lang === 'en') {
    language.value = false;
    i18n.locale.value = 'en';
  } else {
    language.value = true;
    i18n.locale.value = 'zh';
  }
})
</script>

<template>
  <el-popover
    placement="bottom"
    :width="150"
    trigger="hover">
    <template #reference>
      <img class="language-icon" src="@/assets/images/base/switch-language.svg" alt="">
    </template>
    <ul class="language-list">
      <li class="language-list-item" @click="switchLanguage('zh')">中文</li>
      <li class="language-list-item" @click="switchLanguage('en')">English</li>
    </ul>
  </el-popover>
</template>

<style scoped lang='scss'>
.language-list {
  .language-list-item {
    height: 30px;
    line-height: 30px;
    cursor: pointer;
    user-select: none;
  }
  .language-list-item:hover {
    background: #c6e2ff;
  }
}
.language-icon {
  width: 30px;
  height: 30px;
  cursor: pointer;
}
</style>