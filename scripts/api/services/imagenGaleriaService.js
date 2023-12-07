const imagenGaleriaRepository = require('../repositories/imagenGaleriaRepository');


async function crearImagenGaleria(imagenes, imagenGaleria){
    return await imagenGaleriaRepository.crearImagenGaleria(imagenes, imagenGaleria);
}

async function obtenerImagenGaleriaTodas(){
    return await imagenGaleriaRepository.obtenerImagenGaleriaTodas();
}

async function obtenerImagenGaleria(imagenGaleria){
    return await imagenGaleriaRepository.obtenerImagenGaleria(imagenGaleria);
}

async function eliminarImagenGaleria(imagenGaleria){
    return await imagenGaleriaRepository.eliminarImagenGaleria(imagenGaleria);
}

module.exports = {
    crearImagenGaleria,
    obtenerImagenGaleriaTodas,
    obtenerImagenGaleria,
    eliminarImagenGaleria,
}