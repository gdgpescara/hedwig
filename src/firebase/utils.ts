import zod from "astro/zod";

export const firebaseClientConfigSchema = zod.object({
  apiKey: zod.string(),
  authDomain: zod.string(),
  projectId: zod.string(),
  storageBucket: zod.string(),
  messagingSenderId: zod.string(),
  appId: zod.string(),
});

export const firebaseServerConfigSchema = zod.object({
  type: zod.literal("service_account"),
  project_id: zod.string(),
  private_key_id: zod.string(),
  private_key: zod.string(),
  client_email: zod.string(),
  client_id: zod.string(),
  auth_uri: zod.string(),
  token_uri: zod.string(),
  auth_provider_x509_cert_url: zod.string(),
  client_x509_cert_url: zod.string(),
  universe_domain: zod.string(),
});
