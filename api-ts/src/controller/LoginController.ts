import { Request, Response } from 'express';

import connection from '../database/connection';
import { OwnerProps } from '../interfaces';

interface CustomRequest extends Request {
  body: OwnerProps;
}

export default {
  async login(request: CustomRequest, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const owner = await connection<OwnerProps>('owner')
      .where({ email, password })
      .select('id', 'name')
      .first();

    if (!owner) {
      return response.status(400).json({ message: 'E-Mail ou senha inválidos!' });
    }

    return response.json(owner);
  },
};
