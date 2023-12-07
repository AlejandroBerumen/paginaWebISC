const solicitudRepository = require('../repositories/solicitudRepository');


async function crearSolicitud(solicitud){
    return await solicitudRepository.crearSolicitud(solicitud);
}

async function obtenerSolicitudes(solicitud){
    return await solicitudRepository.obtenerSolicitudes(solicitud);
}

async function obtenerSolicitudesTodas(solicitud){
    return await solicitudRepository.obtenerSolicitudesTodas(solicitud);
}

async function eliminarSolicitud(solicitud){
    return await solicitudRepository.eliminarSolicitud(solicitud);
}

module.exports = {
    crearSolicitud,
    obtenerSolicitudes,
    obtenerSolicitudesTodas,
    eliminarSolicitud,
}