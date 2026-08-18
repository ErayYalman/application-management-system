import { z } from "zod";

export const createApplicationSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "Başlık zorunludur.")
    .max(100, "Başlık en fazla 100 karakter olabilir."),

  description: z
    .string()
    .trim()
    .max(1000, "Açıklama en fazla 1000 karakter olabilir.")
    .optional(),

  formTypeId: z
    .string()
    .min(1, "Lütfen bir başvuru türü seçin.")
    .uuid("Geçerli bir başvuru türü seçin."),
});

export type CreateApplicationFormData =
  z.infer<typeof createApplicationSchema>;