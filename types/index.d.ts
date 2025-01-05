import MainNav from '../components/main-nav';
import { type } from '../.contentlayer/generated/types';
import { Icon } from '@/components/icon';

export type NavItem = {
  title: string;
  href: string;
  disabled?: boolean;
};

export type SiteConfig = {
  name: string;
  description: string;
  url: string;
  ogImage: string;
  links: {
    x: string;
    github: string;
  };
};

export type MarketingConfig = {
  mainNav: NavItem[];
};

export type TechItem = {
  techName: string;
  body: string;
  svgIcon: string;
};

export type TechStackConfig = {
  techStack: TechItem[];
};

export type SidebarNavItem = {
  title: string;
  disabled?: boolean;
  external?: boolean;
  icon?: keyof typeof Icon;
} & (
  | {
      href: string;
      items?: never;
    }
  | {
      href?: string;
      items: NavItem;
    }
);

export type DashboardConfig = {
  mainNav: NavItem[];
  sidebarNav: SidebarNavItem[];
};
