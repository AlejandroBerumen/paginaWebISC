'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Solicitud extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Solicitud.init({
    numero_telefono: DataTypes.STRING(20),
    correo: DataTypes.STRING(50),
    nombre: DataTypes.STRING(20),
    contenido: DataTypes.TEXT('medium'),
    id_contenido: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Solicitud',
    tableName: 'solicitudes'
  });
  return Solicitud;
};