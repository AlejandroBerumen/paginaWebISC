'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Imagenes_galeria extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Imagenes_galeria.belongsTo(models.Contenido, {
        foreignKey: 'id_contenido',
      });
    }
  }
  Imagenes_galeria.init({
    nombre: DataTypes.STRING(100),
    descripcion: DataTypes.STRING,
    direccion: DataTypes.STRING,
    id_contenido: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Imagenes_galeria',
    tableName: 'imagenes_galeria'
  });
  return Imagenes_galeria;
};