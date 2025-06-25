import dotenv from 'dotenv';
import path from 'path';
import { z } from 'zod';

// Load environment variables from .env file
const envPath = path.resolve(process.cwd(), '.env');
const envConfig = dotenv.config({ path: envPath });

if (envConfig.error) {
  console.error('Error loading .env file:', envConfig.error);
}

// Define the environment schema
const envSchema = z.object({
  // Node Environment
  NODE_ENV: z
    .enum(['development', 'production', 'test'])
    .default('development'),
  
  // Database
  DATABASE_URL: z.string().url('Invalid database URL'),
  
  // Authentication
  NEXTAUTH_SECRET: z.string().min(32, 'Secret must be at least 32 characters'),
  NEXTAUTH_URL: z.string().url('Invalid NextAuth URL'),
  
  // OAuth Providers
  GOOGLE_CLIENT_ID: z.string().optional(),
  GOOGLE_CLIENT_SECRET: z.string().optional(),
  GITHUB_CLIENT_ID: z.string().optional(),
  GITHUB_CLIENT_SECRET: z.string().optional(),
  
  // Application
  NEXT_PUBLIC_APP_URL: z.string().url('Invalid app URL').optional(),
  DIRECT_URL: z.string().optional(),
});

// Parse environment variables
const _env = envSchema.safeParse({
  NODE_ENV: process.env.NODE_ENV,
  DATABASE_URL: process.env.DATABASE_URL,
  NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
  NEXTAUTH_URL: process.env.NEXTAUTH_URL,
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
  GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID,
  GITHUB_CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET,
  NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
  DIRECT_URL: process.env.DIRECT_URL,
});

// Throw error if validation fails
if (!_env.success) {
  console.error('❌ Invalid environment variables:', _env.error.format());
  throw new Error('Invalid environment variables');
}

// Export validated environment variables
export const ENV = _env.data;

// Export type for TypeScript
export type Env = z.infer<typeof envSchema>;

// Validate required environment variables
const requiredVars = ['DATABASE_URL', 'DIRECT_URL', 'NEXTAUTH_SECRET'] as const;

for (const key of requiredVars) {
  if (!ENV[key]) {
    console.error(`❌ Missing required environment variable: ${key}`);
  } else {
    console.log(`✅ Environment variable ${key} is set`);
  }
}

export default ENV;
