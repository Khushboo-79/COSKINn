const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function seed() {
  const count = await prisma.employee.count();
  if (count > 0) {
    console.log('Already seeded');
    return;
  }

  const emps = [
    { name: 'Priya Sharma', email: 'priya@coskinn.com', phone: '+91 98765 43210', role: 'Senior Developer', department: 'Engineering', salary: 120000, joinDate: new Date('2024-03-15') },
    { name: 'Rahul Verma', email: 'rahul@coskinn.com', phone: '+91 98765 43211', role: 'Product Manager', department: 'Product', salary: 140000, joinDate: new Date('2024-01-10') },
    { name: 'Anita Desai', email: 'anita@coskinn.com', phone: '+91 98765 43212', role: 'UI/UX Designer', department: 'Design', salary: 90000, joinDate: new Date('2024-06-01') },
    { name: 'Vikram Patel', email: 'vikram@coskinn.com', phone: '+91 98765 43213', role: 'Marketing Lead', department: 'Marketing', salary: 95000, joinDate: new Date('2023-11-20') },
  ];

  for (const e of emps) {
    const created = await prisma.employee.create({
      data: {
        ...e,
        status: 'Active',
        leaveBalance: 15,
        avatar: e.name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0,2)
      }
    });
    
    await prisma.leaveRequest.create({
      data: {
        employeeId: created.id,
        type: 'Sick Leave',
        fromDate: new Date(),
        toDate: new Date(Date.now() + 86400000 * 2),
        days: 2,
        reason: 'Fever'
      }
    });
  }
  console.log('seeded');
}
seed();
