import { NextResponse } from 'next/server';
import { Pool } from 'pg';

export async function GET() {
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false // For development only
    }
  });

  const client = await pool.connect().catch(err => {
    console.error('Error connecting to the database:', err);
    return null;
  });

  if (!client) {
    return NextResponse.json(
      { error: 'Failed to connect to database' },
      { status: 500 }
    );
  }

  try {
    const result = await client.query('SELECT version()');
    const userCountResult = await client.query('SELECT COUNT(*) as count FROM "User"');
    
    return NextResponse.json({
      status: 'success',
      version: result.rows[0]?.version || 'Unknown',
      userCount: userCountResult.rows[0]?.count || 0,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Database query failed:', error);
    return NextResponse.json(
      { 
        error: 'Database query failed',
        details: error instanceof Error ? error.message : 'Unknown error',
        connectionString: process.env.DATABASE_URL
      },
      { status: 500 }
    );
  } finally {
    client.release();
    await pool.end();
  }
}
