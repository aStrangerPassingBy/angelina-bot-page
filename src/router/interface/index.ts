export interface RouteListItem {
  id: string | number,
  level: number,
  path: string,
  name: string,
  titleCn: string,
  titleEn: string,
  hasChildren: boolean,
  componentPath: string,
  children: RouteListItem[]
}