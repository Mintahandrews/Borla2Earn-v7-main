import { NextResponse } from 'next/server';
import { Pool } from 'pg';
import * as dotenv from 'dotenv';
import path from 'path';

// Load environment variables directly from .env file
const envPath = path.resolve(process.cwd(), '.env');
dotenv.config({ path: envPath });

export async function GET() {
  const connectionString = process.env.DATABASE_URL;
  
  if (!connectionString) {
    return NextResponse.json(
      { error: 'DATABASE_URL is not set in .env file' },
      { status: 500 }
    );
  }

  const pool = new Pool({
    connectionString,
    ssl: {
      rejectUnauthorized: false // For development only
    },
    connectionTimeoutMillis: 5000
  });

  const client = await pool.connect().catch(err => {
    console.error('Error connecting to the database:', err);
    return null;
  });

  if (!client) {
    return NextResponse.json(
      { 
        error: 'Failed to connect to database',
        connectionString: connectionString.substring(0, 30) + '...' // Show first 30 chars
      },
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
      timestamp: new Date().toISOString(),
      envLoaded: envPath,
      connectionStringPrefix: connectionString.substring(0, 30) + '...'
    });
  } catch (error) {
    console.error('Database query failed:', error);
    return NextResponse.json(
      { 
        error: 'Database query failed',
        details: error instanceof Error ? error.message : 'Unknown error',
        connectionStringPrefix: connectionString.substring(0, 30) + '...'
      },
      { status: 500 }
    );
  } finally {
    client.release();
    await pool.end();
  }
}
