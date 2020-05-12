const connection = require('../database/connection');

module.exports = {
  async index(request, response) {
    const owner = await connection('owner').select('*');

    return response.json(owner);
  },

  async create(request, response) {
    const {
      name, email, phone, password,
    } = request.body;

    const [id] = await connection('owner').insert({
      name,
      email,
      phone,
      password,
    });

    return response.json({ message: 'Dono registrado!', id, name });
  },
};
