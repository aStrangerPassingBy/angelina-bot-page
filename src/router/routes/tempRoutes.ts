import layout from '@/layout/layout.vue'

export default [
  {
    path: '/config',
    component: layout,
    meta: {
      id: 1,
      level: 1,
      titleCn: '配置中心',
      titleEn: 'Config Center',
      name: 'config',
      icon: '',
    },
    children: [
      {
        path: '/config/dictionary',
        name: 'Dictionary',
        component: () => import('@/views/modules/config/dictionary.vue'),
      },
      {
        path: '/config/notice',
        name: 'Notice',
        component: () => import('@/views/modules/config/notice.vue'),
      }
    ]
  },
  {
    path: '/console',
    component: layout,
    meta: {
      id: 2,
      level: 1,
      titleCn: '控制台',
      titleEn: 'Console',
      name: 'console',
      icon: '',
    },
    children: [
      {
        path: '/console/console',
        name: 'Console',
        component: () => import('@/views/modules/config/notice.vue')
      }
    ]
  },
  {
    path: '/settings',
    component: layout,
    meta: {
      id: 3,
      level: 1,
      titleCn: '设置',
      titleEn: 'Settings',
      name: 'settings',
      icon: '',
    },
    children: [
      {
        path: '/settings/settings',
        name: 'Settings',
        component: () => import('@/views/modules/settings/settings.vue')
      }
    ]
  }
]