import { z } from "zod";

export const updateApplicationSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "Başlık zorunludur.")
    .max(
      255,
      "Başlık en fazla 255 karakter olabilir.",
    ),

  description: z
    .string()
    .optional(),

  formTypeId: z
    .string()
    .uuid("Geçerli bir başvuru türü seçin."),
});

export type UpdateApplicationFormData =
  z.infer<
    typeof updateApplicationSchema
  >;