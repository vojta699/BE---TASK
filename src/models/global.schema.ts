import { z } from 'zod';

export const IdSchema = z.coerce.number().int().positive();

export const GenderSchema = z.enum(['female', 'male', 'other']);

export const CharacterSchema = z.object({
  id: z.number().int().positive(),
  name: z.string(),
  gender: GenderSchema,
  ability: z.string().nullable(),
  minimal_distance: z.number().nullable(),
  weight: z.number().nullable(),
  born: z.date(),
  in_space_since: z.date().nullable(),
  beer_consumption: z.number().nullable(),
  knows_the_answer: z.boolean().nullable()
});

export const NemesisSchema = z.object({
  id: z.number().int().positive(),
  character_id: z.number().int().positive(),
  name: z.string().nullable(),
  gender: GenderSchema.nullable(),
  born: z.date().nullable(),
  is_alive: z.boolean()
});

export const SecretSchema = z.object({
  id: z.number().int().positive(),
  nemesis_id: z.number().int().positive(),
  secret_code: z.number()
});