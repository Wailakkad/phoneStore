import { setJSON, kv } from "@/lib/kv";
import { Product } from '@/schemas/product';

const seed: Product[] = [
  {
    id: 'iph14',
    name: 'iPhone 14 128 GB',
    slug: 'iphone-14',
    brand: 'Apple',
    price: 6990,
    stock: 12,
    img: '/phones/iphone14.jpg',
    specs: ['6.1″ OLED', 'A15 Bionic', '128 GB'],
  },
  {
    id: 's23',
    name: 'Samsung Galaxy S23',
    slug: 'galaxy-s23',
    brand: 'Samsung',
    price: 5990,
    stock: 8,
    img: '/phones/s23.jpg',
    specs: ['6.1″ AMOLED 120 Hz', 'Snapdragon 8 Gen 2', '128 GB'],
  },
];

await Promise.all(seed.map(p => setJSON(`product:${p.id}`, p)));
await kv.set('products', seed.map(p => p.id));

console.log('✅ Seeded demo phones');
process.exit();
