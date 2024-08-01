import { defineMiddlewareRouter } from './router'
import { manageOrganizerAuth } from './utils';

export const onRequest = defineMiddlewareRouter({
    '/backoffice*': (context, next) => {
            const sessionCookie = context.cookies.get("session")?.value;

            if (!sessionCookie) {
                return context.redirect("/404", 302);
            }
            manageOrganizerAuth({context, sessionCookie});
        
        return next();
    }
})