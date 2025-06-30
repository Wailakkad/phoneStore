
import { kv } from '@vercel/kv';

/** Strongly‑typed helpers around KV JSON blobs */
export const getJSON = async <T>(key: string): Promise<T | null> => {
  const raw = await kv.get<string | null>(key);
  return raw ? JSON.parse(raw) : null;
};
export const setJSON = <T>(key: string, value: T) =>
  kv.set(key, JSON.stringify(value));
export { kv };