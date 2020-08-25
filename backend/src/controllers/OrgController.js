const connection = require('../db/index');

module.exports = {
    async create(request, response) {
        const user = request.body;

        const result = await connection('user').insert(
            user.name,
            user.cpf,
            user.email,
            user.password,
            user.phone,
            user.address,
            user.number,
            user.complement,
            user.zipcode,
            user.neighborhood,
            user.city,
            user.uf
        );
        
        return response.json({ result });
    },

    async get_users(request, response) {

    },

    async get_users(request, response) {

    },

    async get_cases(request, response) {
        
    },

    async update(request, response) {

    },

    async delete(request, response) {
        const { id } = request.params;
        const user_id = request.headers.authorization;

        const user = await connection('incidents').where('id', id).select('ong_id').first();
        
        if(incident.ong_id != ong_id) {
            return response.status(401).json({ error: 'Unauthorized' });
        }

        await connection('incidents').where('id', id).delete();
        
        return response.status(204).send();
    }
}