import v1 from './modules/v1';
import { Router } from 'express';

const router = Router();

// Controllers
router.use('/v1', v1);

router.use('/', (_req, res, _next) =>
  res.send('Welcome to the Todo World!!! Get start with the documentation here https://documenter.getpostman.com/view/12237341/2s847ETFFs'),
);

router.use('*', (_req, res, _next) =>
  res.send('I can\'t find the resource you\'re looking for'),
);

export default router;
