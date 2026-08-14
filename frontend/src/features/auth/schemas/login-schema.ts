import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "Email zorunludur.")
    // Standart bir e-posta formatını denetleyen Regex deseni:
    .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Geçerli bir email adresi giriniz."),

  password: z
    .string()
    .min(1, "Şifre zorunludur."),
});

export type LoginFormData = z.infer<typeof loginSchema>;