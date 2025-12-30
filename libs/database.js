import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pg;

// Determine if SSL is needed (Supabase requires SSL)
const isSupabase = process.env.DATABASE_URL?.includes('supabase.co');
const needsSSL = isSupabase || process.env.NODE_ENV === 'production';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: needsSSL ? { rejectUnauthorized: false } : false,
  max: 20, 
  idleTimeoutMillis: 30000, 
  connectionTimeoutMillis: 10000,
});

pool.on('connect', async (client) => {
  // Set timezone to Vietnam (UTC+7)
  try {
    await client.query("SET timezone = 'Asia/Ho_Chi_Minh'");
    console.log('✓ Connected to PostgreSQL database (timezone: Asia/Ho_Chi_Minh)');
  } catch (err) {
    console.log('✓ Connected to PostgreSQL database (timezone setting failed, using default)');
  }
});

pool.on('error', (err) => {
  console.error('✗ Unexpected error on idle client', err);
  process.exit(-1);
});

export const query = async (text, params) => {
  const start = Date.now();
  try {
    const res = await pool.query(text, params);
    const duration = Date.now() - start;
    console.log('Executed query', { text, duration, rows: res.rowCount });
    return res;
  } catch (error) {
    console.error('Database query error:', error);
    
    // Provide more helpful error messages
    if (error.code === 'ENOTFOUND') {
      console.error('DNS resolution failed. Please check:');
      console.error('1. DATABASE_URL is correct in .env file');
      console.error('2. Internet connection is working');
      console.error('3. Supabase hostname is valid');
    } else if (error.code === 'ECONNREFUSED') {
      console.error('Connection refused. Please check:');
      console.error('1. Database server is running');
      console.error('2. DATABASE_URL port is correct');
    } else if (error.code === 'ETIMEDOUT') {
      console.error('Connection timeout. Please check:');
      console.error('1. Network connectivity');
      console.error('2. Firewall settings');
    }
    
    throw error;
  }
};

export const getClient = async () => {
  const client = await pool.connect();
  const query = client.query;
  const release = client.release;
  
  const timeout = setTimeout(() => {
    console.error('A client has been checked out for more than 5 seconds!');
    console.error(`The last executed query on this client was: ${client.lastQuery}`);
  }, 5000);
  
  client.query = (...args) => {
    client.lastQuery = args;
    return query.apply(client, args);
  };
  
  client.release = () => {
    clearTimeout(timeout);
    client.query = query;
    client.release = release;
    return release.apply(client);
  };
  
  return client;
};

export const closePool = async () => {
  await pool.end();
  console.log('Database pool closed');
};

// Test database connection
export const testConnection = async () => {
  try {
    const result = await pool.query('SELECT NOW()');
    console.log('✓ Database connection test successful');
    return true;
  } catch (error) {
    console.error('✗ Database connection test failed:', error.message);
    if (error.code === 'ENOTFOUND') {
      console.error('\n⚠ DNS resolution failed. The hostname cannot be found.');
      console.error('\n📋 Troubleshooting steps:');
      console.error('   1. Verify DATABASE_URL in .env file is correct');
      console.error('   2. Check if Supabase project still exists');
      console.error('   3. Get new connection string from Supabase Dashboard:');
      console.error('      → Go to: https://supabase.com/dashboard');
      console.error('      → Select your project');
      console.error('      → Settings → Database → Connection string');
      console.error('   4. Verify internet connection');
      console.error('   5. Try pinging the hostname: ping db.xxxxx.supabase.co\n');
      
      // Extract hostname from DATABASE_URL for user reference
      try {
        const url = new URL(process.env.DATABASE_URL);
        console.error(`   Current hostname: ${url.hostname}`);
        console.error(`   If this hostname is incorrect, update your .env file\n`);
      } catch (e) {
        // Ignore URL parsing errors
      }
    } else if (error.code === 'ECONNREFUSED') {
      console.error('\n⚠ Connection refused. Please check:');
      console.error('   - Database server is running');
      console.error('   - Port number in DATABASE_URL is correct (usually 5432)');
      console.error('   - Firewall allows connections\n');
    } else if (error.code === 'ETIMEDOUT') {
      console.error('\n⚠ Connection timeout. Please check:');
      console.error('   - Network connectivity');
      console.error('   - Firewall/VPN settings');
      console.error('   - Database server is accessible\n');
    }
    return false;
  }
};

export default pool;

