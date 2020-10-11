const {gql} = require("apollo-server-express");


const typeDefs = gql`
    type Query {
        hello: String!
        mahasiswas: [Mahasiswa!]
    }

    type Mahasiswa {
        nama: String!,
        angkatan: Int!,
        id: ID!
    }

    input InputMahasiswa{
        nama: String!,
        angkatan: Int!,
        id: ID!
    }

    input UpdateMahasiswaInput{
        id: ID!,
        nama: String!,
        angkatan: Int
    }

    input DeleteMahasiswaInput{
        id: ID!
    }

    type Mutation {
        insertMahasiswa(inputMahasiswa: InputMahasiswa): Mahasiswa
        updateMahasiswa(updateMahasiswaInput: UpdateMahasiswaInput): Boolean
        deleteMahasiswa(deleteMahasiswaInput: DeleteMahasiswaInput): Boolean
    }
`;

module.exports = typeDefs;