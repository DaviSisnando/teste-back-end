const express = require("express");

const UserRouter = require("./UserRouter");
const SessionRouter = require("./SessionRouter");

const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("../config/swagger.json");

const routes = express.Router();

routes.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument, { explorer: true })
);

routes.use("/users", UserRouter);
routes.use("/sessions", SessionRouter);

module.exports = routes;
