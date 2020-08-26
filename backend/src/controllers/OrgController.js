const connection = require('../db/index');

module.exports = {
    async create(request, response) {
        try {
            const { name, responsible, email, password, phone, address, number, complement, zipcode, 
                neighborhood, city, uf, cnpj, type
            } = request.body;
            
            const result = await connection('organization').insert({
                name,
                responsible,
                email,
                password,
                phone,
                address,
                number,
                complement,
                zipcode,
                neighborhood,
                city,
                uf,
                cnpj,
                type,
            });
            
            return response.json("Organização cadastrada com sucesso");
        } catch (error) {
            return response.json(`O seguinte erro ocorreu: ${error.message}`);
        }
    },

    async get_all_orgs(request, response) {
        try {
            const results = await connection('organization');

            return response.json(results);
        } catch (error) {
            return response.json(`O seguinte erro ocorreu: ${error.message}`);
        }
    },

    async get_org(request, response) {
        try {
            const id = request.params.id;
            const result = await connection('organization').where({ id });

            return response.json(result);
        } catch (error) {
            return response.json(`O seguinte erro ocorreu: ${error.message}`);
        }
    },

    async update(request, response) {
        try {
            const id = request.params.id;
            const { name, responsible, email, password, phone, address, number, complement, zipcode, 
                neighborhood, city, uf, cnpj, type
            } = request.body;
            
            const result = await connection('organization').update({
                name,
                responsible,
                email,
                password,
                phone,
                address,
                number,
                complement,
                zipcode,
                neighborhood,
                city,
                uf,
                cnpj,
                type,
            }).where({ id });
            
            return response.json(result);
        } catch (error) {
            return response.json(`O seguinte erro ocorreu: ${error.message}`);
        }
    },

    async delete(request, response) {
        try {
            const { id } = request.params;

            await connection('organization').where({ id }).delete();
            
            return response.json("Organização excluída com sucesso"); 
        } catch (error) {
            return response.json(`O seguinte erro ocorreu: ${error.message}`);
        }
    }
}