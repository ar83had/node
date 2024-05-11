const express = require("express");
const routes = express.Router();
const func = require("../function/signup");


routes.get("/",func.signup);
routes.get("/store",func.store);

module.exports = routes;