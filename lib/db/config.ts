import { Pool } from 'pg';
import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema';

// Connection string from environment variables
const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error('DATABASE_URL is not defined in environment variables');
}

// Create a connection pool for serverless environments
const pool = new Pool({
  connectionString,
  ssl: {
    rejectUnauthorized: false // For development only
  },
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

// Create a serverless client for serverless environments
const sql = neon(connectionString);

// Create a Drizzle ORM instance with the serverless client
const db = drizzle(sql, { schema });

export { pool, db, sql };

// Test the database connection
async function testConnection() {
  const client = await pool.connect();
  try {
    const result = await client.query('SELECT version()');
    console.log('Database connected:', result.rows[0]?.version);
    return true;
  } catch (error) {
    console.error('Database connection error:', error);
    return false;
  } finally {
    client.release();
  }
}

// Test the connection when this module is loaded
if (process.env.NODE_ENV !== 'test') {
  testConnection().catch(console.error);
}
