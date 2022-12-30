import { defineStore } from 'pinia';
import type { GlobalStore, UserInfo } from './interface';

const useGlobalStore = defineStore({
  id: 'globalStore',
  state: (): GlobalStore => ({
    token: '',
    language: '',
    publicKey: '',
    userInfo: {
      name: '',
      isAdmin: 0,
    }
  }),
  getters: {},
  actions: {
    setToken(token: string) {
      this.token = token;
    },
    clearToken() {
      this.token = '';
    },
    updateLanguage(lang: string) {
      this.language = lang;
    },
    updatePublicKey(key: string) {
      this.publicKey = key;
    },
    updateUserInfo(userInfo: UserInfo) {
      this.userInfo = {...userInfo};
    }
  },
})

export default useGlobalStore
