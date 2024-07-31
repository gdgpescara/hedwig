import { app } from '../firebase/server';
import { getAuth, UserRecord } from 'firebase-admin/auth';
import { defineMiddlewareRouter } from './router'

export const onRequest = defineMiddlewareRouter({
    '/backoffice': (context, next) => {
        if (context.url.pathname === '/backoffice') {
            const auth = getAuth(app);
            const sessionCookie = context.cookies.get("session")?.value;

            if (!sessionCookie) {
                return context.redirect("/404", 302);
            }

            const manageOrganizerAuth = async () => {
                try {
                    const decodedCookie = await auth.verifySessionCookie(sessionCookie);
                    const user: UserRecord | null = await auth.getUser(decodedCookie.uid);
                    //if the user is not an organizer redirect to 404.astro
                    if (!user?.customClaims?.organizer) {
                        return context.redirect("/404", 302);
                    }
                } catch (error) {
                    return context.redirect("/404", 302);
                }
            }
            manageOrganizerAuth();
        }
        return next();
    }
})