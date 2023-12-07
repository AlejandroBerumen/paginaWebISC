'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Usuario extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Usuario.init({
    nombre_usuario: DataTypes.STRING(20),
    apellido_paterno: DataTypes.STRING(20),
    apellido_materno: DataTypes.STRING(20),
    nombre: DataTypes.STRING(20),
    contrasena: DataTypes.STRING(20)
  }, {
    sequelize,
    modelName: 'Usuario',
    tableName: 'usuarios'
  });
  return Usuario;
};