import type { RouteListItem } from '@/router/interface';

export interface EmitObject {
  token: string,
  routeList: RouteListItem[],
  userInfo: any
}