const connection = require('../db/index');

module.exports = {
    async create(request, response) {
        try {
            const org_id = request.params.org_id;
            const { title, description } = request.body;

            const case_res = await connection('organization').where('id', org_id).returning('name');
            
            const result = await connection('case').insert({
                title,
                description,
                org_id
            }).returning(['org_id', 'title']).then((async function(res) {
                var reg = res[0];

                // Salvando log
                await connection('log').insert({
                    title: 'Criação de ação',
                    description: `A ação ${reg.title} foi criada pela organização ${case_res[0].name}`,
                    org_id: reg.org_id
                });
            }));;
            
            return response.json({ result });
        } catch (error) {
            return response.json(`O seguinte erro ocorreu: ${error.message}`);
        }
    },

    async get_all_cases(request, response) {
        try {
            const results = await connection('case');

            return response.json(results);
        } catch (error) {
            return response.json(`O seguinte erro ocorreu: ${error.message}`);
        }
    },

    async get_case(request, response) {
        try {
            const id = request.params.id;
            const result = await connection('case').where({ id });

            return response.json(result);
        } catch (error) {
            return response.json(`O seguinte erro ocorreu: ${error.message}`);
        }
    },

    async get_cases_from_org(request, response) {
        try {
            const id = request.params.org_id;

            const result = await connection('case').where('org_id', id);

            return response.json(result);
        } catch (error) {
            return response.json(`O seguinte erro ocorreu: ${error.message}`);
        }
    },

    async update(request, response) {
        try {
            const case_id = request.params.id;
            const { title, description } = request.body;
            
            const result = await connection('case').update({
                title,
                description,
            }).where('id', case_id).returning(['org_id', 'title']).then((async function(res) {
                let reg = res[0];
                
                let case_res = await connection('organization').where('id', reg.org_id).returning('name');

                // Salvando log
                await connection('log').insert({
                    title: 'Atualização de ação',
                    description: `A ação ${reg.title} foi atualizada pela organização ${case_res[0].name}`,
                    org_id: reg.org_id
                });
            }));;;
            
            return response.json({ result });
        } catch (error) {
            return response.json(`O seguinte erro ocorreu: ${error.message}`);
        }
        
    },

    async delete(request, response) {
        try {
            const id = request.params.id;

            await connection('case').where({ id }).delete().where('id', id)
                .returning(['org_id', 'title']).then((async function(res) {
                    let reg = res[0];
                    
                    let case_res = await connection('organization').where('id', reg.org_id).returning('name');

                    // Salvando log
                    await connection('log').insert({
                        title: 'Exclusão de ação',
                        description: `A ação ${reg.title} foi excluída pela organização ${case_res[0].name}`,
                        org_id: reg.org_id
                    });
                }));
            
            return response.json("Ação excluída com sucesso"); 
        } catch (error) {
            return response.json(`O seguinte erro ocorreu: ${error.message}`);
        }
    }
}