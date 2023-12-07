const db = require('../models/index');
const proyectoModel = require('../models/proyecto')(db.sequelize, db.Sequelize);
const usuarioModel = require('../models/usuario')(db.sequelize, db.Sequelize);
const contenidoModel = require('../models/contenido')(db.sequelize, db.Sequelize);
const documentoModel = require('../models/documento')(db.sequelize, db.Sequelize);

const fs = require('fs').promises;


async function crearProyecto(proyecto){

    const nombre_usuario = proyecto.nombre_usuario;
    let status;

    const proyectoCreado = await usuarioModel.findOne({ raw:true, where: {nombre_usuario} }).then(async (usuario)=>{
        
        if(usuario){
            status = 201;
            return await contenidoModel.create({id_usuario:usuario.id});
        }else{
            status = 404;
            return { msg:'usuario no encontrado' };
        }

    }).then(async (contenido)=>{
        proyecto['id_contenido'] = contenido.id;
        return await proyectoModel.create(proyecto);
    });

    return { proyectoCreado, status };

}

async function consultarProyectos(proyecto){

    let status;

    const proyectosEncontrados = await proyectoModel.findAll({
        where: proyecto,
        attributes: ['id', 'nombre', 'descripcion', 'tipo', 'periodo'] 
    }).then(async (result)=>{
        
        if(result.length!=0){
            status = 201;
            return result;
        }else{
            status = 404;
            return { msg:'proyectos no encontrados' };
        }

    });

    return { proyectosEncontrados, status };

}

async function consultarProyectosTodos(){

    const proyectosEncontrados = await proyectoModel.findAll({
        attributes: ['id', 'nombre', 'descripcion', 'tipo', 'periodo'] 
    });

    return { proyectosEncontrados, status:200 };

}

async function consultarProyectoUnico(params){

    let status;

    let proyectoEncontrado = await proyectoModel.findOne({
        raw: true,
        attributes: ['id', 'nombre', 'descripcion', 'tipo', 'periodo'],
        where: params,
    }).then(async (result) => {

        if(result){
            status=200;
            return result;
        }else{
            status=404;
            return null;
        }

    });

    if(proyectoEncontrado){

        proyectoEncontrado['documentos'] = await documentoModel.findAll({
            raw: true,
            where: {id_proyecto:proyectoEncontrado.id}
        });

    }else{

        proyectoEncontrado = {
            msg: 'proyecto no encontrado',
        }
    
    }

    return { proyectoEncontrado, status:200 };

}

async function eliminarProyecto(params){

    let status;
    let nombre;
    let rutaFolder;
    let ruta;

    const proyectoEliminado = await proyectoModel.findOne({ where: params }).then(async (result)=>{
    
        if(result){

            const documentosObtenidos = await documentoModel.findAll({ where:{id_proyecto:params.id}, raw:true });
            
            //console.log(documentosObtenidos[0]);
            if(documentosObtenidos.length>0){
                for(var i=0; i<documentosObtenidos.length; i++){
                    rutaFolder = documentosObtenidos[i].direccion;    
                }
                for await (const documento of documentosObtenidos){
                    // eliminando archivos
                    nombre = documento.nombre;
                    rutaFolder = `${documento.direccion}${nombre}`;
                    ruta = `${documento.direccion}`;
                    try{
                        buffer = await fs.unlink(rutaFolder);    
                    }catch(e){}
                }
                await fs.rmdir(ruta);
            }

            await proyectoModel.destroy({where: params});
            status = 200;
            return { msg:'proyecto eliminado' };

        }else{
            status = 404;
            return { msg:'proyecto no encontrado' };
        }

    });

    return { proyectoEliminado, status };

}

async function actualizarProyecto(proyecto, nuevo_proyecto){

    let status;

    const proyectoModificado = await proyectoModel.findOne({ where: proyecto }).then(async (result)=>{
    
        if(result){
            status = 200;
            await proyectoModel.update(nuevo_proyecto, { where: proyecto});
            return { msg:'proyecto modificado' };
        }else{
            status = 404;
            return { msg:'proyecto no encontrado' };
        }

    });

    return { proyectoModificado, status };

}

module.exports = {
    crearProyecto,
    consultarProyectos,
    consultarProyectosTodos,
    consultarProyectoUnico,
    eliminarProyecto,
    actualizarProyecto,
}