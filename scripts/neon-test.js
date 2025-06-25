const { Pool } = require('pg');
require('dotenv').config();

async function testNeonConnection() {
  console.log('Testing NeonDB connection...');
  
  const connectionString = process.env.DATABASE_URL;
  console.log('Using connection string:', connectionString);
  
  if (!connectionString) {
    console.error('Error: DATABASE_URL is not set in .env file');
    process.exit(1);
  }

  /**
 * @type {import('pg').PoolConfig}
 */
const poolConfig = {
  connectionString: connectionString,
  ssl: {
    rejectUnauthorized: false // For development only
  },
  connectionTimeoutMillis: 5000, // Time in milliseconds
  idleTimeoutMillis: 5000,        // Time in milliseconds
  max: 1
};

const pool = new Pool(poolConfig);

  const client = await pool.connect().catch(err => {
    console.error('Error connecting to NeonDB:', err);
    process.exit(1);
  });

  try {
    console.log('Successfully connected to NeonDB');
    
    // Test query
    const versionResult = await client.query('SELECT version()');
    console.log('Database version:', versionResult.rows[0]?.version);
    
    // Test user table access
    try {
      const userCountResult = await client.query('SELECT COUNT(*) as count FROM "User"');
      console.log('Total users:', userCountResult.rows[0]?.count);
    } catch (userError) {
      console.warn('Warning: Could not query User table:', userError.message);
      console.log('Attempting to list tables...');
      const tablesResult = await client.query(`
        SELECT table_name 
        FROM information_schema.tables 
        WHERE table_schema = 'public'
      `);
      console.log('Available tables:', tablesResult.rows.map(r => r.table_name));
    }
    
    console.log('NeonDB connection test successful!');
  } catch (error) {
    console.error('Error executing query:', error);
  } finally {
    client.release();
    await pool.end();
  }
}

testNeonConnection();
