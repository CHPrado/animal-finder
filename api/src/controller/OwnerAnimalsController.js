const connection = require('../database/connection');

module.exports = {
  async index(request, response) {
    const ownerId = request.headers.authorization;

    const animals = await connection('animal')
      .where('ownerId', ownerId)
      .select('*');

    const ownerAnimals = [];

    const getAnimalsCommuniques = new Promise((resolve) => {
      if (!animals.length) resolve();

      animals.forEach(async (animal, index, array) => {
        const communiques = await connection('communique')
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
