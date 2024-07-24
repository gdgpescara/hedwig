import {z} from "astro/zod";

const UserSchema = z.object({
  id: z.string().optional(),
  email: z.string().email(),
  displayName: z.string(),
  organizer: z.boolean().optional(),
});

export { UserSchema };