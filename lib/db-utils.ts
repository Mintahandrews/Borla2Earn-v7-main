import { Pool } from 'pg';
import { ENV } from './env-utils';

// Create a connection pool
const pool = new Pool({
  connectionString: ENV.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false // For development only
  },
  connectionTimeoutMillis: 5000,
  idleTimeoutMillis: 5000,
  max: 10
});

// Handle connection errors
pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

/**
 * Executes a query and returns the result
 */
export async function query(text: string, params: any[] = []) {
  const start = Date.now();
  
  try {
    const res = await pool.query(text, params);
    const duration = Date.now() - start;
    
    if (process.env.NODE_ENV === 'development') {
      console.log('Executed query', { text, duration, rows: res.rowCount });
    }
    
    return res;
  } catch (error) {
    console.error('Query error:', error);
    throw error;
  }
}

/**
 * Gets a client from the pool
 */
export async function getClient() {
  const client = await pool.connect();
  
  // Set a timeout of 5 seconds for queries
  const query = client.query;
  const release = client.release;
  
  // Set a timeout for the client
  const timeout = setTimeout(() => {
    console.error('A client has been checked out for more than 5 seconds!');
  }, 5000);
  
  // Override the query method to log the query
  client.query = (...args: any[]) => {
    return query.apply(client, args);
  };
  
  // Override the release method to clear the timeout
  client.release = () => {
    clearTimeout(timeout);
    
    // Reset the client
    client.query = query;
    client.release = release;
    
    return release.apply(client);
  };
  
  return client;
}

/**
 * Tests the database connection
 */
export async function testConnection() {
  const client = await getClient();
  
  try {
    const version = await client.query('SELECT version()');
    const userCount = await client.query('SELECT COUNT(*) as count FROM "User"');
    
    return {
      success: true,
      version: version.rows[0]?.version,
      userCount: userCount.rows[0]?.count
    };
  } catch (error) {
    console.error('Database connection test failed:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  } finally {
    client.release();
  }
}

export { pool };
