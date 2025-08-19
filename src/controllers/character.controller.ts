import { Request, Response, NextFunction } from 'express';
import { CharacterService } from '../services/character.service';
import { CharacterDAO } from '../dao/character.dao';
import { PaginationSchema } from '../models/pagination.schema';
import { ZodError } from 'zod';

export const CharacterController = {
  async getTree(req: Request, res: Response, next: NextFunction) {
    try {
      const { page, pageSize } = PaginationSchema.parse(req.query);
      const offset = (page - 1) * pageSize;

      const [characters, total] = await Promise.all([
        CharacterService.listTree(pageSize, offset),
        CharacterDAO.countCharacters(),
      ]);

      res.json({
        page,
        pageSize,
        total,
        pages: Math.ceil(total / pageSize),
        characters,
      });
    } catch (err) {
      if (err instanceof ZodError) return res.status(400).json({ error: err.errors });
      next(err);
    }
  },
};