import { z } from 'zod';

export const SecretSchema = z.object({
  id: z.number().int().positive(),
  nemesis_id: z.number().int().positive(),
  secret_code: z.string()
});