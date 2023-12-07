const proyectoRepository = require('../repositories/proyectoRepository');


async function crearProyecto(proyecto){
    return await proyectoRepository.crearProyecto(proyecto);
}

async function consultarProyectos(proyecto){
    return await proyectoRepository.consultarProyectos(proyecto);
}

async function consultarProyectosTodos(){
    return await proyectoRepository.consultarProyectosTodos();
}

async function consultarProyectoUnico(params){
    return await proyectoRepository.consultarProyectoUnico(params);
}

async function eliminarProyecto(params){
    return await proyectoRepository.eliminarProyecto(params);
}

async function actualizarProyecto(proyecto, nuevo_proyecto){
    return await proyectoRepository.actualizarProyecto(proyecto, nuevo_proyecto);
}

module.exports = {
    crearProyecto,
    consultarProyectos,
    consultarProyectosTodos,
    consultarProyectoUnico,
    eliminarProyecto,
    actualizarProyecto,
}