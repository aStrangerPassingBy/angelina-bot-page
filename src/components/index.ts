import { defineAsyncComponent } from 'vue';
import type { App } from "vue";
import loadingComponent from './common/loadingComponent.vue';
import errorCompnent from './common/errorComponent.vue';

import * as ElementPlusIconsVue from '@element-plus/icons-vue'

export default {
  install(app: App) {
    const componentList = [
      {
        name: 'Language',
      }
    ]
    for(const [key, component] of Object.entries(ElementPlusIconsVue)) {
      app.component(key, component)
    }
    componentList.forEach(item => {
      app.component(item.name, defineAsyncComponent({
          // 加载函数
          loader: () => import(`./common/${item.name}.vue`),
        
          // 加载异步组件时使用的组件
          loadingComponent: loadingComponent,
          // 展示加载组件前的延迟时间，默认为 200ms
          delay: 200,
        
          // 加载失败后展示的组件
          errorComponent: errorCompnent,
          // 如果提供了一个 timeout 时间限制，并超时了
          // 也会显示这里配置的报错组件，默认值是：Infinity
          timeout: 3000
        })
      )
    })
  }
}