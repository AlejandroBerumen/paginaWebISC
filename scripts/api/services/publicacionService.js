const publicacionRepository = require('../repositories/publicacionRepository.js');


async function crearPublicacion(publicacion){
    return await publicacionRepository.crearPublicacion(publicacion);
}

async function obtenerPublicacion(publicacion){
    return await publicacionRepository.obtenerPublicacion(publicacion);
}

async function obtenerPublicacionesTodas(){
    return await publicacionRepository.obtenerPublicacionesTodas();
}

async function eliminarPublicacion(publicacion){
    return await publicacionRepository.eliminarPublicacion(publicacion);
}

async function actualizarPublicacion(publicacion, nueva_publicacion){
    return await publicacionRepository.actualizarPublicacion(publicacion, nueva_publicacion);
}

async function crearImagenPublicacion(imagenes, body){
    return await publicacionRepository.crearImagenPublicacion(imagenes, body);
}

async function eliminarImagenPublicacion(publicacion){
    return await publicacionRepository.eliminarImagenPublicacion(publicacion);
}


module.exports = {
    crearPublicacion,
    obtenerPublicacion,
    obtenerPublicacionesTodas,
    eliminarPublicacion,
    crearImagenPublicacion,
    eliminarImagenPublicacion,
    actualizarPublicacion,
}