import { z } from 'zod';
import { GenderSchema } from './global.schema';

export const NemesisSchema = z.object({
  id: z.number().int().positive(),
  character_id: z.number().int().positive(),
  name: z.string().nullable(),
  gender: GenderSchema.nullable(),
  born: z.date().nullable(),
  is_alive: z.boolean()
});
