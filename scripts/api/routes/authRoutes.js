const express = require("express");
const authService = require("../services/authService");

const router = express.Router();


router.post("/register", register);
router.post("/login", login);

async function register(req, res, next){
    try {
        const result = await authService.register(req.body);
        res.status(201).json(result.usuarioCreado);
    } catch (error) {
        next(error);
    }
}

async function login(req, res, next){
    try {
        const result = await authService.login(req.body);
        res.status(result.status).json(result.usuarioEncontrado);
    } catch (error) {
        next(error);
    }
}

module.exports = (app) => app.use("/auth", router);