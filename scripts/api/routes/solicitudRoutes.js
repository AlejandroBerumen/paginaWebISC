const express = require('express');
const solicitudService = require('../services/solicitudService');

const router = express.Router();


router.post('/', crearSolicitud);
router.get('/', obtenerSolicitudes);
router.delete('/:id', eliminarSolicitud);

async function crearSolicitud(req, res, next){

    try {

        const result = await solicitudService.crearSolicitud(req.body);
        res.status(result.status).json(result.solicitudCreada);

    } catch (error) {

        next(error);

    }

}

async function obtenerSolicitudes(req, res, next){

    try{

        const claves = ["numero_telefono", "nombre", "contenido", "fecha"];
        const query = req.query;

        const existen_claves = claves.some((clave)=>Object.keys(query).includes(clave));

        if(existen_claves){
            const result = await solicitudService.obtenerSolicitudes(query);
            console.log(result);
            res.status(result.status).json(result.solicitudesEncontradas);
        }else{
            const result = await solicitudService.obtenerSolicitudesTodas();
            res.status(result.status).json(result.solicitudesEncontradasTodas);
        }

    }catch(error){

        next(error);

    }

}

async function eliminarSolicitud(req, res, next){

    try{

        const result = await solicitudService.eliminarSolicitud(req.params);
        res.status(result.status).json(result.solicitudEliminada);

    }catch(error){

        next(error);

    }

}

module.exports = (app) => {app.use('/solicitudes/solicitud', router)};