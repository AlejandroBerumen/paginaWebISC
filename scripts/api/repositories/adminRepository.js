const db = require('../models/index');
const adminModel = require('../models/usuario')(db.sequelize, db.Sequelize);


async function crearAdmin(admin){

    const nombre_usuario_admin = admin.nombre_usuario_admin;
    let status;

    const adminCreado = await adminModel.findOne({ where: {nombre_usuario:nombre_usuario_admin} }).then(async (result)=>{
        
        if(result && result.id==1){
            status = 200;
            delete admin.nombre_usuario_admin;
            await adminModel.create(admin);
            return { msg:'admin creado' };
        }else{
            status = 404;
            return { msg:'admin no encontrado' };
        }
    
    });

    return { adminCreado, status };

}

async function eliminarAdmin(admin_a_eliminar, admin){

    let status, superAdminEncontrado, adminEncontrado, adminEliminado;

    superAdminEncontrado = await adminModel.findOne({ where: {nombre_usuario:admin.nombre_usuario_admin} }).then(async (admin)=>{

        if(admin){
            return admin;
        }else{
            return null;
        }

    });

    if(superAdminEncontrado){
        adminEncontrado = await adminModel.findOne({ where: {id:admin_a_eliminar.id} });
    }else{
        status = 404;
        adminEliminado = {msg: 'super admin no encontrado'};
        return { adminEliminado, status };
    }

    if(adminEncontrado){
        status = 200;
        await adminModel.destroy({where: {id:admin_a_eliminar.id}}); 
        adminEliminado = {msg: 'admin eliminado'};
        return { adminEliminado, status };
    }else{
        status = 404;
        adminEliminado = {msg: 'admin no encontrado'};
        return { adminEliminado, status };
    }

}

async function actualizarAdmin(admin, nuevo_admin){

    let status, superAdminEncontrado, adminEncontrado, adminModificado;

    superAdminEncontrado = await adminModel.findOne({ where: {nombre_usuario:nuevo_admin.nombre_usuario_admin} }).then(async (admin)=>{

        if(admin){
            return admin;
        }else{
            return null;
        }

    });

    if(superAdminEncontrado){
        adminEncontrado = await adminModel.findOne({ where: {id:admin.id} });
    }else{
        status = 404;
        adminModificado = {msg: 'super admin no encontrado'};
        return { adminModificado, status };
    }

    if(adminEncontrado){
        status = 200;
        delete nuevo_admin.nombre_usuario_admin;
        await adminModel.update(nuevo_admin, {where: {id:admin.id}}); 
        adminModificado = {msg: 'admin actualizado'};
        return { adminModificado, status };
    }else{
        status = 404;
        adminModificado = {msg: 'admin no encontrado'};
        return { adminModificado, status };
    }

}

async function obtenerAdminTodos(){

    const adminsEncontrados = await adminModel.findAll({
        attributes: [
            'id',
            'nombre_usuario',
            'apellido_paterno',
            'apellido_materno',
            'nombre',
        ]
    });

    return { adminsEncontrados, status:200 };

}

async function obtenerAdmins(admin){

    let status;

    const adminsEncontrados = await adminModel.findAll({
        where: admin,
        attributes: [
            'id',
            'nombre_usuario',
            'apellido_paterno',
            'apellido_materno',
            'nombre',
        ] 
    }).then(async (result)=>{
        
        if(result.length!=0){
            status = 201;
            return result;
        }else{
            status = 404;
            return { msg:'admins no encontrados' };
        }

    });

    return { adminsEncontrados, status };

} 

module.exports = {
    crearAdmin,
    eliminarAdmin,
    actualizarAdmin,
    obtenerAdminTodos,
    obtenerAdmins,
}