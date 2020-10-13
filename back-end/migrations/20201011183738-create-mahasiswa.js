'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    // migrasi tabel mahasiswa ke database
    await queryInterface.createTable('Mahasiswas', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nama: {
        type: Sequelize.STRING
      },
      angkatan: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Mahasiswas');
  }
};