const config = require('../config/config')
const db = require('../models/index');
const documentoModel = require('../models/documento')(db.sequelize, db.Sequelize);
const proyectoModel = require('../models/proyecto')(db.sequelize, db.Sequelize);
const fs = require('fs').promises;


async function crearDocumento(documentos, datos){

    let rutaFolder;

    let documentoCreado;
    let status;
    let nombreArchivo;
    let buffer;

    try{

        let proyectoEncontrado = await proyectoModel.findOne({where: {id:datos.id} });

        if(proyectoEncontrado){

            rutaFolder = `${config.filepath}/${proyectoEncontrado.nombre}/`;
            
            try{
                fs.mkdir(rutaFolder);
            }catch(e){} 
            
            for await (const documento of documentos) {
                nombreArchivo = documento.originalname;
                buffer = documento.buffer;

                await documentoModel.create({
                    direccion:rutaFolder,
                    nombre:nombreArchivo,
                    id_proyecto:proyectoEncontrado.id
                });

                // creando archivos
                fs.writeFile(`${rutaFolder}${nombreArchivo}`, buffer);
            }
            
            status = 200;
            documentoCreado = {msg:'archivos creados correctamente'};

        }else{
            status = 404;
            documentoCreado = { msg:'proyecto no encontrado' };
        }

    }catch(error){

        documentoCreado = {msg:'archivos no creados'};
        status = 400;

    }

    return { documentoCreado, status};

}

async function eliminarDocumento(documento){

    let status;

    let documentoEliminado = await documentoModel.findOne({where: documento}).then(async (result)=>{

        if(result){
            await fs.unlink(`${result.direccion}/${result.nombre}`);
            await documentoModel.destroy({where:documento});
            status = 200;
            return {msg:'documento eliminado'};
        }else{
            status = 404;
            return {msg:'no existe el documento'};
        }

    });

    return { documentoEliminado, status};

}

async function obtenerDocumento(documento){

    let status;

    const documentoObtenido = await documentoModel.findOne({where: documento}).then(async (result)=>{

        if(result){

            const nombre = result.nombre;
            const ruta = `${result.direccion}${nombre}`
            const buffer = await fs.readFile(ruta);
            const documento = {id:result.id, nombre, buffer, createdAt:result.createdAt};

            status = 200;
            return documento;
        }else{
            status = 404;
            return {msg:'documento no encontrado'};
        }

    });

    return {documentoObtenido, status}

}

async function obtenerDocumentosTodos(){

    let documentos = [];
    let buffer;
    let nombre;

    const documentosObtenidos = await documentoModel.findAll();

    for await (const documento of documentosObtenidos){
        // leyendo archivos
        nombre = documento.nombre;
        ruta = `${documento.direccion}${nombre}`
        buffer = await fs.readFile(ruta);
        documentos.push({id:documento.id, nombre, buffer});
    }

    return { documentos, status:200 };

}

module.exports = {
    crearDocumento,
    eliminarDocumento,
    obtenerDocumento,
    obtenerDocumentosTodos
};