'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Documento extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Documento.belongsTo(models.Proyecto, {
        foreignKey: 'id_proyecto',
        onDelete: 'CASCADE',
      });
    }
  }
  Documento.init({
    nombre: DataTypes.STRING(100),
    direccion: DataTypes.STRING(30),
    id_proyecto: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Documento',
    tableName: 'documentos',
  });
  return Documento;
};