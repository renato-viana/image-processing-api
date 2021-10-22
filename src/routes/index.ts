import express from 'express';
import images from './api/images';

const routes = express.Router();

routes.get('/', (req, res): void => {
  res.status(200).send('Main api route!');
});

routes.use(images);

export default routes;
