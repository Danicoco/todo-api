import { Router } from 'express';

import todoRouter from './todo/todo.route';

const router = Router();

router.use('/todo', todoRouter);

router.use('/', async (_req, res, _next) => res.send('Welcome to Summitech Todo API'));

export default router;
