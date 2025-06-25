import { PrismaClient } from '@prisma/client';
import { hash } from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Create admin user
  const admin = await prisma.user.upsert({
    where: { email: 'admin@borla2earn.io' },
    update: {},
    create: {
      name: 'Admin User',
      email: 'admin@borla2earn.io',
      role: 'ADMIN',
      tokens: 1000,
      emailVerified: new Date(),
    },
  });

  // Create demo user
  const demoUser = await prisma.user.upsert({
    where: { email: 'demo@borla2earn.io' },
    update: {},
    create: {
      name: 'Demo User',
      email: 'demo@borla2earn.io',
      role: 'USER',
      tokens: 100,
      emailVerified: new Date(),
    },
  });

  // Create collection centers
  const centers = await Promise.all([
    prisma.collectionCenter.upsert({
      where: { id: '1' },
      update: {},
      create: {
        name: 'Downtown Recycling Center',
        description: 'Main recycling center in downtown area',
        address: '123 Main St, City Center',
        latitude: 40.7128,
        longitude: -74.0060,
        contact: '555-123-4567',
        hours: 'Mon-Fri 8am-6pm, Sat 9am-4pm',
      },
    }),
    // Add more centers as needed
  ]);

  console.log('✅ Database seeded successfully');
  console.log(`👤 Admin user: ${admin.email}`);
  console.log(`👤 Demo user: ${demoUser.email}`);
}

main()
  .catch((e) => {
    console.error('Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
