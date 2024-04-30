import type { APIRoute } from "astro";
import { getAuth } from "firebase-admin/auth";
import { app } from "../../../firebase/server";

export const POST: APIRoute = async ({ request, redirect }) => {
  const auth = getAuth(app);

  const body = await request.json();
  const password = body.password;
  const email = body.email;

  if (!email || !password) {
    return new Response("Missing form data", { status: 400 });
  }

  /* Create user */
  try {
    await auth.createUser({
      email,
      password,
    });
  } catch (error: any) {
    return new Response(error, { status: 400 });
  }
  return redirect("/signin");
};
