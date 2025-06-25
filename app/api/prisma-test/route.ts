import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

// Create a new Prisma client instance for this request
const prisma = new PrismaClient({
  log: ['error', 'warn'],
  datasources: {
    db: {
      url: process.env.DATABASE_URL,
    },
  },
});

export async function GET() {
  try {
    console.log('Attempting to connect to the database...');
    
    // Test the connection with a simple query
    const version = await prisma.$queryRaw`SELECT version()`;
    
    // Get user count
    const userCount = await prisma.user.count();
    
    return NextResponse.json({
      status: 'success',
      message: 'Successfully connected to the database',
      version: version[0]?.version || 'Unknown',
      userCount,
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('Database connection failed:', error);
    return NextResponse.json(
      { 
        status: 'error',
        message: 'Failed to connect to the database',
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString(),
        // Include the connection string for debugging (remove in production)
        connectionString: process.env.DATABASE_URL 
          ? 'Configured' 
          : 'Missing DATABASE_URL in environment variables'
      },
      { status: 500 }
    );
  } finally {
    // Always disconnect the client
    await prisma.$disconnect().catch(console.error);
  }
}
