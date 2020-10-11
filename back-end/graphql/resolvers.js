const { gql } = require("apollo-server-express");
const models = require("../models");

const resolvers = {
  Query: {
    hello: () => "Hellow",
    mahasiswas: async () => {
      const mahasiswas = await models.Mahasiswa.findAll({});
      return mahasiswas;
    },
  },
  Mutation: {
    insertMahasiswa: async (parent, args) => {
      const mahasiswa = await models.Mahasiswa.create({
        nama: args.inputMahasiswa.nama,
        angkatan: args.inputMahasiswa.angkatan,
        id: args.inputMahasiswa.id,
      });
      return mahasiswa;
    },
    updateMahasiswa: async (parent, args) => {
      const mahasiswa = await models.Mahasiswa.update(
        {
          nama: args.updateMahasiswaInput.nama,
          angkatan: args.updateMahasiswaInput.angkatan,
        },
        {
          where: { id: args.updateMahasiswaInput.id },
        }
      );
      if (mahasiswa[0] === 1) {
        return true;
      } else {
        return false;
      }
    },
    deleteMahasiswa: async (parent, args) => {
      const mahasiswa = await models.Mahasiswa.destroy({
        where: {
          id: args.deleteMahasiswaInput.id,
        },
      });
      if(mahasiswa === 1){
          return true
      }else{
          return false;
      }
    },
  },
};

module.exports = resolvers;
