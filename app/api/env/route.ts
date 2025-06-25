import { NextResponse } from 'next/server';

export async function GET() {
  // Only include non-sensitive information
  const envVars = {
    NODE_ENV: process.env.NODE_ENV,
    DATABASE_URL: process.env.DATABASE_URL ? '***' : undefined,
    DIRECT_URL: process.env.DIRECT_URL ? '***' : undefined,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET ? '***' : undefined,
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
    // Add any other environment variables you want to check
  };

  return NextResponse.json({
    status: 'success',
    env: envVars,
    timestamp: new Date().toISOString()
  });
}
