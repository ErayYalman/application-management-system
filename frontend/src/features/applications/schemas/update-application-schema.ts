import { z } from "zod";

export const updateApplicationSchema = z.object({
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
    .uuid("Geçerli bir başvuru türü seçin."),
});

export type UpdateApplicationFormData =
  z.infer<typeof updateApplicationSchema>;