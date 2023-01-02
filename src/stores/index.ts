import { createPinia, defineStore } from 'pinia';
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import type { RouteListItem } from '@/router/interface';
import type { GlobalStore, UserInfo } from './interface';
import type { PersistedStateOptions } from "pinia-plugin-persistedstate";
import baseRoutes  from '@/assets/json/common/baseRoutes.json'

const piniaPersistConfig = (key: string) => {
	const persist: PersistedStateOptions = {
		key,
		// storage: window.localStorage
		storage: window.sessionStorage,
	};
	return persist;
};

export const useGlobalStore = defineStore({
  id: 'GlobalStore',
  state: (): GlobalStore => ({
    token: '',
    language: '',
    publicKey: '',
    userInfo: {
      id: 0,
      name: '',
      isAdmin: 0,
    },
    routeList: [],
    isLogin: false,
    baseRouteList: [
      ...baseRoutes
    ],
  }),
  getters: {},
  actions: {
    setToken(token: string) {
      this.token = token;
    },
    updateLanguage(lang: string) {
      this.language = lang;
    },
    updatePublicKey(key: string) {
      this.publicKey = key;
    },
    updateUserInfo(userInfo: UserInfo) {
      this.userInfo = {...userInfo};
    },
    updateRouteList(routeList: RouteListItem[]) {
      this.routeList = routeList;
    },
    updateLogin(status: boolean) {
      this.isLogin = status;
    },
    initGlobalStore() {
      this.userInfo = {
        id: 0,
        name: '',
        isAdmin: 0,
      };
      this.isLogin = false;
      this.token = '';
    },
  },
  persist: piniaPersistConfig("GlobalStore")
})

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

export default pinia;
