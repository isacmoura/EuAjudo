const connection = require('../db/index');

module.exports = {
    async create(request, response) {
        try {
            const { name, email, password, phone, address, number, complement, city, uf } = request.body;
            
            const result = await connection('organization').insert({
                name,
                email,
                password,
                phone,
                address,
                number,
                complement,
                city,
                uf,
            }).returning(['id', 'name']).then((async function(res) {
                var reg = res[0]
                // Salvando log
                await connection('log').insert({
                    title: 'Criação de organização',
                    description: `A organização ${reg.name} se cadastrou no sistema`,
                    org_id: reg.id
                });
            }));

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
            const { name, email, password, phone, address, number, complement, city, uf } = request.body;
            
            const result = await connection('organization').update({
                name,
                email,
                password,
                phone,
                address,
                number,
                complement,
                city,
                uf,
            }).where({ id }).returning(['id', 'name']).then((async function(res) {
                var reg = res[0]
                // Salvando log
                await connection('log').insert({
                    title: 'Atualização de organização',
                    description: `A organização ${reg.name} atualizou informações`,
                    org_id: res.id
                });
            }));;
            
            return response.json("Organização atualizada com sucesso");
        } catch (error) {
            return response.json(`O seguinte erro ocorreu: ${error.message}`);
        }
    },

    async delete(request, response) {
        try {
            const { id } = request.params;

            await connection('organization').where({ id }).delete().returning(['id', 'name'])
            .then((async function(res) {
                var reg = res[0]
                // Salvando log
                await connection('log').insert({
                    title: 'Organização excluída',
                    description: `A organização de identificador ${reg.name} saiu do sistema`,
                    org_id: res.id
                });
            }));;;
            
            return response.json("Organização excluída com sucesso"); 
        } catch (error) {
            return response.json(`O seguinte erro ocorreu: ${error.message}`);
        }
    }
}