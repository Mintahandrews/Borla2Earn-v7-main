import { NextResponse } from 'next/server';
import { prisma, testConnection } from '@/lib/db';

export async function GET() {
  try {
    // Test the database connection using our utility function
    const connectionTest = await testConnection();
    
    if (!connectionTest.success) {
      return NextResponse.json(
        { 
          status: 'error',
          message: 'Failed to connect to database',
          error: connectionTest.error,
          timestamp: new Date().toISOString()
        },
        { status: 500 }
      );
    }

    // If we got here, the connection was successful
    return NextResponse.json({
      status: 'success',
      message: 'Successfully connected to the database',
      ...connectionTest,
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('Connection test failed:', error);
    return NextResponse.json(
      { 
        status: 'error',
        message: 'An unexpected error occurred',
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
}
