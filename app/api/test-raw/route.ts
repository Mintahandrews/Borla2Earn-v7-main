import { NextResponse } from 'next/server';
import { Pool } from 'pg';
import { readFileSync } from 'fs';
import path from 'path';

// Function to parse .env file manually
function parseEnvFile() {
  try {
    const envPath = path.resolve(process.cwd(), '.env');
    const envFile = readFileSync(envPath, 'utf8');
    const envVars = {} as Record<string, string>;
    
    envFile.split('\n').forEach(line => {
      const match = line.match(/^([^=:#]+?)[=:](.*)/);
      if (match) {
        const key = match[1].trim();
        const value = match[2].trim().replace(/(^['"]|['"]$)/g, '');
        envVars[key] = value;
      }
    });
    
    return envVars;
  } catch (error) {
    console.error('Error reading .env file:', error);
    return {};
  }
}

export async function GET() {
  // Load environment variables directly from .env file
  const envVars = parseEnvFile();
  const connectionString = envVars.DATABASE_URL;
  
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
        connectionStringPrefix: connectionString.substring(0, 30) + '...'
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
      connectionStringPrefix: connectionString.substring(0, 30) + '...',
      envSource: 'Direct .env file read'
    });
  } catch (error) {
    console.error('Database query failed:', error);
    return NextResponse.json(
      { 
        error: 'Database query failed',
        details: error instanceof Error ? error.message : 'Unknown error',
        connectionStringPrefix: connectionString.substring(0, 30) + '...',
        envSource: 'Direct .env file read'
      },
      { status: 500 }
    );
  } finally {
    client.release();
    await pool.end();
  }
}
