import { PrismaClient } from '@prisma/client';

async function testConnection() {
  const prisma = new PrismaClient({
    log: ['query', 'error', 'warn'],
  });

  try {
    console.log('Testing database connection...');
    
    // Test raw query
    const result = await prisma.$queryRaw`SELECT version()`;
    console.log('Database version:', result[0]?.version);
    
    // Test user count
    const userCount = await prisma.$queryRaw`SELECT COUNT(*)::int as count FROM "User"`;
    console.log('Total users:', userCount[0]?.count);
    
    console.log('Connection test successful!');
  } catch (error) {
    console.error('Connection test failed:', error);
  } finally {
    await prisma.$disconnect();
  }
}

testConnection()
  .catch((e) => {
    console.error('Error:', e);
    process.exit(1);
  })
  .finally(async () => {
    process.exit(0);
  });
