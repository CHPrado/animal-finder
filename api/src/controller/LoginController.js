const connection = require('../database/connection');

module.exports = {
  async login(request, response) {
    const { email, password } = request.body;

    const owner = await connection('owner')
      .where({ email, password })
      .select('id', 'name')
      .first();

    if (!owner) {
      return response.status(400).json({ message: 'E-Mail ou senha inválidos!' });
    }

    return response.json(owner);
  },
};
