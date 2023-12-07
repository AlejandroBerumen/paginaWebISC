const db = require('../models/index');
const fs = require('fs').promises;
const fs1 = require('fs');
const config = require('../config/config');
const publicacionModel = require('../models/publicacion')(db.sequelize, db.Sequelize);
const usuarioModel = require('../models/usuario')(db.sequelize, db.Sequelize);
const contenidoModel = require('../models/contenido')(db.sequelize, db.Sequelize);


async function crearPublicacion(publicacion) {
    const nombre_usuario = publicacion.nombre_usuario;
    let status;
    //let rutaFolder;

    const publicacionCreada = await usuarioModel.findOne({ where: {nombre_usuario} }).then(async (result) => {
        if(result){
            const contenidoCreado = await contenidoModel.create({id_usuario:result.id});
            status = 201;
            publicacion['id_contenido'] = contenidoCreado.id;

            const publicacionEncontrada = await publicacionModel.create(publicacion);

           /* rutaFolder = `${config.imagepublicationpath}/${publicacionEncontrada.id}`;
            fs.mkdir(rutaFolder);

            for(const imagen of imagenes){
                nombreArchivo = imagen.originalname;
                buffer = imagen.buffer;

                // creando archivos
                fs.writeFile(`${rutaFolder}/${nombreArchivo}`, buffer);
            }*/

            return { msg:'publicacion creada e imagenes subidas' };
        }else{
            status = 404;
            return { msg:'usuario no encontrado' };
        }
    });

    return { publicacionCreada, status };
}

async function crearImagenPublicacion(imagenes, body){
    let rutaFolder;
    rutaFolder = `${config.imagepublicationpath}`;
    var rutas = new Array();

        //console.log(imagenes);
        nombreArchivo = imagenes.originalname;
        buffer = imagenes.buffer;
        /*console.log(imagenes);
        console.log(nombreArchivo);
        console.log(buffer);*/

        //gestión de nombres de archivo
        var cont = 1;
        while(fs1.existsSync(`${rutaFolder}/${nombreArchivo}`)){
            var path = require('path');
            var ext = path.extname(nombreArchivo);
            nombreArchivo = nombreArchivo.substring(0, nombreArchivo.indexOf(ext)) + "(" + cont + ")" + ext;
            cont++;
            if(cont%200==0)
                console.log(cont);
        }

        // creando archivos
        fs.writeFile(`${rutaFolder}/${nombreArchivo}`, buffer);
        rutas.push(`${rutaFolder}/${nombreArchivo}`);

    return {rutas: rutas[0], status:200};
}

async function obtenerPublicacion(publicacion){
    let status;
    let rutaFolder = config.imagepublicationpath;
    let rutasArchivos = [];

    const publicacionObtenida = await publicacionModel.findOne({
        attributes: ['titulo', 'cuerpo'],
        where: publicacion,
        raw:true
    }).then(async (result)=>{
        if(result){

            const ruta = `${rutaFolder}/${publicacion.id}`;

            try {

                await fs.access(ruta);
                const archivos = await fs.readdir(ruta);

                for(const archivo of archivos){
                    rutasArchivos.push(`${ruta}/${archivo}`);
                }

            } catch (error) {
                
            }

            result['rutas_imagenes'] = rutasArchivos;

            status = 200;
            return result;

        }else{
            status = 404;
            return { msg:'publicacion no encontrada' };
        }
    });

    return { publicacionObtenida, status };
}

async function obtenerPublicacionesTodas(){

    const publicacionesObtenidas = await publicacionModel.findAll({
        attributes: ['id', 'titulo', 'cuerpo', 'createdAt', 'id_contenido'],
        raw: true,
        order: [['id', 'DESC']],
    });

    let publicacionesFiltradas = [];

    for (const result of publicacionesObtenidas) {
        const contenido = await contenidoModel.findOne({
            where:{id:result.id_contenido},
            raw:true
        });
        const usuario = await usuarioModel.findOne({
            where:{id:contenido.id_usuario},
            raw:true,
            attributes:['nombre_usuario']
        });

        delete result.id_contenido;

        if(usuario){
            result['autor'] = usuario.nombre_usuario;
        }

        publicacionesFiltradas.push(result);
    }

    return { publicacionesFiltradas, status:200 };
}

async function eliminarPublicacion(publicacion){

    let status;
    const id = publicacion.id;
    /*const rutaFolder = config.imagepublicationpath;
    let ruta;*/

    const publicacionEliminada = await publicacionModel.findOne({ where: {id} }).then(async (result)=>{
        if(result){

            /*ruta = `${rutaFolder}/${publicacion.id}`;
            const archivos = await fs.readdir(ruta);

            for await(const archivo of archivos){
                await fs.rm(`${ruta}/${archivo}`);
            }
            await fs.rmdir(ruta);*/
            
            await publicacionModel.destroy({ where: {id:result.id} });
            status = 200;
            return { msg: 'publicacion eliminada' };

        }else{
            status = 404;
            return { msg: 'publicacion no encontrada' };
        }
    });

    return { publicacionEliminada, status };

}

async function actualizarPublicacion(publicacion, nueva_publicacion){

    let status;
    const id = publicacion.id;

    const publicacionModificada = await publicacionModel.findOne({ where: {id} }).then(async (result)=>{

        if(result){
            status = 200;
            await publicacionModel.update( nueva_publicacion, { where: {id:result.id}});
            return { msg: 'publicacion actualizada' };
        }else{
            status = 404;
            return { msg: 'publicacion no encontrada' };
        }

    });

    return { publicacionModificada, status };

}

async function eliminarImagenPublicacion(publicacion){

    const nombre = publicacion.nombre;
    const id = publicacion.id;
    const rutaFolder = config.imagepublicationpath;
    let ruta;
    let status;
    let imagenPublicacionEliminada;

    ruta = `${rutaFolder}/${id}`;

    try{

        await fs.access(`${ruta}/${nombre}`);
        await fs.rm(`${ruta}/${nombre}`);
        imagenPublicacionEliminada = {msg:'imagen de publicacion eliminada'};
        status = 200;
    
    }catch(error){
    
        if (error.code === 'ENOENT') {
            imagenPublicacionEliminada  = {msg:'imagen de publicacion no encontrada'};
            status = 404;
        } 
    
    }

    return { imagenPublicacionEliminada, status };

}

module.exports = {
    crearPublicacion,
    obtenerPublicacion,
    obtenerPublicacionesTodas,
    eliminarPublicacion,
    crearImagenPublicacion,
    eliminarImagenPublicacion,
    actualizarPublicacion,
}