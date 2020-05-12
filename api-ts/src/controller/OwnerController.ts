import { Request, Response } from 'express';

import connection from '../database/connection';
import { OwnerProps } from '../interfaces';

interface CustomRequest extends Request {
  body: OwnerProps;
}

export default {
  async index(request: Request, response: Response): Promise<Response> {
    const owner = await connection<OwnerProps>('owner').select('*');

    return response.json(owner);
  },

  async create(request: CustomRequest, response: Response): Promise<Response> {
    const {
      name, email, phone, password,
    } = request.body;

    const [id] = await connection<OwnerProps>('owner').insert({
      name,
      email,
      phone,
      password,
    });

    return response.json({ message: 'Dono registrado!', id, name });
  },
};
