// This script will be run with `node -r dotenv/config` to properly load .env
console.log('Checking Next.js environment...');

// Log environment variables (be careful with sensitive data in production)
console.log('Environment Variables:');
console.log('- NODE_ENV:', process.env.NODE_ENV);
console.log('- DATABASE_URL:', process.env.DATABASE_URL ? '***' : 'Not set');
console.log('- DIRECT_URL:', process.env.DIRECT_URL ? '***' : 'Not set');
console.log('- NEXTAUTH_URL:', process.env.NEXTAUTH_URL);
console.log('- NEXTAUTH_SECRET:', process.env.NEXTAUTH_SECRET ? '***' : 'Not set');
console.log('- NEXT_PUBLIC_APP_URL:', process.env.NEXT_PUBLIC_APP_URL);

// Test database connection if DATABASE_URL is set
if (process.env.DATABASE_URL) {
  console.log('\nTesting database connection...');
  
  const { Pool } = require('pg');
  
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false // For development only
    },
    connectionTimeoutMillis: 5000
  });

  pool.connect()
    .then(client => {
      console.log('Successfully connected to the database');
      return client.query('SELECT version()')
        .then(result => {
          console.log('Database version:', result.rows[0]?.version);
          return client.query('SELECT COUNT(*) as count FROM "User"');
        })
        .then(result => {
          console.log('Total users:', result.rows[0]?.count);
          client.release();
        })
        .catch(err => {
          console.error('Query error:', err.message);
          client.release();
        });
    })
    .catch(err => {
      console.error('Connection error:', err.message);
    })
    .finally(() => {
      pool.end();
    });
} else {
  console.log('\nSkipping database test - DATABASE_URL not set');
}
