const connection = require('../db/index');
const jwt = require('jsonwebtoken');
const authConfig = require('../utils/config');

module.exports = {
    async login(request, response) {
        try {
            const { email, password, type } = request.body;
            let result = null;
            let address = null;
            
            if(type === 'user'){
                result = await connection('user')
                .where({email})
                .andWhere({password}).returning('id');

                address = '/user/dashboard';
            } else {
                result = await connection('organization')
                .where('email', email)
                .andWhere('password', password).returning('id');

                address = '/org/dashboard';
            }

            let id = '' + result[0].id;
            var token = jwt.sign({id: id}, authConfig.secret, { expiresIn: '2 days' });
            
            response.cookie('auth', token);

            return response.redirect(address)
        } catch (error) {
            return response.json('Login inválido');
        }
    },

    async logout(request, response) {
        try {
            return response.json({auth: false, token: null}); 
        } catch (error) {
            return response.json(`O seguinte erro ocorreu: ${error.message}`);
        }
    }
}