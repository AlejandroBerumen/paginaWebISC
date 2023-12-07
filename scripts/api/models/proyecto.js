'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Proyecto extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Proyecto.belongsTo(models.Contenido, {
        foreignKey: 'id_contenido',
      });
    }
  }
  Proyecto.init({
    nombre: DataTypes.STRING(100),
    tipo: DataTypes.STRING(20),
    descripcion: DataTypes.STRING,
    periodo: DataTypes.STRING(30),
    id_contenido: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Proyecto',
    tableName: 'proyectos'
  });
  return Proyecto;
};