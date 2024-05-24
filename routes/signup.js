const express = require("express");
const routes = express.Router();
const func = require("../function/signup");


routes.get("/signup",func.signup);
routes.get("/login",func.login);
routes.get("/login/store",func.login_store);
routes.get("/signup/store",func.store);
routes.get("/shortener/store",func.shorted_store);

module.exports = routes;