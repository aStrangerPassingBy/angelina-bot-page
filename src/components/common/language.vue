<script setup lang='ts'>
import { ref, onMounted } from 'vue'
import { useI18n } from 'vue-i18n';
import useGlobalStore from '@/stores';
import { setLocalStorage, getLocalStorage } from '@/utils/utils'

type Props = {
  text: boolean,
  type: 'primary'| 'success'| 'warning'| 'danger'| 'info'| 'text' | '',
  size: 'large'| 'default' | 'small'
}
const emits = defineEmits<{
  (e: 'afterSwitch'): void
}>()

const props = withDefaults(defineProps<Props>(), {
  text: () => false,
  type: () => '',
  size: () => 'default'
}) 

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
      <el-button :type="props.type" :text="props.text" :size="props.size">language</el-button>
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
</style>