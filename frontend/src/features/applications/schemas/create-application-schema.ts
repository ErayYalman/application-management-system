import { z } from "zod";

export const createApplicationSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "Başlık zorunludur.")
    .max(255, "Başlık en fazla 255 karakter olabilir."),

  description: z
    .string()
    .optional(),

  formTypeId: z
    .uuid("Geçerli bir başvuru türü seçin."),
});

export type CreateApplicationFormData =
  z.infer<typeof createApplicationSchema>;