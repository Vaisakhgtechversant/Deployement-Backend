const express = require('express');
const server = express();
const cors = require('cors');

server.use(cors({ origin: 'http://localhost:5173' }));
server.use(express.json());

// ROUTER IMPORT
const foodRouter = require('./router/foodRouter');

// MOUNT ROUTER
server.use(express.urlencoded({ extended: true }));
server.use('/api', foodRouter);

server.listen(8000, () => {
    console.log('Server running at 8000');
});
