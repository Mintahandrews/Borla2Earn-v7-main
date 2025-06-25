import { and, eq, sql } from 'drizzle-orm';
import { db } from './connection';
import * as schema from './schema';
import { ENV } from '@/lib/env';

// Types
export type User = typeof schema.users.$inferSelect;
export type NewUser = typeof schema.users.$inferInsert;
export type WasteCollection = typeof schema.wasteCollections.$inferSelect;
export type NewWasteCollection = typeof schema.wasteCollections.$inferInsert;

// User Service
export const userService = {
  // Create a new user
  async create(userData: NewUser): Promise<User> {
    const [newUser] = await db
      .insert(schema.users)
      .values(userData)
      .returning();
    return newUser;
  },

  // Find user by ID
  async findById(id: string): Promise<User | undefined> {
    const [user] = await db
      .select()
      .from(schema.users)
      .where(eq(schema.users.id, id));
    return user;
  },

  // Find user by email
  async findByEmail(email: string): Promise<User | undefined> {
    const [user] = await db
      .select()
      .from(schema.users)
      .where(eq(schema.users.email, email));
    return user;
  },

  // Find user by wallet address
  async findByWalletAddress(walletAddress: string): Promise<User | undefined> {
    const [user] = await db
      .select()
      .from(schema.users)
      .where(eq(schema.users.walletAddress, walletAddress));
    return user;
  },

  // Update user
  async update(id: string, userData: Partial<NewUser>): Promise<User | undefined> {
    const [updatedUser] = await db
      .update(schema.users)
      .set({ ...userData, updatedAt: new Date() })
      .where(eq(schema.users.id, id))
      .returning();
    return updatedUser;
  },
};

// Waste Collection Service
export const wasteCollectionService = {
  // Create a new waste collection record
  async create(collectionData: NewWasteCollection): Promise<WasteCollection> {
    const [newCollection] = await db
      .insert(schema.wasteCollections)
      .values(collectionData)
      .returning();
    return newCollection;
  },

  // Find collection by ID
  async findById(id: string): Promise<WasteCollection | undefined> {
    const [collection] = await db
      .select()
      .from(schema.wasteCollections)
      .where(eq(schema.wasteCollections.id, id));
    return collection;
  },

  // Find collections by user ID
  async findByUserId(userId: string): Promise<WasteCollection[]> {
    return db
      .select()
      .from(schema.wasteCollections)
      .where(eq(schema.wasteCollections.userId, userId));
  },

  // Update collection
  async update(
    id: string,
    collectionData: Partial<NewWasteCollection>
  ): Promise<WasteCollection | undefined> {
    const [updatedCollection] = await db
      .update(schema.wasteCollections)
      .set({ ...collectionData, updatedAt: new Date() })
      .where(eq(schema.wasteCollections.id, id))
      .returning();
    return updatedCollection;
  },

  // Delete collection
  async delete(id: string): Promise<void> {
    await db
      .delete(schema.wasteCollections)
      .where(eq(schema.wasteCollections.id, id));
  },

  // Get total waste collected by user
  async getTotalCollectedByUser(userId: string): Promise<number> {
    const [result] = await db
      .select({ total: sql<number>`COALESCE(SUM(amount), 0)` })
      .from(schema.wasteCollections)
      .where(
        and(
          eq(schema.wasteCollections.userId, userId),
          eq(schema.wasteCollections.verified, true)
        )
      );
    return result?.total || 0;
  },
};

// Session Service
export const sessionService = {
  // Create a new session
  async create(sessionData: typeof schema.sessions.$inferInsert) {
    const [session] = await db
      .insert(schema.sessions)
      .values(sessionData)
      .returning();
    return session;
  },

  // Find session by token
  async findByToken(token: string) {
    const [session] = await db
      .select()
      .from(schema.sessions)
      .where(eq(schema.sessions.sessionToken, token));
    return session;
  },

  // Delete session by token
  async deleteByToken(token: string) {
    await db
      .delete(schema.sessions)
      .where(eq(schema.sessions.sessionToken, token));
  },

  // Delete expired sessions
  async deleteExpired() {
    await db
      .delete(schema.sessions)
      .where(sql`expires < NOW()`);
  },
};

// Verification Token Service
export const verificationTokenService = {
  // Create a new verification token
  async create(tokenData: typeof schema.verificationTokens.$inferInsert) {
    const [token] = await db
      .insert(schema.verificationTokens)
      .values(tokenData)
      .returning();
    return token;
  },

  // Find token by identifier and token
  async find(identifier: string, token: string) {
    const [verificationToken] = await db
      .select()
      .from(schema.verificationTokens)
      .where(
        and(
          eq(schema.verificationTokens.identifier, identifier),
          eq(schema.verificationTokens.token, token)
        )
      );
    return verificationToken;
  },

  // Delete token
  async delete(identifier: string, token: string) {
    await db
      .delete(schema.verificationTokens)
      .where(
        and(
          eq(schema.verificationTokens.identifier, identifier),
          eq(schema.verificationTokens.token, token)
        )
      );
  },

  // Delete expired tokens
  async deleteExpired() {
    await db
      .delete(schema.verificationTokens)
      .where(sql`expires < NOW()`);
  },
};
