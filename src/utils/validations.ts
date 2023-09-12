import { z } from 'astro/zod';

export const registrationSchema = z
  .object({
    email: z.string().email(),
    password: z.string().min(8),
    passwordConfirmation: z.string().min(8),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: 'Password confirmation does not match',
    path: ['passwordConfirmation'],
  });

export type RegistrationData = z.infer<typeof registrationSchema>;

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export type LoginData = z.infer<typeof loginSchema>;
