import { Request, Response } from 'express';

import connection from '../database/connection';
import { AnimalProps } from '../interfaces';

interface CustomRequest extends Request {
  body: AnimalProps;
  query: {
    page: number;
  };
}

export default {
  async index(request: CustomRequest, response: Response): Promise<Response> {
    const { page = 1 } = request.query;

    const [count] = await connection('animal').count().where('status', '=', 0);
    const totalPages = Math.ceil(count['count(*)'] as number / 4).toString();

    const animals = await connection('animal')
      .join('owner', 'owner.id', '=', 'animal.ownerId')
      .where('status', '=', 0)
      .limit(4)
      .offset((page - 1) * 4)
      .select([
        'animal.*',
        'owner.name as ownerName',
        'owner.email',
        'owner.phone',
      ]);

    response.header('X-Total-Pages', totalPages);

    return response.json(animals);
  },

  async create(request: CustomRequest, response: Response): Promise<Response> {
    const {
      picture, name, age, info, city, uf, status,
    } = request.body;
    const ownerId = request.headers.authorization as unknown as number;

    const [id] = await connection<AnimalProps>('animal').insert({
      picture, name, age, info, city, uf, status, ownerId,
    });

    return response.json({ message: 'Animal cadastrado!', id });
  },

  async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const {
      picture, name, age, info, city, uf, status,
    } = request.body;
    const ownerId = request.headers.authorization as unknown as number;

    const animal = await connection<AnimalProps>('animal')
      .where('id', id)
      .select('ownerId')
      .first();

    if (animal.ownerId !== ownerId) {
      return response.status(401).json({ message: 'Você não tem permissão para editar os dados deste animal.' });
    }

    await connection<AnimalProps>('animal')
      .update({
        picture,
        name,
        age,
        info,
        city,
        uf,
        status,
      })
      .where('id', id);

    return response.status(200).json({ message: 'Informações atualizadas!' });
  },

  async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const ownerId = request.headers.authorization as unknown as number;

    const animal = await connection<AnimalProps>('animal')
      .where('id', id)
      .select('ownerId')
      .first();

    if (animal.ownerId !== ownerId) {
      return response.status(401).json({ message: 'Você não tem permissão para excluir esse animal.' });
    }

    await connection('animal').where('id', id).delete();

    return response.status(204).send();
  },
};
