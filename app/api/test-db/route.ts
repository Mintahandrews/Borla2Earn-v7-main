import { NextResponse } from 'next/server';
import { db, sql, testConnection } from '@/lib/db/neon';
import * as schema from '@/lib/db/schema';

export async function GET() {
  try {
    // Test database connection
    const isConnected = await testConnection();
    
    if (!isConnected) {
      return NextResponse.json(
        { error: 'Database connection failed' },
        { status: 500 }
      );
    }

    // Test a simple query
    const versionResult = await sql`SELECT version()`;
    const version = versionResult[0]?.version || 'unknown';

    // Test a query with the ORM
    const users = await db.select().from(schema.users).limit(5);
    
    return NextResponse.json({
      status: 'success',
      database: {
        version,
        connection: 'OK',
      },
      users: {
        count: users.length,
        sample: users[0] || null,
      },
    });
  } catch (error) {
    console.error('Database test failed:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      {
        status: 'error',
        error: errorMessage,
        details: process.env.NODE_ENV === 'development' ? String(error) : undefined,
      },
      { status: 500 }
    );
  }
}
