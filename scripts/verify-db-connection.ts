import { Pool } from 'pg';
import dotenv from 'dotenv';
import path from 'path';

// Load environment variables from .env file
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

async function testConnection() {
  console.log('Testing database connection...');
  
  if (!process.env.DATABASE_URL) {
    console.error('Error: DATABASE_URL is not set in .env file');
    process.exit(1);
  }

  console.log('Using connection string:', process.env.DATABASE_URL);
  
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false // For development only
    }
  });

  const client = await pool.connect().catch(err => {
    console.error('Error connecting to the database:', err);
    process.exit(1);
  });

  try {
    console.log('Successfully connected to the database');
    
    // Test query
    const versionResult = await client.query('SELECT version()');
    console.log('Database version:', versionResult.rows[0]?.version);
    
    // Test user count
    const userCountResult = await client.query('SELECT COUNT(*) as count FROM "User"');
    console.log('Total users:', userCountResult.rows[0]?.count);
    
    console.log('Database connection test successful!');
  } catch (error) {
    console.error('Error executing query:', error);
  } finally {
    client.release();
    await pool.end();
  }
}

testConnection();
