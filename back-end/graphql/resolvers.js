const models = require("../models");


// membuat resolvers
const resolvers = {
  //query untuk membaca data dari database
  Query: {
    //query mahasiswa untuk menampilkan daftar mahasiswa
    mahasiswas: async () => {
      const mahasiswas = await models.Mahasiswa.findAll({});
      return mahasiswas;
    },
  },
  //mutation untuk melakukan inputan maupun perubahan untuk database
  Mutation: {
    //mutation untuk membuat data mahasiswa baru
    //terdapat 4 argument nama,angkatan,id
    insertMahasiswa: async (parent, args) => {
      const mahasiswa = await models.Mahasiswa.create({
        nama: args.inputMahasiswa.nama,
        angkatan: args.inputMahasiswa.angkatan,
        id: args.inputMahasiswa.id,
      });
      return mahasiswa;
    },

    //mutation untuk update data mahasiswa sesuai id
    //terdapat 2 argument nama dan angkatan
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
    //mutation untuk menghapus data mahasiswa sesuai id
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
