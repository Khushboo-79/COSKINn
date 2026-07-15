import { 
  LayoutDashboard, Users, Package, ShoppingCart, 
  Tags, Star, Ticket, Image as ImageIcon, Bell, 
  CreditCard, RefreshCcw, FileText, UserCog, 
  ShieldCheck, Settings, Activity, Clock, FileCheck,
  Calendar, Briefcase, FileSignature, Wallet, ClipboardCheck,
  Headphones, MessageSquare, BookOpen, TrendingUp,
  Inbox, Upload, Search, ShieldAlert, FileSearch, Map
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export type SidebarItem = {
  name: string;
  path: string;
  icon: LucideIcon;
};

export type SidebarSection = {
  title?: string;
  items: SidebarItem[];
};

export type ModuleConfig = {
  id: string;
  name: string;
  basePath: string;
  icon: LucideIcon;
  sidebar: SidebarSection[];
};

// --- Module Configurations ---

export const adminModuleConfig: ModuleConfig = {
  id: 'admin',
  name: 'Admin Dashboard',
  basePath: '/admin',
  icon: LayoutDashboard,
  sidebar: [
    {
      items: [
        { name: 'Dashboard', path: '/admin', icon: LayoutDashboard }
      ]
    },
    {
      title: 'MANAGEMENT',
      items: [
        { name: 'Users', path: '/crm', icon: Users },
        { name: 'Products', path: '/product', icon: Package },
        { name: 'Orders', path: '/orders', icon: ShoppingCart },
        { name: 'Categories', path: '/product/categories', icon: Tags },
        { name: 'Brands', path: '/product/brands', icon: Star },
        { name: 'Reviews', path: '/product/reviews', icon: Star },
        { name: 'Coupons', path: '/marketing/coupons', icon: Ticket },
        { name: 'Banners', path: '/marketing/banners', icon: ImageIcon },
        { name: 'Notifications', path: '/marketing/notifications', icon: Bell }
      ]
    },
    {
      title: 'FINANCE',
      items: [
        { name: 'Payments', path: '/finance/payments', icon: CreditCard },
        { name: 'Refunds', path: '/finance/refunds', icon: RefreshCcw },
        { name: 'Reports', path: '/finance/reports', icon: FileText }
      ]
    },
    {
      title: 'SYSTEM',
      items: [
        { name: 'Staff Management', path: '/hr', icon: UserCog },
        { name: 'Roles & Permissions', path: '/admin/security', icon: ShieldCheck },
        { name: 'Settings', path: '/admin/settings', icon: Settings },
        { name: 'Activity Logs', path: '/audit/activity', icon: Activity }
      ]
    }
  ]
};

export const hrModuleConfig: ModuleConfig = {
  id: 'hr',
  name: 'HR Panel',
  basePath: '/hr',
  icon: Users,
  sidebar: [
    {
      items: [
        { name: 'Dashboard', path: '/hr', icon: LayoutDashboard },
        { name: 'Employees', path: '/hr/employees', icon: Users },
        { name: 'Attendance', path: '/hr/attendance', icon: Clock },
        { name: 'Leaves', path: '/hr/leaves', icon: Calendar },
        { name: 'Payroll', path: '/hr/payroll', icon: Wallet },
        { name: 'Performance', path: '/hr/performance', icon: TrendingUp },
        { name: 'Recruitment', path: '/hr/recruitment', icon: Briefcase },
        { name: 'Documents', path: '/hr/documents', icon: FileCheck },
        { name: 'Reports', path: '/hr/reports', icon: FileText },
        { name: 'Settings', path: '/hr/settings', icon: Settings }
      ]
    }
  ]
};

export const financeModuleConfig: ModuleConfig = {
  id: 'finance',
  name: 'Finance Panel',
  basePath: '/finance',
  icon: Wallet,
  sidebar: [
    {
      items: [
        { name: 'Dashboard', path: '/finance', icon: LayoutDashboard },
        { name: 'Transactions', path: '/finance/transactions', icon: Activity },
        { name: 'Orders', path: '/finance/orders', icon: ShoppingCart },
        { name: 'Invoices', path: '/finance/invoices', icon: FileText },
        { name: 'Payments', path: '/finance/payments', icon: CreditCard },
        { name: 'Payouts', path: '/finance/payouts', icon: Wallet },
        { name: 'Refunds', path: '/finance/refunds', icon: RefreshCcw },
        { name: 'Expenses', path: '/finance/expenses', icon: ClipboardCheck },
        { name: 'Taxes', path: '/finance/taxes', icon: FileSignature },
        { name: 'Reports', path: '/finance/reports', icon: FileText },
        { name: 'Accounts', path: '/finance/accounts', icon: Users },
        { name: 'Budgets', path: '/finance/budgets', icon: TrendingUp },
        { name: 'Settings', path: '/finance/settings', icon: Settings }
      ]
    }
  ]
};

export const supportModuleConfig: ModuleConfig = {
  id: 'support',
  name: 'Support Panel',
  basePath: '/support',
  icon: Headphones,
  sidebar: [
    {
      items: [
        { name: 'Dashboard', path: '/support', icon: LayoutDashboard },
        { name: 'Tickets', path: '/support/tickets', icon: Ticket },
        { name: 'Live Chat', path: '/support/chat', icon: MessageSquare },
        { name: 'Customers', path: '/support/customers', icon: Users },
        { name: 'Returns & Refunds', path: '/support/returns', icon: RefreshCcw },
        { name: 'Feedback', path: '/support/feedback', icon: Star },
        { name: 'Knowledge Base', path: '/support/kb', icon: BookOpen },
        { name: 'Canned Responses', path: '/support/responses', icon: FileText },
        { name: 'Reports', path: '/support/reports', icon: Activity },
        { name: 'Settings', path: '/support/settings', icon: Settings }
      ]
    }
  ]
};

export const warehouseModuleConfig: ModuleConfig = {
  id: 'warehouse',
  name: 'Warehouse Panel',
  basePath: '/warehouse',
  icon: Package,
  sidebar: [
    {
      items: [
        { name: 'Dashboard', path: '/warehouse', icon: LayoutDashboard },
        { name: 'Inventory', path: '/warehouse/inventory', icon: Package },
        { name: 'Inbound', path: '/warehouse/inbound', icon: Inbox },
        { name: 'Outbound', path: '/warehouse/outbound', icon: Upload },
        { name: 'Stock Transfers', path: '/warehouse/transfers', icon: RefreshCcw },
        { name: 'Stock Adjustment', path: '/warehouse/adjustments', icon: FileSignature },
        { name: 'Locations & Bins', path: '/warehouse/locations', icon: Map },
        { name: 'Pick, Pack & Ship', path: '/warehouse/fulfillment', icon: ClipboardCheck },
        { name: 'Returns', path: '/warehouse/returns', icon: RefreshCcw },
        { name: 'Suppliers', path: '/warehouse/suppliers', icon: Users },
        { name: 'Reports & Analytics', path: '/warehouse/reports', icon: Activity },
        { name: 'Settings', path: '/warehouse/settings', icon: Settings }
      ]
    }
  ]
};

export const marketingModuleConfig: ModuleConfig = {
  id: 'marketing',
  name: 'Marketing Panel',
  basePath: '/marketing',
  icon: ImageIcon,
  sidebar: [
    {
      items: [
        { name: 'Dashboard', path: '/marketing', icon: LayoutDashboard },
        { name: 'Campaigns', path: '/marketing/campaigns', icon: TrendingUp },
        { name: 'Banners', path: '/marketing/banners', icon: ImageIcon },
        { name: 'Coupons', path: '/marketing/coupons', icon: Ticket },
        { name: 'Push Notifications', path: '/marketing/push', icon: Bell },
        { name: 'Email/SMS', path: '/marketing/emails', icon: MessageSquare },
        { name: 'Influencers', path: '/marketing/influencers', icon: Users },
        { name: 'Content Requests', path: '/marketing/requests', icon: FileCheck },
        { name: 'Analytics', path: '/marketing/analytics', icon: Activity },
        { name: 'Settings', path: '/marketing/settings', icon: Settings }
      ]
    }
  ]
};

export const auditModuleConfig: ModuleConfig = {
  id: 'audit',
  name: 'Audit Panel',
  basePath: '/audit',
  icon: Search,
  sidebar: [
    {
      items: [
        { name: 'Dashboard', path: '/audit', icon: LayoutDashboard },
        { name: 'Transactions', path: '/audit/transactions', icon: Activity },
        { name: 'Orders', path: '/audit/orders', icon: ShoppingCart },
        { name: 'Inventory Audit', path: '/audit/inventory', icon: Package },
        { name: 'Compliance', path: '/audit/compliance', icon: ShieldCheck },
        { name: 'Documents', path: '/audit/documents', icon: FileText },
        { name: 'Risk Flags', path: '/audit/risk', icon: ShieldAlert },
        { name: 'Activity Logs', path: '/audit/activity', icon: Clock },
        { name: 'Reports', path: '/audit/reports', icon: FileSearch },
        { name: 'Settings', path: '/audit/settings', icon: Settings }
      ]
    }
  ]
};

export const contentModuleConfig: ModuleConfig = {
  id: 'content',
  name: 'Content Panel',
  basePath: '/content',
  icon: FileText,
  sidebar: [
    {
      items: [
        { name: 'Dashboard', path: '/content', icon: LayoutDashboard },
        { name: 'Blog Posts', path: '/content/blogs', icon: FileText },
        { name: 'Skincare Tips', path: '/content/tips', icon: BookOpen },
        { name: 'FAQs', path: '/content/faqs', icon: MessageSquare },
        { name: 'Ingredients', path: '/content/ingredients', icon: FileSearch },
        { name: 'App Pages', path: '/content/pages', icon: LayoutDashboard },
        { name: 'Media Library', path: '/content/media', icon: ImageIcon },
        { name: 'Categories', path: '/content/categories', icon: Tags },
        { name: 'Comments', path: '/content/comments', icon: MessageSquare },
        { name: 'Content Requests', path: '/content/requests', icon: FileCheck },
        { name: 'Analytics', path: '/content/analytics', icon: Activity },
        { name: 'Settings', path: '/content/settings', icon: Settings }
      ]
    }
  ]
};

// All available modules
export const ALL_MODULES = [
  adminModuleConfig,
  hrModuleConfig,
  financeModuleConfig,
  supportModuleConfig,
  warehouseModuleConfig,
  marketingModuleConfig,
  auditModuleConfig,
  contentModuleConfig
];
