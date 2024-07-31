import type { APIContext } from 'astro';
import { app } from '../firebase/server';
import { getAuth, UserRecord } from 'firebase-admin/auth';

interface IManageOrganizerAuth{
    context: APIContext<Record<string, any>, Record<string, string | undefined>>,
    sessionCookie:string,
}
export const manageOrganizerAuth = async ({context, sessionCookie}:IManageOrganizerAuth) => {
    const auth = getAuth(app);
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