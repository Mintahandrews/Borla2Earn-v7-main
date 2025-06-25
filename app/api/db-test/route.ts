import { NextResponse } from 'next/server';
import { db, testConnection } from '@/lib/db/connection';
import { userService } from '@/lib/db/service';

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
    const versionResult = await db.execute(sql`SELECT version()`;
    const version = versionResult[0]?.version || 'unknown';

    // Try to count users
    const users = await userService.findAll();

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
    return NextResponse.json(
      {
        status: 'error',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
