const connection = require('../database/connection');

module.exports = {
  async index(request, response) {
    const { page = 1 } = request.query;
    const qtPagination = 2;

    const [count] = await connection('animal').count().where('status', '=', 0);
    const totalPages = Math.ceil(count['count(*)'] / qtPagination).toString();

    const animals = await connection('animal')
      .join('owner', 'owner.id', '=', 'animal.ownerId')
      .where('status', '=', 0)
      .limit(qtPagination)
      .offset((page - 1) * qtPagination)
      .select([
        'animal.*',
        'owner.name as ownerName',
        'owner.email',
        'owner.phone',
      ]);

    response.header('X-Total-Pages', totalPages);

    return response.json(animals);
  },

  async create(request, response) {
    const {
      picture, name, age, info, city, uf, status,
    } = request.body;
    const ownerId = request.headers.authorization;

    const [id] = await connection('animal').insert({
      picture, name, age, info, city, uf, status, ownerId,
    });

    return response.json({ message: 'Animal cadastrado!', id });
  },

  async update(request, response) {
    const { id } = request.params;
    const {
      picture, name, age, info, city, uf, status,
    } = request.body;
    const ownerId = request.headers.authorization;

    const animal = await connection('animal')
      .where('id', id)
      .select('ownerId')
      .first();

    if (animal.ownerId !== ownerId) {
      return response.status(401).json({ message: 'Você não tem permissão para editar os dados deste animal.' });
    }

    await connection('animal')
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

  async delete(request, response) {
    const { id } = request.params;
    const ownerId = request.headers.authorization;

    const animal = await connection('animal')
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
