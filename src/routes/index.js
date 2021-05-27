const express = require('express');

const UserRouter = require('./UserRouter');
const SessionRouter = require('./SessionRouter');

const routes = express.Router();

routes.use('/users', UserRouter);
routes.use('/sessions', SessionRouter);

module.exports = routes;