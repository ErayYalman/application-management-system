import { z } from "zod";

export const formTypeSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Form türü adı zorunludur.")
    .max(
      100,
      "Form türü adı en fazla 100 karakter olabilir.",
    ),

  description: z
    .string()
    .optional(),
});

export type FormTypeFormData =
  z.infer<typeof formTypeSchema>;