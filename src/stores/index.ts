import { defineStore } from 'pinia'
import type { GlobalStore } from './interface'

const useGlobalStore = defineStore({
  id: 'globalStore',
  state: (): GlobalStore => ({
    token: '',
    language: ''
  }),
  getters: {},
  actions: {
    setToken(token: string) {
      this.token = token
    },
    updateLanguage(lang: string) {
      this.language = lang
    }
  },
})

export default useGlobalStore
