import express from 'express';
import knex from './database/connection';

import PointsController from './controllers/PointsController';

const routes = express.Router();
const pointsController = new PointsController();

routes.get('/items', async (request, response) => {
    const items = await knex('items').select('*'); // SELECT * FROM items
    
    const serializedItems = items.map(item => {
        return {
            id: item.id,
            title: item.name,
            image_url: `http://localhost:3333/uploads/${item.image}`,
        }
    });

    return response.json(serializedItems);
});

routes.post('/points', pointsController.create);
export default routes;