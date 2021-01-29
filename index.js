require('dotenv').config();

const server = require('./api/server');

const port = process.env.PORT || 5001;
server.listen(port, () => 
console.log(`\nserver running on port ${port}\n`));