import { defineConfig } from 'drizzle-kit';
import 'dotenv/config';
if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL environment variable is required');
}
export default defineConfig({
  dialect: 'postgresql',
  schema: './db/schema.ts',
  out: './drizzle/migrations',
  dbCredentials: {
    url: process.env.DATABASE_URL,
  },
  verbose: true,
  strict: true,
});