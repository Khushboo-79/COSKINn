const fs = require('fs');
let schema = fs.readFileSync('prisma/schema.prisma', 'utf8');

if (!schema.includes('model FinancialNote')) {
  schema += '\nmodel FinancialNote {\n  id String @id @default(uuid())\n  type String\n  referenceType String\n  referenceId String\n  amount Float\n  reason String\n  status String @default("DRAFT")\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n\n  @@map("financial_notes")\n}\n';
}

if (!schema.includes('model SupportSettings')) {
  schema += '\nmodel SupportSettings {\n  id String @id @default(uuid())\n  enableAutoReply Boolean @default(true)\n  autoReplyMessage String @default("We have received your message and will get back to you shortly.")\n  workingHoursStart String @default("09:00")\n  workingHoursEnd String @default("18:00")\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n\n  @@map("support_settings")\n}\n';
}

fs.writeFileSync('prisma/schema.prisma', schema);
console.log('Appended safely.');
