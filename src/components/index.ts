import type { App } from "vue";

import * as ElementPlusIconsVue from '@element-plus/icons-vue';

type Component = {
  name: string,
  component: string
};

const componentList: Component[] = [
  {
    name: 'language',
    component: './common/language.vue'
  }
];
export default {
  install(app: App) {
    const modules = import.meta.glob('./common/*.vue');

    // 注册element-plus的图标
    for(const [key, component] of Object.entries(ElementPlusIconsVue)) {
      app.component(key, component)
    }

    // 遍历并且注册全局组件
    componentList.forEach((item: Component) => {
      app.component(item.name, modules[item.component]);
    })
  }
}