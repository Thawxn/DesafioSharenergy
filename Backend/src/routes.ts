import { Router } from 'express';

import CostumersController from './controller/CostumersController';
import SessionController from './controller/SessionController';
import SearchController from './controller/SearchController';

import authMiddleware from './middlewares/auth';

const routes = Router();

routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);
routes.post('/users', CostumersController.store);
routes.put('/users/:id', CostumersController.update);
routes.delete('/users/:id', CostumersController.destroy);
routes.get('/users/:name', SearchController.index);
routes.get('/users', CostumersController.index);

export default routes;
