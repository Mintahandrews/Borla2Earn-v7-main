import { NextResponse } from 'next/server';
import { Pool } from 'pg';

export async function GET() {
  console.log('Starting simple test endpoint...');
  
  if (!process.env.DATABASE_URL) {
    console.error('DATABASE_URL is not set');
    return NextResponse.json(
      { error: 'Database URL not configured' },
      { status: 500 }
    );
  }

  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.NODE_ENV === 'production' 
      ? { rejectUnauthorized: true }
      : { rejectUnauthorized: false },
  });

  const client = await pool.connect().catch(err => {
    console.error('Failed to connect to database:', err);
    return null;
  });

  if (!client) {
    return NextResponse.json(
      { error: 'Failed to connect to database' },
      { status: 500 }
    );
  }

  try {
    console.log('Connected to database, running test query...');
    const result = await client.query('SELECT 1 as test');
    console.log('Test query result:', result.rows[0]);
    
    return NextResponse.json({
      status: 'success',
      test: result.rows[0],
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Database query failed:', error);
    return NextResponse.json(
      { 
        error: 'Database query failed',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  } finally {
    client.release();
    await pool.end();
  }
}
