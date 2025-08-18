import { Request, Response, NextFunction } from 'express';
import { StatsService } from '../services/stats.service';

export const StatsController = {
  async getStats(req: Request, res: Response, next: NextFunction) {
    try {
      const stats = await StatsService.compute();
      res.json(stats);
    } catch (err) {
      next(err);
    }
  }
};