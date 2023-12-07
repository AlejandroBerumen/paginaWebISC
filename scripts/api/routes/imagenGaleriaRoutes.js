const express = require('express');
const imagenGaleriaService = require('../services/imagenGaleriaService');

const router = express.Router();


router.post('/', crearImagenGaleria);
router.get('/', obtenerImagenGaleria);
router.delete('/:id', eliminarImagenGaleria);

async function crearImagenGaleria(req, res, next){

    try {

        const result = await imagenGaleriaService.crearImagenGaleria(req.files[0], req.body);
        res.status(result.status).json(result.imagenGaleriaCreada);

    } catch (error) {

        next(error);
        
    }

}

async function obtenerImagenGaleria(req, res, next){

    try {
        const existe_clave = 'id' in req.query;

        if(existe_clave){
            const result = await imagenGaleriaService.obtenerImagenGaleria(req.query);
            res.status(result.status).json(result.imagenGaleriaEncontrada);
        }else{
            const result = await imagenGaleriaService.obtenerImagenGaleriaTodas();
            res.status(result.status).json(result.imagenGaleriaTodas);
        }
        
    } catch (error) {

        next(error);

    }

}

async function eliminarImagenGaleria(req, res, next){

    try{

        const result = await imagenGaleriaService.eliminarImagenGaleria(req.params);
        res.status(result.status).json(result.imagenGaleriaEliminada);

    }catch(error){

        next(error);

    }

}

module.exports = (app) => {app.use('/imagenesGaleria/imagenGaleria', router);};