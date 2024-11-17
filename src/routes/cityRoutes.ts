import { Hono } from 'hono';
import ReadAllCitiesController from '../controllers/parking/ReadAllCitiesController';
import ReadOneCityController from '../controllers/parking/ReadOneCityController';

const cityRoutes = new Hono();

cityRoutes.get('/',...ReadAllCitiesController);
cityRoutes.get('/:slug', ...ReadOneCityController);



export default cityRoutes;