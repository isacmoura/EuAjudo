const connection = require('../db/index');

module.exports = {
    async create(request, response) {

        try {
            const { name, cpf, email, password, phone, address, number, complement, zipcode, 
                neighborhood, city, uf
            } = request.body;
    
            const result = await connection('user').insert({
                name,
                cpf,
                email,
                password,
                phone,
                address,
                number,
                complement,
                zipcode,
                neighborhood,
                city,
                uf
            });

            return response.json("Usuário cadastrado com sucesso");
        } catch (error) {
            return response.json(`O seguinte erro ocorreu: ${error.message}`);
        }
    },

    async get_all_users(request, response) {
        try {
            const results = await connection('user');

            return response.json(results);
        } catch (error) {
            return response.json(`O seguinte erro ocorreu: ${error.message}`);
        }
    },

    async get_user(request, response) {
        try {
            const id = request.params.id;
            const result = await connection('user').where({ id });

            return response.json(result);
        } catch (error) {
            return response.json(`O seguinte erro ocorreu: ${error.message}`);
        }
    },

    async get_cases(request, response) {
        try {
            const id = request.params.id;

            const result = await connection('users_cases').where('user_id', id);

            return response.json(result);
        } catch (error) {
            return response.json(`O seguinte erro ocorreu: ${error.message}`);
        }
    },

    async update(request, response) {
        try {
            const id = request.params.id;
            const { name, cpf, email, password, phone, address, number, complement, zipcode, 
                neighborhood, city, uf
            } = request.body;
    
            const result = await connection('user').update({
                name,
                cpf,
                email,
                password,
                phone,
                address,
                number,
                complement,
                zipcode,
                neighborhood,
                city,
                uf
            }).where({ id });

            return response.json(result);
        } catch (error) {
            return response.json(`O seguinte erro ocorreu: ${error.message}`);
        }
    },

    async delete(request, response) {
        try {
            const { id } = request.params;

            await connection('user').where({ id }).delete();
            
            return response.json("Usuário excluído com sucesso"); 
        } catch (error) {
            return response.json(`O seguinte erro ocorreu: ${error.message}`);
        }
    }
}