import { Request, Response, NextFunction } from 'express';
import { CharacterService } from '../services/character.service';

export const CharacterController = {
  async getTree(req: Request, res: Response, next: NextFunction) {
    try {
      const characters = await CharacterService.listTree();
      res.json({ characters });
    } catch (err) {
      next(err);
    }
  }
};