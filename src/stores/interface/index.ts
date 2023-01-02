import type { RouteListItem } from "@/router/interface"

export interface GlobalStore {
  token: string,
  language: string,
  userInfo: UserInfo,
  publicKey: string,
  isLogin: boolean,
  routeList: RouteListItem[],
  baseRouteList: RouteListItem[]
}

export interface UserInfo {
  id: number,
  name: string,
  isAdmin: 0 | 1,
}