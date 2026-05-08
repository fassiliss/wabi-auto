import crypto from 'crypto';
import { NextRequest, NextResponse } from 'next/server';

export const ADMIN_COOKIE_NAME = 'wabi_admin_session';

const SESSION_AGE_SECONDS = 60 * 60 * 8;

function getAdminPassword() {
  return process.env.ADMIN_PASSWORD || 'admin123';
}

function getSessionSecret() {
  return process.env.ADMIN_SESSION_SECRET || getAdminPassword();
}

function sign(value: string) {
  return crypto
    .createHmac('sha256', getSessionSecret())
    .update(value)
    .digest('hex');
}

function timingSafeCompare(a: string, b: string) {
  const left = Buffer.from(a);
  const right = Buffer.from(b);

  return left.length === right.length && crypto.timingSafeEqual(left, right);
}

export function createAdminSessionValue() {
  const expiresAt = Date.now() + SESSION_AGE_SECONDS * 1000;
  const payload = `admin.${expiresAt}`;

  return `${payload}.${sign(payload)}`;
}

export function isAdminSessionValid(value?: string) {
  if (!value) {
    return false;
  }

  const parts = value.split('.');
  if (parts.length !== 3) {
    return false;
  }

  const [role, expiresAt, signature] = parts;
  if (role !== 'admin' || Number(expiresAt) < Date.now()) {
    return false;
  }

  return timingSafeCompare(signature, sign(`${role}.${expiresAt}`));
}

export function verifyAdminPassword(password: string) {
  return timingSafeCompare(password, getAdminPassword());
}

export function isAdminRequest(request: NextRequest) {
  return isAdminSessionValid(request.cookies.get(ADMIN_COOKIE_NAME)?.value);
}

export function unauthorizedResponse() {
  return NextResponse.json(
    { success: false, error: 'Admin login required' },
    { status: 401 },
  );
}

export function setAdminSessionCookie(response: NextResponse) {
  response.cookies.set({
    name: ADMIN_COOKIE_NAME,
    value: createAdminSessionValue(),
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    maxAge: SESSION_AGE_SECONDS,
    path: '/',
  });
}

export function clearAdminSessionCookie(response: NextResponse) {
  response.cookies.set({
    name: ADMIN_COOKIE_NAME,
    value: '',
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    maxAge: 0,
    path: '/',
  });
}
