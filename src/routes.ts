import v1 from './modules/v1';
import { Router } from 'express';

const router = Router();

// Controllers
router.use('/v1', v1);

router.use('/', (_req, res, _next) =>
  res.send('Welcome to the Todo World!!!'),
);

router.use('*', (_req, res, _next) =>
  res.send('I can\'t find the resource you\'re looking for'),
);

export default router;
