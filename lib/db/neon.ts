import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema';
import { ENV } from '@/lib/env';

// Create a simple database client
export const sql = neon(ENV.DATABASE_URL);

export const db = drizzle(sql, { 
  schema,
  logger: ENV.NODE_ENV === 'development'
});

// Test the database connection
export async function testConnection() {
  try {
    console.log('🔍 Testing database connection...');
    const result = await sql`SELECT version()`;
    console.log('✅ Database connected:', result[0]);
    return true;
  } catch (error) {
    console.error('❌ Database connection failed:', error);
    return false;
  }
}

// Export types for better TypeScript support
export type * from './schema';
