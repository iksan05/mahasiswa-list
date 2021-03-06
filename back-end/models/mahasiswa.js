'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  // model Mahasiswa untuk database tabel mahasiswa
  class Mahasiswa extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Mahasiswa.init({
    nama: DataTypes.STRING,
    angkatan: DataTypes.NUMBER
  }, {
    sequelize,
    modelName: 'Mahasiswa',
  });
  return Mahasiswa;
};