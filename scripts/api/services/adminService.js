const adminRepository = require('../repositories/adminRepository');


async function crearAdmin(admin){
    return await adminRepository.crearAdmin(admin);
}

async function eliminarAdmin(admin_a_eliminar, admin){
    return await adminRepository.eliminarAdmin(admin_a_eliminar, admin);
}

async function actualizarAdmin(admin, nuevo_admin){
    return await adminRepository.actualizarAdmin(admin, nuevo_admin);
}

async function obtenerAdminTodos(){
    return await adminRepository.obtenerAdminTodos();
}

async function obtenerAdmins(admin){
    return await adminRepository.obtenerAdmins(admin);
}

module.exports = {
    crearAdmin,
    eliminarAdmin,
    actualizarAdmin,
    obtenerAdminTodos,
    obtenerAdmins,
}