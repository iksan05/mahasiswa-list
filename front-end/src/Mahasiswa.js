import React, { Fragment, useState } from "react";
import { gql, useQuery, useMutation } from "@apollo/client";
import {
  Container,
  Table,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
} from "reactstrap";

const GET_MAHASISWAS = gql`
  query GetMahasiswas {
    mahasiswas {
      nama
      angkatan
      id
    }
  }
`;

const INSERT_MAHASISWA = gql`
  mutation InsertMahasiswa($nama: String!, $angkatan: Int!, $nim: ID!) {
    insertMahasiswa(
      inputMahasiswa: { nama: $nama, angkatan: $angkatan, id: $nim }
    ) {
      id
      nama
      angkatan
    }
  }
`;

const UPDATE_MAHASISWA = gql`
  mutation UpdateMahasiswa($nim: ID!, $nama: String!, $angkatan: Int) {
    updateMahasiswa(
      updateMahasiswaInput: { id: $nim, nama: $nama, angkatan: $angkatan }
    )
  }
`;

const DELETE_MAHASISWA = gql`
  mutation DeleteMahasiswa($id: ID!) {
    deleteMahasiswa(deleteMahasiswaInput: { id: $id })
  }
`;

function Mahasiswa() {
  const [nim, setNim] = useState("");
  const [nama, setNama] = useState("");
  const [angkatan, setAngkatan] = useState("");

  const { loading, error, data } = useQuery(GET_MAHASISWAS);
  const [deleteMahasiswa] = useMutation(DELETE_MAHASISWA, {
    refetchQueries: [{ query: GET_MAHASISWAS }],
  });
  const [insertMahasiswa] = useMutation(INSERT_MAHASISWA, {
    refetchQueries: [{ query: GET_MAHASISWAS }],
  });
  const [updateMahasiswa] = useMutation(UPDATE_MAHASISWA, {
    refetchQueries: [{ query: GET_MAHASISWAS }],
  });

  if (loading) return <h1>Loading....</h1>;
  if (error) return <h1>Error : {error.message}</h1>;
  return (
    <Fragment>
      <Container>
        <Form
          inline
          onSubmit={async (e) => {
            try {
              e.preventDefault();
              await insertMahasiswa({
                variables: {
                  nama: nama,
                  nim: nim,
                  angkatan: +angkatan,
                },
              });
              setNim("");
              setNama("");
              setAngkatan("");
            } catch (error) {
              alert(`Error ${error.message}`);
            }
          }}
        >
          <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
            <Label for="nim" className="mr-sm-2">
              Nim
            </Label>
            <Input
              id="nim"
              name="nim"
              value={nim}
              type="number"
              onChange={(e) => {
                setNim(e.target.value);
                console.log(e.target.value);
              }}
            />
          </FormGroup>
          <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
            <Label for="nama" className="mr-sm-2">
              Nama
            </Label>
            <Input
              id="nama"
              name="nama"
              value={nama}
              type="text"
              onChange={(e) => {
                setNama(e.target.value);
                console.log(e.target.value);
              }}
            />
          </FormGroup>
          <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
            <Label for="angkatan" className="mr-sm-2">
              Angkatan
            </Label>
            <Input
              id="angkatan"
              name="angkatan"
              value={angkatan}
              type="number"
              onChange={(e) => {
                setAngkatan(e.target.value);
                console.log(e.target.value);
              }}
            />
          </FormGroup>
          <Button color="success">Submit</Button>
          <Button
            color="primary"
            onClick={async (e) => {
              try {
                const {
                  data,
                } = await updateMahasiswa({
                  variables: {
                    nim: nim,
                    nama: nama,
                    angkatan: +angkatan,
                  },
                });
                setNim("");
                setNama("");
                setAngkatan("");
                if(!data.updateMahasiswa){
                    alert("Update Gagal, cek NIM");
                }
              } catch (error) {
                console.log(error.message);
              }
            }}
          >
            Update
          </Button>
        </Form>

        <Table>
          <thead>
            <tr>
              <th>#</th>
              <th>NIM</th>
              <th>Nama</th>
              <th>Angkatan</th>
            </tr>
          </thead>
          <tbody>
            {data.mahasiswas.map((mahasiswa, index) => (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>{mahasiswa.id}</td>
                <td>{mahasiswa.nama}</td>
                <td>{mahasiswa.angkatan}</td>
                <Button
                  color="danger"
                  onClick={() => {
                    deleteMahasiswa({
                      variables: {
                        id: mahasiswa.id,
                      },
                    });
                  }}
                >
                  Hapus
                </Button>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </Fragment>
  );
}

export default Mahasiswa;
