'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('solicitudes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      numero_telefono: {
        type: Sequelize.STRING(20)
      },
      correo: {
        type: Sequelize.STRING(50)
      },
      nombre: {
        type: Sequelize.STRING(20)
      },
      contenido: {
        type: Sequelize.TEXT('medium')
      },
      id_contenido: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATEONLY
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATEONLY
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('solicitudes');
  }
};