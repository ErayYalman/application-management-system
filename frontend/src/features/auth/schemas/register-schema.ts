import { z } from "zod";

export const registerSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Ad zorunludur.")
    .max(100, "Ad en fazla 100 karakter olabilir."),

  surname: z
    .string()
    .trim()
    .min(1, "Soyad zorunludur.")
    .max(100, "Soyad en fazla 100 karakter olabilir."),

  email: z
    .string()
    .trim()
    .min(1, "Email zorunludur.")
    .email("Geçerli bir email adresi girin.")
    .max(255, "Email en fazla 255 karakter olabilir."),

  password: z
    .string()
    .min(8, "Şifre en az 8 karakter olmalıdır."),

  confirmPassword: z
    .string()
    .min(1, "Şifre tekrarı zorunludur."),
}).refine(
  (data) => data.password === data.confirmPassword,
  {
    path: ["confirmPassword"],
    message: "Şifreler eşleşmiyor.",
  },
);

export type RegisterFormData =
  z.infer<typeof registerSchema>;