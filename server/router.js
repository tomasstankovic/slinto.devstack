/**
 * App router.
 */
import staticController from './controllers/staticController';

export default (app) => {
  app.use('/', staticController);
};
