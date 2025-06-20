export interface MainNavItem {
  title: string
  href: string
  disabled?: boolean
}

export interface SidebarNavItem {
  title: string
  href?: string
  icon?: any
  items?: {
    name: string
    href: string
    icon?: any
    description?: string
  }[]
}
