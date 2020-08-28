const connection = require('../db/index');
const { use } = require('../routes');
const { connect } = require('../app');

module.exports = {
    async create(request, response) {
        try {
            const { name, email, password, phone, address, number, complement, city, uf } = request.body;
    
            const result = await connection('user').insert({
                name,
                email,
                password,
                phone,
                address,
                number,
                complement,
                city,
                uf
            }).returning(['id', 'name']).then((async function(res) {
                var reg = res[0]
                // Salvando log
                await connection('log').insert({
                    title: 'Criação de usuário',
                    description: `O usuário ${reg.name} se cadastrou no sistema`,
                    user_id: reg.id
                });
            }));;

            return response.redirect("/login");
        } catch (error) {
            return response.json(`O seguinte erro ocorreu: ${error.message}`);
        }
    },

    async help_case(request, response) {
        try {
            const user_id = request.userId;
            const case_id = request.params.case_id;

            const result = await connection('users_cases').insert({ user_id, case_id });
            // Salvando log

            let reg = await connection('users_cases')
                .select(['title', 'description', 'name', 'users_cases.id', 'users_cases.created_at'])
                .join('user AS us', 'us.id', '=', 'users_cases.user_id')
                .join('case AS c', 'c.id', '=', 'users_cases.case_id')
                .where('user_id', user_id)
                .orderBy('created_at', 'desc')
                .limit(1);

            let res = reg[0];
            await connection('log').insert({
                title: 'Ajuda obtida',
                description: `O usuário ${res.name} se voluntariou na ação ${res.title} às ${res.created_at}`,
                user_id: reg.id
            });

            return response.redirect("/user/profile");
        } catch (error) {
            return response.json(`O seguinte erro ocorreu: ${error.message}`);
        }
    },

    async get_all_user_cases(request, response) {
        try {
            const user_id = request.params.id;

            const result = await connection('users_cases').where('user_id', user_id );

            return response.json(result);
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
            const id = request.userId;
            const result = await connection('user').where({ id });

            return result[0];
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
            const { name, email, password, phone, address, number, complement, city, uf
            } = request.body;
    
            const result = await connection('user').update({
                name,
                email,
                password,
                phone,
                address,
                number,
                complement,
                city,
                uf
            }).where({ id }).returning(['id', 'name']).then((async function(res) {
                var reg = res[0]
                // Salvando log
                await connection('log').insert({
                    title: 'Atualização de usuário',
                    description: `O usuário ${reg.name} atualizou informações`,
                    user_id: res.id
                });
            }));;

            return response.json(result);
        } catch (error) {
            return response.json(`O seguinte erro ocorreu: ${error.message}`);
        }
    },

    async delete(request, response) {
        try {
            const { id } = request.params;

            await connection('user').where({ id }).delete().returning(['id', 'name']).then((async function(res) {
                var reg = res[0]
                // Salvando log
                await connection('log').insert({
                    title: 'Usuário excluído',
                    description: `O usuário ${reg.name} saiu do sistema.`,
                    user_id: res.id
                });
            }));
            
            return response.redirect("Usuário excluído com sucesso"); 
        } catch (error) {
            return response.json(`O seguinte erro ocorreu: ${error.message}`);
        }
    },

    async delete_cause(request, response) {
        try {
            const user_id = request.params.user_id;
            const case_id = request.params.case_id;

            let case_res = await connection('case').where('id', case_id).returning('title');
            let user_res = await connection('user').where('id', user_id).returning(['id', 'name']);

            await connection('users_cases').where('user_id', user_id).andWhere('case_id', case_id).delete();
            
            // Salvando log
            await connection('log').insert({
                title: 'Cancelamento de voluntariado',
                description: `O usuário ${user_res[0].name} cancelou o voluntariado na causa ${case_res[0].title}`,
                user_id: user_res[0].id
            });
            
            return response.json("Usuário cancelou voluntariado com sucesso"); 
        } catch (error) {
            return response.json(`O seguinte erro ocorreu: ${error.message}`);
        }
    }
}