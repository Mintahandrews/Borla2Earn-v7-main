import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

export async function GET() {
  const prisma = new PrismaClient({
    log: ['error', 'warn'],
  });

  try {
    // Test database connection by counting users with proper table name
    const userCount = await prisma.$queryRaw`SELECT COUNT(*)::int as count FROM "User"`;
    
    // Get database version
    const result = await prisma.$queryRaw`SELECT version()`;
    
    return NextResponse.json({
      status: 'success',
      userCount: userCount[0]?.count || 0,
      dbVersion: result[0]?.version || 'Unknown',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Database test failed:', error);
    return NextResponse.json(
      { 
        status: 'error',
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
