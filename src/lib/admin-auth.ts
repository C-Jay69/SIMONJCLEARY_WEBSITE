import { SignJWT, jwtVerify } from 'jose';

// JWT-based admin auth — works in serverless (Vercel) since it's stateless
// No in-memory store needed; tokens are verified via cryptographic signature

const JWT_SECRET_KEY = 'ADMIN_JWT_SECRET';
const TOKEN_EXPIRY = '24h';

function getSecret(): Uint8Array {
  const secret = process.env.ADMIN_JWT_SECRET || process.env.ADMIN_PASSWORD || 'fallback-secret-change-me';
  return new TextEncoder().encode(secret);
}

export async function generateAdminToken(): Promise<string> {
  const secret = getSecret();
  const token = await new SignJWT({ role: 'admin' })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(TOKEN_EXPIRY)
    .sign(secret);
  return token;
}

export async function validateAdminToken(token: string): Promise<boolean> {
  if (!token) return false;
  try {
    const secret = getSecret();
    const { payload } = await jwtVerify(token, secret);
    return payload.role === 'admin';
  } catch {
    return false;
  }
}

export function getAuthTokenFromRequest(request: Request): string | null {
  const authHeader = request.headers.get('authorization');
  if (authHeader?.startsWith('Bearer ')) {
    return authHeader.slice(7);
  }
  return null;
}
