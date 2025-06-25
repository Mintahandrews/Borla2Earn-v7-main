import { NextResponse } from 'next/server';
import { ENV } from '@/lib/env';

export async function GET() {
  try {
    // Basic environment info
    const envInfo = {
      nodeEnv: ENV.NODE_ENV,
      nodeVersion: process.version,
      platform: process.platform,
      // Database URL with sensitive info redacted
      databaseUrl: ENV.DATABASE_URL 
        ? `${ENV.DATABASE_URL.split('@')[0]}@${ENV.DATABASE_URL.split('@')[1]?.split('?')[0]}` 
        : 'Not set',
      databaseSsl: ENV.DATABASE_URL?.includes('sslmode=require') ? 'enabled' : 'disabled',
    };

    // Test database connection
    let dbTest = { status: 'not_attempted', error: null };
    
    try {
      const { sql } = await import('@/lib/db/connection');
      const result = await sql`SELECT version() as version`;
      dbTest = { 
        status: 'success', 
        version: result[0]?.version 
      };
    } catch (error) {
      dbTest = { 
        status: 'error', 
        error: error.message,
        stack: error.stack
      };
    }

    return NextResponse.json({
      status: 'success',
      env: envInfo,
      database: dbTest,
      // Include raw env vars (be careful with this in production)
      rawEnv: process.env.NODE_ENV === 'development' ? {
        NODE_ENV: process.env.NODE_ENV,
        NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
        NEXTAUTH_URL: process.env.NEXTAUTH_URL,
      } : 'Available in development only'
    });

  } catch (error) {
    console.error('Environment check failed:', error);
    return NextResponse.json(
      {
        status: 'error',
        error: error.message,
        stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
      },
      { status: 500 }
    );
  }
}
