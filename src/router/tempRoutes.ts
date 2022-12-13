import layout from '@/layout/layout.vue'
export default [
  {
    path: '/config',
    component: layout,
    children: [
      {
        path: '/config/dictionary',
        name: 'Dictionary',
        component: () => import('@/views/modules/config/dictionary.vue')
      }
    ]
  }
]