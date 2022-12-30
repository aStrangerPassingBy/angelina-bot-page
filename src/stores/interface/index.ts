export interface GlobalStore {
  token: string,
  language: string,
  userInfo: UserInfo,
  publicKey: string
}

export interface UserInfo {
  name: string,
  isAdmin: 0 | 1
}