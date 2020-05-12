import { Request, Response } from 'express';

import connection from '../database/connection';
import { AnimalProps, CommuniqueProps, OwnerAnimalsProps } from '../interfaces';

export default {
  async index(request: Request, response: Response): Promise<Response> {
    const ownerId = request.headers.authorization;

    const animals = await connection<AnimalProps>('animal')
      .where('ownerId', ownerId)
      .select('*');

    const ownerAnimals: OwnerAnimalsProps[] = [];

    const getAnimalsCommuniques = new Promise((resolve) => {
      if (!animals.length) resolve();

      animals.forEach(async (animal, index, array) => {
        const communiques = await connection<CommuniqueProps>('communique')
          .where('animalId', animal.id)
          .select('*');

        ownerAnimals.push({
          ...animal,
          communiques,
        });

        if (index === array.length - 1) resolve();
      });
    });

    return getAnimalsCommuniques.then(() => response.json(ownerAnimals));
  },
};
