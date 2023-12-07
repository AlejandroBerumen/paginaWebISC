const db = require('../models/index');
const config = require('../config/config');
const fs = require("fs").promises;
const usuarioModel = require('../models/usuario')(db.sequelize, db.Sequelize);
const contenidoModel = require('../models/contenido')(db.sequelize, db.Sequelize);
const imagenGaleriaModel = require('../models/imagenes_galeria')(db.sequelize, db.Sequelize);


async function crearImagenGaleria(imagen, imagenesGaleria){

    let status = 200;
    let rutaFolder;


    const imagenGaleriaCreada = await usuarioModel.findOne({ where: {nombre_usuario:imagenesGaleria.nombre_usuario} }).then(async (usuario)=>{

        if(usuario){
            return await contenidoModel.create({ id_usuario:usuario.id });
        }else{
            status = 404;
            return { msg:'usuario no encontrado' };
        }

    }).then(async (contenido)=>{

        if(contenido){

            rutaFolder = `${config.imagegallerypath}`;

            nombreArchivo = imagenesGaleria.nombre;
            buffer = imagen.buffer;

            // creando archivos
            fs.writeFile(`${rutaFolder}/${imagen.originalname}`, buffer);

            return await imagenGaleriaModel.create({
                direccion:`${rutaFolder}/${imagen.originalname}`,
                nombre:nombreArchivo,
                descripcion:imagenesGaleria.descripcion,
                id_contenido:contenido.id
            });
            
        }else{
            status = 404;
            return { msg:'imagen no creada' };
        }
        
    });

    return { imagenGaleriaCreada, status };

}

async function obtenerImagenGaleriaTodas(){

    const imagenGaleriaTodas = await imagenGaleriaModel.findAll({
        attributes:['id', 'nombre', 'descripcion', 'direccion'],
    });

    return { imagenGaleriaTodas, status:200 };

}

async function obtenerImagenGaleria(imagenGaleria){

    let status;

    const imagenGaleriaEncontrada = await imagenGaleriaModel.findOne({
        attributes:['id', 'nombre', 'descripcion', 'direccion'],
        where: {id:imagenGaleria.id}
    }).then(async (result)=>{

        if(result){
            status = 200;
            return result;
        }else{
            return { msg:'imagen no encontrada' };
        }

    });

    return { imagenGaleriaEncontrada, status };

}

async function eliminarImagenGaleria(imagenGaleria){

    let status;

    const imagenGaleriaEliminada = await imagenGaleriaModel.findOne({ where:{id:imagenGaleria.id} }).then(async (result)=>{

        if(result){

            await imagenGaleriaModel.destroy({where:{id:imagenGaleria.id}});
            fs.rm(`${result.direccion}`);
            status = 200;
            
            return {msg:'imagen eliminada'};
        }else{
            status = 404;
            return {msg:'imagen no encontrada'};
        }

    });

    return { imagenGaleriaEliminada, status };

}

module.exports = {
    crearImagenGaleria,
    obtenerImagenGaleria,
    obtenerImagenGaleriaTodas,
    eliminarImagenGaleria,
}