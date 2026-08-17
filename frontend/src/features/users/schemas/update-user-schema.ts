import { z } from "zod";

export const updateUserSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Ad zorunludur.")
    .max(
      100,
      "Ad en fazla 100 karakter olabilir.",
    ),

  surname: z
    .string()
    .trim()
    .min(1, "Soyad zorunludur.")
    .max(
      100,
      "Soyad en fazla 100 karakter olabilir.",
    ),
});

export type UpdateUserFormData =
  z.infer<
    typeof updateUserSchema
  >;