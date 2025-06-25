import { NextResponse } from 'next/server';
import { testConnection } from '@/lib/db-utils';

export async function GET() {
  try {
    console.log('Testing database connection with db-utils...');
    
    const result = await testConnection();
    
    if (!result.success) {
      return NextResponse.json(
        { 
          status: 'error',
          message: 'Failed to connect to the database',
          error: result.error,
          timestamp: new Date().toISOString()
        },
        { status: 500 }
      );
    }
    
    return NextResponse.json({
      status: 'success',
      message: 'Successfully connected to the database',
      version: result.version,
      userCount: result.userCount,
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('Database test failed:', error);
    return NextResponse.json(
      { 
        status: 'error',
        message: 'Database test failed',
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
}
