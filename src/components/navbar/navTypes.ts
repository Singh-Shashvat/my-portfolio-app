export interface INavItem {
  label: string;
  href: string;
}

export interface ISiteConfig {
  name: string;
  description: string;
  navItems: INavItem[];
}

// Backwards compatibility alias
export type NavItem = INavItem;
export type SiteConfig = ISiteConfig;
