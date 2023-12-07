const express = require('express');
const proyectoService = require('../services/proyectoService');

const router = express.Router();

router.post('/', crearProyecto);
router.get('/', consultarProyectos);
router.get('/:id', consultarProyectoUnico);
router.put('/:id', actualizarProyecto);
router.delete('/:id', eliminarProyecto);


async function crearProyecto(req, res, next){
    
    try {

        const result = await proyectoService.crearProyecto(req.body);
        res.status(result.status).json(result.proyectoCreado);

    } catch (error) {

        next(error);

    }

}

async function consultarProyectos(req, res, next){

    try {

        const claves = ['nombre', 'tipo']
        let query = req.query;

        const existen_claves = claves.some(clave => Object.keys(query).includes(clave));

        if(existen_claves){

            query = { nombre=null, tipo=null } = query;

            const result = await proyectoService.consultarProyectos(query);
            res.status(result.status).json(result.proyectosEncontrados);
        
        }else{

            const result = await proyectoService.consultarProyectosTodos();
            res.status(result.status).json(result.proyectosEncontrados);
        
        }

    } catch (error) {

        next(error);

    }

}

async function consultarProyectoUnico(req, res, next){

    try {

        const params = req.params;

        if('id' in params){

            const result = await proyectoService.consultarProyectoUnico(params);
            res.status(200).json(result.proyectoEncontrado);

        }

    } catch (error) {

        next(error);

    }

}

async function eliminarProyecto(req, res, next){

    try{

        const result = await proyectoService.eliminarProyecto(req.params);
        res.status(result.status).json(result.proyectoEliminado);

    }catch(error){

        next(error);

    }

}

async function actualizarProyecto(req, res, next){

    try{

        const result = await proyectoService.actualizarProyecto(req.params, req.body);
        res.status(result.status).json(result.proyectoModificado);

    }catch(error){

        next(error);

    }

}

module.exports = (app) => {app.use('/proyectos/proyecto', router)};