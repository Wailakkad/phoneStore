import { z } from 'zod';

export const ProductSchema = z.object({
  id: z.string().min(3),
  name: z.string().min(2),
  slug: z.string().min(2),
  brand: z.string(),
  price: z.number().int().nonnegative(),
  stock: z.number().int().nonnegative(),
  img: z.string(),            // `/phones/iphone14.jpg`
  specs: z.array(z.string()),
});
export type Product = z.infer<typeof ProductSchema>;
