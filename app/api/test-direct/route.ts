import { Pool } from 'pg';
import { NextResponse } from 'next/server';

export async function GET() {
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false, // For development only
    },
  });

  const client = await pool.connect();

  try {
    // Test query
    const versionResult = await client.query('SELECT version()');
    const userCountResult = await client.query('SELECT COUNT(*) FROM "User"');
    
    return NextResponse.json({
      status: 'success',
      dbVersion: versionResult.rows[0]?.version || 'Unknown',
      userCount: parseInt(userCountResult.rows[0]?.count || '0', 10),
      timestamp: new Date().toISOString(),
      connection: 'successful'
    });
  } catch (error) {
    console.error('Direct database test failed:', error);
    return NextResponse.json(
      { 
        status: 'error',
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString(),
        connection: 'failed',
        connectionString: process.env.DATABASE_URL ? 'present' : 'missing'
      },
      { status: 500 }
    );
  } finally {
    client.release();
    await pool.end();
  }
}
