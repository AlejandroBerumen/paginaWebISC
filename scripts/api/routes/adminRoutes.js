const express = require('express');
const adminService = require('../services/adminService');
const adminMiddlewares = require('../utils/middlewares/adminMiddlewares/middlewares');
const adminSchema = require('../utils/schemas/adminSchemas/schemas');

router = express.Router();

router.get('/', obtenerAdmin);
router.post('/', crearAdmin);
router.delete('/:id', eliminarAdmin);
router.put('/:id', adminMiddlewares.actualizarValidacionMiddleware({
    params:adminSchema.actualizarAdminSchema
}), actualizarAdmin);


async function obtenerAdmin(req, res, next){

    try {

        const claves = ['id', 'nombre', 'apellido_paterno', 'apellido_materno', 'nombre_usuario'];
        let query = req.query;

        const existen_claves = claves.some(clave => Object.keys(query).includes(clave));

        if(existen_claves){

            query = { nombre=null, apellido_paterno=null, apellido_materno=null, nombre_usuario=null } = query;

            const result = await adminService.obtenerAdmins(query);
            res.status(result.status).json(result.adminsEncontrados);
        
        }else{

            const result = await adminService.obtenerAdminTodos();
            res.status(result.status).json(result.adminsEncontrados);
        
        }

    } catch (error) {
        
        next(error);

    }

}

async function crearAdmin(req, res, next){

    try {

        const result = await adminService.crearAdmin(req.body);
        res.status(result.status).json(result.adminCreado);
        
    } catch (error) {

        next(error);
    
    }
    
}

async function eliminarAdmin(req, res, next){

    try{

        const result = await adminService.eliminarAdmin(req.params, req.body);
        res.status(result.status).json(result.adminEliminado);

    }catch(error){

        next(error);

    }

}

async function actualizarAdmin(req, res, next){

    try{

        const result = await adminService.actualizarAdmin(req.params, req.body);
        res.status(result.status).json(result.adminModificado);

    }catch(error){

        next(error);

    }

}

module.exports = (app) => {app.use('/admins/admin', router);};