import { PrismaClient } from '@prisma/client';

// PrismaClient is attached to the `global` object in development to prevent
// exhausting your database connection limit.
declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

// Create a new Prisma client with connection pooling for serverless environments
const createPrismaClient = () => {
  console.log('Creating new Prisma client instance...');
  
  // Configure the Prisma client with connection pooling
  const prisma = new PrismaClient({
    datasources: {
      db: {
        url: process.env.DATABASE_URL,
      },
    },
    log: process.env.NODE_ENV === 'development' 
      ? ['query', 'error', 'warn'] 
      : ['error'],
  });

  // Add error handling for the connection
  prisma.$on('beforeExit' as never, async () => {
    console.log('Prisma client is disconnecting...');
  });

  prisma.$on('error' as never, (e: unknown) => {
    console.error('Prisma client error:', e);
  });

  return prisma;
};

// Ensure we only create one instance of Prisma Client in development
const prisma = global.prisma || createPrismaClient();

if (process.env.NODE_ENV !== 'production') {
  global.prisma = prisma;
}

// Handle clean shutdown
const cleanup = async () => {
  if (process.env.NODE_ENV === 'test') return;
  
  try {
    await prisma.$disconnect();
    console.log('Prisma client disconnected');
  } catch (error) {
    console.error('Error disconnecting Prisma client:', error);
    process.exit(1);
  }
};

process.on('beforeExit', cleanup);
process.on('SIGINT', cleanup);
process.on('SIGTERM', cleanup);

// Export the Prisma client and types
export { prisma };
export * from '@prisma/client';

// Export a function to test the database connection
export const testConnection = async () => {
  try {
    console.log('Testing database connection...');
    await prisma.$connect();
    const version = await prisma.$queryRaw`SELECT version()`;
    const userCount = await prisma.user.count();
    
    return { 
      success: true, 
      version: version[0]?.version || 'Unknown',
      userCount,
      timestamp: new Date().toISOString()
    };
  } catch (error) {
    console.error('Database connection test failed:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    };
  } finally {
    await prisma.$disconnect().catch(console.error);
  }
};
