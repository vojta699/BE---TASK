import { Router } from 'express';
import { CharacterController } from '../controllers/character.controller';
import { StatsController } from '../controllers/stats.controller';

const router = Router();

router.get('/characters', CharacterController.getTree);
router.get('/stats', StatsController.getStats);
router.get('/health', (_, res) => res.json({ ok: true }));

export default router;