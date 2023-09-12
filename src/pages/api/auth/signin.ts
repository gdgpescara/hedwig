import type { APIRoute } from "astro";
import { app } from "../../../firebase/server";
import { getAuth } from "firebase-admin/auth";

export const GET: APIRoute = async ({ request, cookies, redirect }) => {
  const auth = getAuth(app);

  /* Ottieni il token dagli headers della richiesta */
  const idToken = request.headers.get("Authorization")?.split("Bearer ")[1];
  if (!idToken) {
    return new Response("Nessun token trovato", { status: 401 });
  }

  /* Verifica il token */
  try {
    await auth.verifyIdToken(idToken);
  } catch (error) {
    return new Response("Token non valido", { status: 401 });
  }

  /* Crea e imposta il cookie per la sessione */
  const fiveDays = 60 * 60 * 24 * 5 * 1000;
  const sessionCookie = await auth.createSessionCookie(idToken, {
    expiresIn: fiveDays,
  });

  cookies.set("session", sessionCookie, {
    path: "/",
  });

  return redirect("/");
};