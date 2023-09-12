import type { AstroCookies } from 'astro';
import { getAuth } from 'firebase-admin/auth';
import { app } from '../firebase/server';

export const getCurrentUser = async (cookies: AstroCookies) => {
  if (!cookies.has('session')) {
    return null;
  }

  const auth = getAuth(app);
  const sessionCookie = cookies.get('session')?.value;
  if (sessionCookie) {
    return await auth.verifySessionCookie(sessionCookie);
  }

  return null;
};

export const clearCookies = (cookies: AstroCookies) => {
  cookies.set('session', '', {
    path: '/',
    expires: new Date(0),
  });
};
