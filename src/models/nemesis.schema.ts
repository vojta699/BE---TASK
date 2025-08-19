import { z } from 'zod';

export const NemesisSchema = z.object({
  id: z.number().int().positive(),
  character_id: z.number().int().positive(),
  is_alive: z.boolean(),
  years: z.number().int()
});