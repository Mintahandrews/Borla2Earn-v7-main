# Database Setup Guide

This document provides information about the database setup and usage in the Borla2Earn application.

## Database Technology Stack

- **Database**: PostgreSQL (hosted on NeonDB)
- **ORM**: Drizzle ORM
- **Connection**: @neondatabase/serverless
- **Migrations**: Drizzle Kit

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# Database
DATABASE_URL=postgres://user:password@host:port/dbname?sslmode=require

# Authentication
NEXTAUTH_SECRET=your-secret-key
NEXTAUTH_URL=http://localhost:3000

# OAuth Providers (optional)
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=

# Application
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## Database Schema

The database consists of the following tables:

1. `users` - Stores user account information
2. `accounts` - OAuth account connections
3. `sessions` - User sessions
4. `verification_tokens` - Email verification tokens
5. `waste_collections` - Waste collection records

## Running Migrations

1. **Generate migration files** (after schema changes):
   ```bash
   pnpm db:generate
   ```

2. **Apply migrations**:
   ```bash
   pnpm db:migrate
   ```

3. **Reset the database** (development only):
   ```bash
   pnpm db:reset
   ```

## Database Services

The application uses a service layer pattern for database operations. Available services:

- `userService` - User management
- `wasteCollectionService` - Waste collection records
- `sessionService` - Session management
- `verificationTokenService` - Email verification tokens

### Example Usage

```typescript
import { userService } from '@/lib/db/service';

// Create a new user
const newUser = await userService.create({
  name: 'John Doe',
  email: 'john@example.com',
  // ... other fields
});

// Find user by ID
const user = await userService.findById('user-id');

// Update user
const updatedUser = await userService.update('user-id', {
  name: 'Updated Name'
});
```

## Testing the Database

You can test the database connection by making a GET request to:

```
GET /api/db-test
```

## Backup and Restore

### Create a backup

```bash
pg_dump -Fc -d YOUR_DATABASE_URL -f backup.dump
```

### Restore from backup

```bash
pg_restore -d YOUR_DATABASE_URL backup.dump
```

## Monitoring

Monitor your NeonDB database through the [Neon Console](https://console.neon.tech/).

## Troubleshooting

### Connection Issues

1. Verify `DATABASE_URL` is correct in your `.env` file
2. Check if your IP is whitelisted in NeonDB
3. Ensure SSL is properly configured (use `sslmode=require` in connection string)

### Migration Issues

1. Make sure all migration files are committed to version control
2. If migrations are out of sync, you may need to reset the database (development only)
3. Check the `drizzle` table for migration history

## Best Practices

1. Always use transactions for operations that modify multiple records
2. Use the service layer for all database operations
3. Keep migrations small and focused
4. Test migrations in a development environment before applying to production
5. Regularly backup your production database
