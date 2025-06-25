import { neon, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema';
import { ENV } from '@/lib/env';

// Initialize NeonDB connection
neonConfig.fetchConnectionCache = true;

// Enable debug logging in development
if (ENV.NODE_ENV === 'development') {
  (neonConfig as any).debug = true;
  neonConfig.pipelineConnect = false;
}

// Create database client
// Create database client
// Simple database client without connection pooling
export const sql = neon(ENV.DATABASE_URL);

export const db = drizzle(sql, { 
  schema,
  logger: ENV.NODE_ENV === 'development'
});

// Helper functions
export async function executeQuery<T = any>(
  query: string, 
  params: any[] = []
): Promise<T[]> {
  try {
    // For Neon's HTTP API, we need to pass parameters as an array
    return await sql.unsafe(query, params) as unknown as T[];
  } catch (error) {
    console.error('Query failed:', error);
    throw error;
  }
}

export async function withTransaction<T>(
  callback: (tx: typeof db) => Promise<T>
): Promise<T> {
  // Create a new connection for the transaction
  const txDb = drizzle(neon(ENV.DATABASE_URL), { schema });
  return txDb.transaction(async (tx) => {
    return await callback(tx as unknown as typeof db);
  });
}

// Test connection
// Test connection
export async function testConnection() {
  try {
    console.log('🔍 Testing database connection to:', 
      ENV.DATABASE_URL 
        ? `${ENV.DATABASE_URL.split('@')[1]?.split('?')[0] || 'unknown'}` 
        : 'no database URL configured'
    );
    
    const start = Date.now();
    const result = await sql`SELECT version()`;
    const duration = Date.now() - start;
    
    console.log(`✅ Database connected in ${duration}ms`);
    console.log('   Database version:', result[0]?.version || 'unknown');
    
    // Test if we can query the users table
    try {
      const tables = await sql`
        SELECT table_name 
        FROM information_schema.tables 
        WHERE table_schema = 'public'
      `;
      console.log('   Available tables:', 
        tables.length > 0 
          ? tables.map(t => t.table_name).join(', ')
          : 'No tables found'
      );
    } catch (tableError) {
      console.warn('⚠️ Could not list tables:', (tableError as Error).message);
    }
    
    return true;
  } catch (error) {
    console.error('❌ Database connection failed:', error);
    
    // Log detailed error information
    if (error instanceof Error) {
      console.error('Error details:', {
        name: error.name,
        message: error.message,
        stack: error.stack?.split('\n').slice(0, 3).join('\n   ')
      });
    }
    
    // Log connection details (without sensitive data)
    if (ENV.DATABASE_URL) {
      const url = new URL(ENV.DATABASE_URL);
      console.error('Connection details:', {
        host: url.hostname,
        port: url.port || '5432',
        database: url.pathname.replace(/^\//, '') || 'unknown',
        ssl: url.searchParams.get('sslmode') || 'not specified'
      });
    } else {
      console.error('No DATABASE_URL found in environment variables');
    }
    
    return false;
  }
}

// Initialize connection
let connectionTest: Promise<boolean> | null = null;

export async function ensureConnected() {
  if (!connectionTest) {
    connectionTest = testConnection();
  }
  return connectionTest;
}

// Auto-connect in non-test environments
if (process.env.NODE_ENV !== 'test') {
  ensureConnected().catch(console.error);
}


export type * from './schema';
