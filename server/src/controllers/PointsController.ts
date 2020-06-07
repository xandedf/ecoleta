import {Request, Response} from 'express';
import knex from '../database/connection';

class PointsController {

    async index(request: Request, response: Response) {
        const { city, uf, items } = request.query;

        const parsedItems = String(items)
            .split(',')
            .map(item => Number(item.trim()));

        const points = await knex('points')
            .join('point_items', 'points.id', '=', 'point_items.point_id')
            .whereIn('point_items.item_id', parsedItems)
            .where('city', String(city))
            .where('uf', String(uf))
            .distinct()
            .select('points.*');

        // Serializando os campos para passar o endereço correto da imagem
        const serializedPoints = points.map(point => {
            return {
                ...point,
                image_url: `http://192.168.15.4:3333/uploads/${point.image}`
            }
        });

        return response.json(serializedPoints);
    }

    async show(request: Request, response: Response) {
        const { id } = request.params;

        const pointOriginal = await knex('points').where('id', id).first();

        if (!pointOriginal) {
            return response.status(400).json({
                message: 'Point not found.'
            });
        }

        const point = {
            ...pointOriginal,
            image_url: `http://192.168.15.4:3333/uploads/${pointOriginal.image}`
        };

        const items = await knex('items')
            .join('point_items', 'items.id', '=', 'point_items.item_id')
            .where('point_items.point_id', id)
            .select('items.title');

        return response.json({ point, items });
    }

    async create(request: Request, response: Response) {

        // Request do Body
        const {
            name,
            email,
            whatsapp,
            latitude,
            longitude,
            city,
            uf,
            items
        } = request.body;
    
        // Objeto point
        const point = {
            image: request.file.filename,
            name,
            email,
            whatsapp,
            latitude,
            longitude,
            city,
            uf
        }

        const trx = await knex.transaction();

        const insertedIds = await trx('points').insert(point);
    
        const point_id = insertedIds[0];
    
        const pointItems = items
            .split(',')
            .map((item: string) => Number(item.trim()))
            .map((item_id: number) => {
                return {
                    item_id,
                    point_id
                }
        });
    
        await trx('point_items').insert(pointItems);
    
        await trx.commit();

        return response.json({
            id: point_id,
            ...point
        });
    }
}

export default PointsController;