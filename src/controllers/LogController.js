const connection = require('../db/index');

module.exports = {
    async get_logs(request, response) {
        try {
            const results = await connection('log')
            .orderBy('created_at', 'desc');

            return results;
        } catch (error) {
            return response.json(`O seguinte erro ocorreu: ${error.message}`);
        }
    },
}