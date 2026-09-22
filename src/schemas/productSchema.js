import { z } from "zod";

export const createProductSchema = z.object({
  name: z.string().trim().min(1, "Name ist erforderlich"),
  price: z.number().nonnegative("Preis darf nicht negativ sein"),
  stock: z
    .number()
    .int("Lagerbestand muss eine ganze Zahl sein")
    .nonnegative("Lagerbestand darf nicht negativ sein"),
  categoryId: z
    .number()
    .int("Kategorie-ID muss eine ganze Zahl sein")
    .positive("Kategorie-ID muss positiv sein"),
});

export const updateProductSchema = createProductSchema
  .partial()
  .refine((data) => Object.keys(data).length > 0, {
    message: "Mindestens ein Feld ist erforderlich",
  });
