const connection = require('../database/connection');

module.exports = {
  async create(request, response) {
    const {
      name, phone, info, animalId,
    } = request.body;

    try {
      const [id] = await connection('communique').insert({
        name,
        phone,
        info,
        animalId,
      });

      await connection('animal')
        .update({ status: 1 })
        .where('id', animalId);

      return response.json({ message: 'Comunicado registrado!', id });
    } catch (error) {
      return response.status(400).json({ message: 'Erro ao enviar mensagem!' });
    }
  },
};
