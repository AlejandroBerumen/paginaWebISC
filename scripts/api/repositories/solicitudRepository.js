const db = require('../models/index');
const solicitudModel = require('../models/solicitud')(db.sequelize, db.Sequelize);


async function crearSolicitud(solicitud){

    const solicitudCreada = await solicitudModel.create(solicitud);
    return { solicitudCreada, status:200 };

}

async function obtenerSolicitudes(solicitud){
    let status;

    const solicitudesEncontradas = await solicitudModel.findAll({
        attributes: ['id', 'nombre', 'numero_telefono', 'correo', 'contenido', 'createdAt'],
        where:solicitud,
    }).then(async (result)=>{
        if(result){
            status = 200;
            return result;
        }else{
            status = 404;
            return { msg:'publicacion no encontrada' };
        }
    });

    return { solicitudesEncontradas, status };

}

async function obtenerSolicitudesTodas(){

    const solicitudesEncontradasTodas = await solicitudModel.findAll({
        attributes: ['id', 'nombre', 'numero_telefono', 'correo', 'contenido', 'createdAt'],
    });

    return { solicitudesEncontradasTodas, status:200 };
    
}

async function eliminarSolicitud(solicitud){

    await solicitudModel.destroy({ where: {id:solicitud.id} });

    return { solicitudEliminada: {msg: 'solicitud eliminada'}, status:200 };

}

module.exports = {
    crearSolicitud,
    obtenerSolicitudes,
    obtenerSolicitudesTodas,
    eliminarSolicitud,
}