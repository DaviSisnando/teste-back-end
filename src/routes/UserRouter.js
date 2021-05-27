const express = require('express');

const UsersController = require('../controllers/UsersController');
const authMiddleware = require('../middlewares/authUser');

const routes = express.Router();

routes.post('/', UsersController.create);
routes.get('/', UsersController.index);

routes.use(authMiddleware);
routes.get('/:id', UsersController.show);
routes.put('/:id', UsersController.update);
routes.delete('/:id', UsersController.delete);

module.exports = routes;