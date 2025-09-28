import { Hono, Next } from 'hono';
import { Context } from 'hono';
import { users, schoolMembers } from '../db/schema';
import { eq, and } from 'drizzle-orm';
import { getDbClient } from './db';
import { Env } from './core-utils';
// In a real app, use a robust library like bcrypt. For this project, we use a mock comparison.
export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  // This is a mock verification. It assumes the hash is for 'password123'.
  // A real implementation would use bcrypt.compare(password, hash)
  return password === 'password123' && hash === 'mock_hash_for_password123';
}
// --- JWT Implementation using Web Crypto API (available in Cloudflare Workers) ---
const JWT_SECRET = 'a-very-secret-key-that-should-be-in-env-vars'; // In production, use env.JWT_SECRET
async function importKey() {
  return await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(JWT_SECRET),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign', 'verify']
  );
}
function arrayBufferToBase64Url(buffer: ArrayBuffer) {
  return btoa(String.fromCharCode(...new Uint8Array(buffer)))
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');
}
function base64UrlToArrayBuffer(base64Url: string) {
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const padLength = (4 - (base64.length % 4)) % 4;
  const padded = base64.padEnd(base64.length + padLength, '=');
  const binary = atob(padded);
  const buffer = new ArrayBuffer(binary.length);
  const bytes = new Uint8Array(buffer);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return buffer;
}
export async function signJwt(payload: object): Promise<string> {
  const key = await importKey();
  const header = { alg: 'HS256', typ: 'JWT' };
  const encodedHeader = arrayBufferToBase64Url(new TextEncoder().encode(JSON.stringify(header)));
  const encodedPayload = arrayBufferToBase64Url(new TextEncoder().encode(JSON.stringify(payload)));
  const data = new TextEncoder().encode(`${encodedHeader}.${encodedPayload}`);
  const signature = await crypto.subtle.sign('HMAC', key, data);
  const encodedSignature = arrayBufferToBase64Url(signature);
  return `${encodedHeader}.${encodedPayload}.${encodedSignature}`;
}
export async function verifyJwt(token: string): Promise<any | null> {
  try {
    const key = await importKey();
    const [header, payload, signature] = token.split('.');
    if (!header || !payload || !signature) return null;
    const data = new TextEncoder().encode(`${header}.${payload}`);
    const signatureBuffer = base64UrlToArrayBuffer(signature);
    const isValid = await crypto.subtle.verify('HMAC', key, signatureBuffer, data);
    if (!isValid) return null;
    return JSON.parse(new TextDecoder().decode(base64UrlToArrayBuffer(payload)));
  } catch (error) {
    console.error('JWT verification failed:', error);
    return null;
  }
}
// --- Hono Middleware ---
export type AuthenticatedContext<E extends Env = Env> = Context<
  {
    Bindings: E;
    Variables: {
      user: Omit<typeof users.$inferSelect, 'hashedPassword'>;
    };
  }
>;
export const authMiddleware = async (c: AuthenticatedContext, next: Next) => {
  const authHeader = c.req.header('Authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return c.json({ success: false, error: 'Unauthorized' }, 401);
  }
  const token = authHeader.split(' ')[1];
  const payload = await verifyJwt(token);
  if (!payload || !payload.id) {
    return c.json({ success: false, error: 'Invalid token' }, 401);
  }
  try {
    const db = getDbClient(c.env);
    const [user] = await db.select({
        id: users.id,
        email: users.email,
        firstName: users.firstName,
        lastName: users.lastName,
        avatarUrl: users.avatarUrl,
        role: users.role,
        createdAt: users.createdAt,
        updatedAt: users.updatedAt,
    }).from(users).where(eq(users.id, payload.id)).limit(1);
    if (!user) {
      return c.json({ success: false, error: 'User not found' }, 401);
    }
    c.set('user', user);
    await next();
  } catch (error) {
    console.error('Auth middleware DB error:', error);
    return c.json({ success: false, error: 'Internal server error' }, 500);
  }
};
export const schoolAdminMiddleware = async (c: AuthenticatedContext, next: Next) => {
  const user = c.get('user');
  const schoolId = c.req.param('schoolId');
  if (user.role !== 'school_admin') {
    return c.json({ success: false, error: 'Forbidden' }, 403);
  }
  if (!schoolId) {
    return c.json({ success: false, error: 'School ID is required' }, 400);
  }
  try {
    const db = getDbClient(c.env);
    const [membership] = await db
      .select()
      .from(schoolMembers)
      .where(and(eq(schoolMembers.userId, user.id), eq(schoolMembers.schoolId, schoolId)))
      .limit(1);
    if (!membership) {
      return c.json({ success: false, error: 'Forbidden: You do not have access to this school' }, 403);
    }
    await next();
  } catch (error) {
    console.error('School admin middleware DB error:', error);
    return c.json({ success: false, error: 'Internal server error' }, 500);
  }
};