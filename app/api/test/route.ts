import { prisma, testConnection } from '@/lib/db';
import { NextResponse } from 'next/server';

interface UserCount {
  count: number;
}

interface DbVersion {
  version: string;
}

export async function GET() {
  try {
    // Test the database connection first
    const connectionTest = await testConnection();
    
    if (!connectionTest.success) {
      throw new Error('Database connection test failed');
    }

    // Test database connection by counting users with proper table name
    const userCount = await prisma.$queryRaw<UserCount[]>`SELECT COUNT(*)::int as count FROM "User"`;
    
    // Get database version
    const result = await prisma.$queryRaw<DbVersion[]>`SELECT version()`;
    
    // Get database name and current user
    const dbInfo = await prisma.$queryRaw`SELECT current_database(), current_user`;
    
    return NextResponse.json({
      status: 'success',
      userCount: userCount[0]?.count || 0,
      dbVersion: result[0]?.version || 'Unknown',
      dbInfo: dbInfo[0] || {},
      connectionTest: connectionTest,
      timestamp: new Date().toISOString(),
      connection: 'successful'
    });
  } catch (error) {
    console.error('Database test failed:', error);
    return NextResponse.json(
      { 
        status: 'error',
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString(),
        connection: 'failed',
        connectionUrl: process.env.DATABASE_URL 
          ? 'Configured' 
          : 'Missing DATABASE_URL in environment variables'
      },
      { status: 500 }
    );
  }
}
