export interface NavItem  {
  label: string;
  href: string;
};


export interface SiteConfig  {
  name: string;
  description: string;
  navItems: NavItem[];
};