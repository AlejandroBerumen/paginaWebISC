'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Publicacion extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Publicacion.belongsTo(models.Contenido, {
        foreignKey: 'id_contenido',
      });
      
    }
  }
  Publicacion.init({
    titulo: DataTypes.STRING(100),
    cuerpo: DataTypes.TEXT('medium'),
    id_contenido: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Publicacion',
    tableName: 'publicaciones'
  });
  return Publicacion;
};