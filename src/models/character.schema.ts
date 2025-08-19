import { z } from 'zod';
import { GenderSchema } from './global.schema';

export const CharacterSchema = z.object({
  id: z.number().int().positive(),
  name: z.string(),
  gender: GenderSchema,
  ability: z.string().nullable(),
  minimal_distance: z.number().nullable(),
  weight: z.number().nullable(),
  born: z.string(),
  in_space_since: z.date().nullable(),
  beer_consumption: z.number().nullable(),
  knows_the_answer: z.boolean().nullable()
});