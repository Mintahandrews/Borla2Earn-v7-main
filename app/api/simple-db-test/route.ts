import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Simple response without database connection
    return NextResponse.json({
      status: 'success',
      message: 'API endpoint is working',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error in simple test endpoint:', error);
    return NextResponse.json(
      { 
        status: 'error',
        message: 'An error occurred',
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
}
