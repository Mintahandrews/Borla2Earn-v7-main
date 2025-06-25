import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';
import * as schema from './schema';
import { env } from '@/lib/env';

// Create a database client with connection pooling
const sql = neon(env.DATABASE_URL);
const db = drizzle(sql, { schema });

// Export the database client
export { db };

// Export types for better TypeScript support
export type * from './schema';

// Helper functions for common operations
export const dbUtils = {
  // User operations
  async getUserById(id: string) {
    const [user] = await db.select().from(schema.users).where(() => `id = ${id}`);
    return user || null;
  },

  async getUserByEmail(email: string) {
    const [user] = await db.select().from(schema.users).where(() => `email = '${email}'`);
    return user || null;
  },

  async createUser(userData: typeof schema.users.$inferInsert) {
    const [newUser] = await db.insert(schema.users).values(userData).returning();
    return newUser;
  },

  // Waste collection operations
  async createWasteCollection(collectionData: typeof schema.wasteCollections.$inferInsert) {
    const [newCollection] = await db
      .insert(schema.wasteCollections)
      .values(collectionData)
      .returning();
    return newCollection;
  },

  async getWasteCollectionsByUserId(userId: string) {
    return db
      .select()
      .from(schema.wasteCollections)
      .where(() => `user_id = '${userId}'`);
  },

  // Session operations
  async createSession(sessionData: typeof schema.sessions.$inferInsert) {
    const [newSession] = await db.insert(schema.sessions).values(sessionData).returning();
    return newSession;
  },

  async getSessionByToken(token: string) {
    const [session] = await db
      .select()
      .from(schema.sessions)
      .where(() => `session_token = '${token}'`);
    return session || null;
  },

  async deleteSession(token: string) {
    await db.delete(schema.sessions).where(() => `session_token = '${token}'`);
  },

  // Verification token operations
  async createVerificationToken(tokenData: typeof schema.verificationTokens.$inferInsert) {
    const [newToken] = await db
      .insert(schema.verificationTokens)
      .values(tokenData)
      .returning();
    return newToken;
  },

  async getVerificationToken(token: string) {
    const [verificationToken] = await db
      .select()
      .from(schema.verificationTokens)
      .where(() => `token = '${token}'`);
    return verificationToken || null;
  },

  async deleteVerificationToken(token: string) {
    await db.delete(schema.verificationTokens).where(() => `token = '${token}'`);
  },
};

// Export a type for the database utilities
export type DBUtils = typeof dbUtils;
