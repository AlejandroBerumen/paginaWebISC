const joi = require('joi');


const contentSchema = joi.number();

const actualizarAdminSchema = {
    id: contentSchema, 
}

module.exports = {
    actualizarAdminSchema,
}