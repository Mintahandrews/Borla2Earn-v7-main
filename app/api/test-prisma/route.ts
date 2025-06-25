import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma-client';

export async function GET() {
  try {
    console.log('Testing Prisma client connection...');
    
    // Test the connection with a simple query
    const version = await prisma.$queryRaw`SELECT version()`;
    
    // Get user count
    const userCount = await prisma.user.count();
    
    return NextResponse.json({
      status: 'success',
      message: 'Successfully connected to the database with Prisma',
      version: version[0]?.version || 'Unknown',
      userCount,
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('Prisma client connection failed:', error);
    return NextResponse.json(
      { 
        status: 'error',
        message: 'Failed to connect to the database with Prisma',
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString(),
        connectionString: process.env.DATABASE_URL 
          ? 'Configured' 
          : 'Missing DATABASE_URL in environment variables'
      },
      { status: 500 }
    );
  }
}
