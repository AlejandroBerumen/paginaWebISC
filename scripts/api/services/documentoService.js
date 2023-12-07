const documentoRepository = require('../repositories/documentoRepository');


async function crearDocumento(documentos, datos){
    return await documentoRepository.crearDocumento(documentos, datos);
}

async function eliminarDocumento(documento){
    return await documentoRepository.eliminarDocumento(documento);
}

async function obtenerDocumento(documento){
    return await documentoRepository.obtenerDocumento(documento);
}

async function obtenerDocumentosTodos(){
    return await documentoRepository.obtenerDocumentosTodos();
}

module.exports = {
    crearDocumento,
    obtenerDocumento,
    eliminarDocumento,
    obtenerDocumentosTodos,
}