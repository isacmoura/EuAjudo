const connection = require('../db/index');

module.exports = {
    async create(request, response) {
        const org = request.body;
        
        const result = await connection('user').insert(
            org.name,
            org.responsible,
            org.email,
            org.password,
            org.phone,
            org.address,
            org.number,
            org.complement,
            org.zipcode,
            org.neighborhood,
            org.city,
            org.uf,
            org.cnpj,
            org.type,
        );
        
        return response.json({ result });
    },

    async get_all_orgs(request, response) {

    },

    async get_org(request, response) {

    },

    async get_org_cases(request, response) {
        
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