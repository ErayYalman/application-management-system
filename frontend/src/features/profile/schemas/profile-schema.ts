import { z } from "zod";

export const profileSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Ad en az 2 karakter olmalıdır.")
    .max(50, "Ad en fazla 50 karakter olabilir."),

  surname: z
    .string()
    .trim()
    .min(2, "Soyad en az 2 karakter olmalıdır.")
    .max(50, "Soyad en fazla 50 karakter olabilir."),
});

export type ProfileFormData =
  z.infer<typeof profileSchema>;