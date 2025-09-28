import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import type { Env } from './core-utils';
import * as schema from '../db/schema';
// This function creates a new database client.
// In a real-world Cloudflare Worker, you would manage connections
// carefully, possibly using a connection pool if your environment supports it.
// For many serverless environments, creating a new connection per request/invocation is a common pattern.
export function getDbClient(env: Env) {
  if (!env.DATABASE_URL) {
    throw new Error('DATABASE_URL binding is required');
  }
  const client = postgres(env.DATABASE_URL);
  return drizzle(client, { schema });
}