import { Request, Response } from 'express';

import connection from '../database/connection';
import { CommuniqueProps, AnimalProps } from '../interfaces';

interface CustomRequest extends Request {
  body: CommuniqueProps;
}

export default {
  async create(request: CustomRequest, response: Response): Promise<Response> {
    const {
      name, phone, info, animalId,
    } = request.body;

    try {
      const [id] = await connection<CommuniqueProps>('communique').insert({
        name,
        phone,
        info,
        animalId,
      });

      await connection<AnimalProps>('animal')
        .update({ status: 1 })
        .where('id', animalId);

      return response.json({ message: 'Comunicado registrado!', id });
    } catch (error) {
      return response.status(400).json({ message: 'Erro ao enviar mensagem!' });
    }
  },
};
