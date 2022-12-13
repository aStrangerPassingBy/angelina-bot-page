import layout from '@/layout/layout.vue'

export default [
  {
    path: '/config',
    component: layout,
    meta: {
      level: 1,
      title: '配置中心',
      titleEn: 'Config Center'
    },
    children: [
      {
        path: '/config/dictionary',
        name: 'Dictionary',
        meta: {
          level: 2
        },
        component: () => import('@/views/modules/config/dictionary.vue')
      }
    ]
  },
  {
    path: '/settings',
    component: layout,
    meta: {
      level: 1,
      title: '设置',
      titleEn: 'setting'
    },
    children: [
      {
        path: '/setting/person',
        name: "Person",
        meta: {
          level: 2
        },
        component: () => import('@/views/modules/setting/person.vue')
      }
    ]
  }
]