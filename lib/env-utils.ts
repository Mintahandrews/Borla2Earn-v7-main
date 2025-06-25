import { readFileSync } from 'fs';
import path from 'path';

// Cache for environment variables
let envCache: Record<string, string> | null = null;

/**
 * Loads environment variables from .env file
 */
function loadEnvVars(): Record<string, string> {
  if (envCache) {
    return envCache;
  }

  try {
    const envPath = path.resolve(process.cwd(), '.env');
    const envFile = readFileSync(envPath, 'utf8');
    const envVars: Record<string, string> = {};
    
    envFile.split('\n').forEach(line => {
      const match = line.match(/^([^=:#]+?)[=:](.*)/);
      if (match) {
        const key = match[1].trim();
        const value = match[2].trim().replace(/(^['"]|['"]$)/g, '');
        envVars[key] = value;
      }
    });
    
    envCache = envVars;
    return envVars;
  } catch (error) {
    console.error('Error loading .env file:', error);
    return {};
  }
}

/**
 * Gets an environment variable
 */
export function getEnvVar(key: string, defaultValue: string = ''): string {
  // First try process.env (for Vercel, etc.)
  if (process.env[key] !== undefined) {
    return process.env[key]!;
  }
  
  // Then try .env file
  const envVars = loadEnvVars();
  if (envVars[key] !== undefined) {
    return envVars[key];
  }
  
  return defaultValue;
}

// Export commonly used environment variables
export const ENV = {
  // Database
  DATABASE_URL: getEnvVar('DATABASE_URL'),
  DIRECT_URL: getEnvVar('DIRECT_URL'),
  
  // Authentication
  NEXTAUTH_SECRET: getEnvVar('NEXTAUTH_SECRET'),
  NEXTAUTH_URL: getEnvVar('NEXTAUTH_URL', 'http://localhost:3000'),
  
  // App
  NODE_ENV: getEnvVar('NODE_ENV', 'development'),
  NEXT_PUBLIC_APP_URL: getEnvVar('NEXT_PUBLIC_APP_URL', 'http://localhost:3000'),
  
  // OAuth Providers
  GOOGLE_CLIENT_ID: getEnvVar('GOOGLE_CLIENT_ID'),
  GOOGLE_CLIENT_SECRET: getEnvVar('GOOGLE_CLIENT_SECRET'),
  GITHUB_CLIENT_ID: getEnvVar('GITHUB_CLIENT_ID'),
  GITHUB_CLIENT_SECRET: getEnvVar('GITHUB_CLIENT_SECRET'),
} as const;

// Validate required environment variables
if (typeof window === 'undefined') {
  const requiredVars = [
    'DATABASE_URL',
    'DIRECT_URL',
    'NEXTAUTH_SECRET',
    'NEXTAUTH_URL',
  ] as const;

  for (const key of requiredVars) {
    if (!ENV[key]) {
      console.error(`❌ Missing required environment variable: ${key}`);
    } else if (key.includes('SECRET') || key.includes('PASSWORD')) {
      console.log(`✅ ${key} is set (value hidden for security)`);
    } else {
      console.log(`✅ ${key} is set: ${ENV[key]}`);
    }
  }
}
