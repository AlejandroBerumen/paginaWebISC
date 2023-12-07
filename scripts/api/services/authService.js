const authRepository = require("../repositories/authRepository");


async function register(usuario){
    return await authRepository.register(usuario);
}

async function login(usuario){
    return await authRepository.login(usuario);
}

module.exports = {
    register,
    login,
}