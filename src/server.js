const app = require('./app');
require('dotenv-safe').config()

app.listen(process.env.PORT || 8080, () => console.log('Server running'));
