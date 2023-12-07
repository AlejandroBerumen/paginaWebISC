const documentoService = require('../services/documentoService');
const express = require('express');


const router = express.Router();

router.get('/', obtenerDocumentos);
router.post('/', crearDocumento);
router.delete('/:id', eliminarDocumento);


async function crearDocumento(req, res, next){

    try{

        const result = await documentoService.crearDocumento(req.files, req.body);
        res.status(result.status).json(result.documentoCreado);

    }catch(error){

        next(error);

    }

}

async function eliminarDocumento(req, res, next){
    
    try{

        const result = await documentoService.eliminarDocumento(req.params);
        res.status(result.status).json(result.documentoEliminado);

    }catch(error){

        next(error);

    }

}

async function obtenerDocumentos(req, res, next){

    try{

        let query = req.query;

        if('id' in query){
            const result = await documentoService.obtenerDocumento(query);
            res.status(result.status).json(result.documentoObtenido);
        }else{
            const result = await documentoService.obtenerDocumentosTodos();
            res.status(result.status).json(result.documentos);
        }

    }catch(error){

        next(error);

    }

}

module.exports = (app) => {app.use('/documentos/documento', router);};