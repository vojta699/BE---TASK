import { Request, Response, NextFunction } from 'express';
import { StatsService } from '../services/stats.service';
import { ZodError } from 'zod';

export const StatsController = {
  async getStats(req: Request, res: Response, next: NextFunction) {
    try {
      const stats = await StatsService.compute();
      res.json(stats);
    } catch (err) {
      if (err instanceof ZodError) return res.status(400).json({ error: err.errors });
      next(err);
    }
  }
};