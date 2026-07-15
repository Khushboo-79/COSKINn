export const AppRole = {
  SUPER_ADMIN: 'SUPER_ADMIN',
  PRODUCT_MANAGER: 'PRODUCT_MANAGER',
  AUDITOR: 'AUDITOR',
  FINANCE_MANAGER: 'FINANCE_MANAGER',
  INVENTORY_MANAGER: 'INVENTORY_MANAGER',
  ORDER_MANAGER: 'ORDER_MANAGER',
  WAREHOUSE_MANAGER: 'WAREHOUSE_MANAGER',
  SUPPORT_AGENT: 'SUPPORT_AGENT',
  MARKETING_MANAGER: 'MARKETING_MANAGER',
  CONTENT_MANAGER: 'CONTENT_MANAGER',
  HR_MANAGER: 'HR_MANAGER'
} as const;

export type AppRole = typeof AppRole[keyof typeof AppRole];

export const ROLE_PERMISSIONS: Record<AppRole, string[]> = {
  [AppRole.SUPER_ADMIN]: ['*'], // Access to everything
  [AppRole.PRODUCT_MANAGER]: ['/product'],
  [AppRole.AUDITOR]: ['/audit'],
  [AppRole.FINANCE_MANAGER]: ['/finance'],
  [AppRole.INVENTORY_MANAGER]: ['/inventory'],
  [AppRole.ORDER_MANAGER]: ['/orders'],
  [AppRole.WAREHOUSE_MANAGER]: ['/warehouse'],
  [AppRole.SUPPORT_AGENT]: ['/support'],
  [AppRole.MARKETING_MANAGER]: ['/marketing'],
  [AppRole.CONTENT_MANAGER]: ['/content'],
  [AppRole.HR_MANAGER]: ['/hr'],
};

export const hasPermission = (role: AppRole, path: string): boolean => {
  const allowedPaths = ROLE_PERMISSIONS[role] || [];
  if (allowedPaths.includes('*')) return true;
  
  // Base paths
  if (path === '/' || path === '') return true;
  
  return allowedPaths.some(allowedPath => path.startsWith(allowedPath));
};
