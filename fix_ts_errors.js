const fs = require('fs');
const path = require('path');

const filesToFix = [
  'src/components/PanelHeader.tsx',
  'src/components/StatCard.tsx',
  'src/modules/content/ContentPanel.tsx',
  'src/modules/finance/FinancePanel.tsx',
  'src/modules/hr/HRPanel.tsx',
  'src/modules/support/SupportPanel.tsx',
  'src/modules/warehouse/WarehousePanel.tsx',
  'src/modules/marketing/CouponManager.tsx',
  'src/modules/marketing/MarketingPanel.tsx',
];

const basePath = path.join(__dirname, 'apps', 'internal-panel');

// Type imports fix
for (const file of ['src/components/PanelHeader.tsx', 'src/components/StatCard.tsx']) {
  const p = path.join(basePath, file);
  if (fs.existsSync(p)) {
    let content = fs.readFileSync(p, 'utf8');
    content = content.replace("import { LucideIcon } from 'lucide-react';", "import type { LucideIcon } from 'lucide-react';");
    fs.writeFileSync(p, content);
  }
}

// Unused imports fix
const unusedMap = {
  'src/modules/content/ContentPanel.tsx': ['Filter', 'Clock', 'BarChart3', 'TrendingUp'],
  'src/modules/finance/FinancePanel.tsx': ['DollarSign', 'Calendar'],
  'src/modules/hr/HRPanel.tsx': ['Clock', 'Filter', 'Phone', 'MapPin', 'Briefcase', 'GraduationCap', 'ChevronRight', 'Plus', 'Eye'],
  'src/modules/marketing/CouponManager.tsx': ['X'],
  'src/modules/marketing/MarketingPanel.tsx': ['useState'],
  'src/modules/support/SupportPanel.tsx': ['Filter', 'XCircle', 'ArrowUpRight'],
  'src/modules/warehouse/WarehousePanel.tsx': ['Package', 'Filter', 'CheckCircle2', 'BarChart3', 'Eye']
};

for (const [file, unusedList] of Object.entries(unusedMap)) {
  const p = path.join(basePath, file);
  if (fs.existsSync(p)) {
    let content = fs.readFileSync(p, 'utf8');
    for (const unused of unusedList) {
      if (unused === 'useState') {
        content = content.replace("import { useState } from 'react';", "");
      } else {
        const regex = new RegExp(`\\b${unused}\\b\\s*,?`, 'g');
        content = content.replace(regex, '');
      }
    }
    // Clean up empty imports or trailing commas in lucide-react if needed, but TS might be fine if we just strip the words.
    // Let's do a better replace for lucide-react specifically:
    const lucideImportMatch = content.match(/import\s+{([^}]+)}\s+from\s+['"]lucide-react['"];/);
    if (lucideImportMatch) {
      let imported = lucideImportMatch[1];
      for (const unused of unusedList) {
         imported = imported.replace(new RegExp(`\\b${unused}\\b\\s*,?`, 'g'), '');
      }
      imported = imported.replace(/,\s*,/g, ',').replace(/,\s*$/g, '').trim();
      content = content.replace(lucideImportMatch[0], `import { ${imported} } from 'lucide-react';`);
    }
    
    fs.writeFileSync(p, content);
  }
}

console.log("Fixed unused imports.");
