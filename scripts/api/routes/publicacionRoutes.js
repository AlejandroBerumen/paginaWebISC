const express = require("express");
const publicacionService = require("../services/publicacionService");

const router = express.Router();


router.post("/publicacion", crearPublicacion);
router.get("/publicacion", obtenerPublicacion);
router.put("/publicacion/:id", actualizarPublicacion);
router.post("/publicacion/imagenPublicacion", crearImagenPublicacion);
router.delete("/publicacion/imagenPublicacion", eliminarImagenPublicacion);
router.delete("/publicacion/:id", eliminarPublicacion);

async function crearPublicacion(req, res, next){

    try {
    
        const result = await publicacionService.crearPublicacion(req.body);
        res.status(result.status).json(result.publicacionCreada);

    } catch (error) {
    
        next(error);
    
    }

}

async function crearImagenPublicacion(req, res, next){
    try{
        const result = await publicacionService.crearImagenPublicacion(req.files[0], req.body);
        res.status(result.status).json(result.rutas);
    }catch (error) {
        next(error);
    }
}

async function obtenerPublicacion(req, res, next){
    
    try {

        const claves = ['id']
        let query = req.query;

        const existen_claves = claves.some(clave => Object.keys(query).includes(clave));

        if(existen_claves){

            query = { id=null} = query;

            const result = await publicacionService.obtenerPublicacion(req.query);
            res.status(result.status).json(result.publicacionObtenida);

        }else{

            const result = await publicacionService.obtenerPublicacionesTodas();
            res.status(result.status).json(result.publicacionesFiltradas);

        }
    
    } catch (error) {
    
        next(error);
    
    }

}

async function eliminarPublicacion(req, res, next){
    
    try {
    
        const result = await publicacionService.eliminarPublicacion(req.params);
        res.status(result.status).json(result.publicacionEliminada);
    
    } catch (error) {
    
        next(error);
    
    }

}

async function actualizarPublicacion(req, res, next){

    try {

        const result = await publicacionService.actualizarPublicacion(req.params, req.body);
        res.status(result.status).json(result.publicacionModificada);

    } catch (error) {

        next(error);

    }

}

async function eliminarImagenPublicacion(req, res, next){
    
    try {

        const result = await publicacionService.eliminarImagenPublicacion(req.query);
        res.status(result.status).json(result.imagenPublicacionEliminada);
    
    } catch (error) {
    
        next(error);
    
    }

}

module.exports = (app) => {app.use('/publicaciones', router)};