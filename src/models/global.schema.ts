import { z } from 'zod';

export const IdSchema = z.coerce.number().int().positive();

export const GenderSchema = z.enum(['female', 'male', 'other']);