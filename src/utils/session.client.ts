import type { DecodedIdToken } from 'firebase-admin/auth';

export const getCookie = (name: string) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(';').shift();
};

export const getAuthCookie = (jwt: string) => {
  const jwtDecoded: undefined | DecodedIdToken = JSON.parse(
    atob(jwt.split('.')[1])
  );

  return jwtDecoded;
};
