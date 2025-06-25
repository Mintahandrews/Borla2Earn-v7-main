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
  
  // Configure the Prisma client to work with NeonDB's connection pooler
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
export const prisma = global.prisma || createPrismaClient();

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

export * from '@prisma/client';
