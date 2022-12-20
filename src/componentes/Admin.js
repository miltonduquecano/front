import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import crud from "../conexiones/crud";
import Header from "./Header";
import Sidebar from "./Sidebar";
import swal from 'sweetalert';


const Admin = () => {

  const navigate = useNavigate();

  useEffect(() => {
    const autenticarUsuario = async () => {
      const token = localStorage.getItem('token')
      //console.log(token)
      if (!token) {
        navigate("/login");
      }

    }
    autenticarUsuario()
  }, [navigate]);//[] parentesis vacios se ejecuta solo una vez 

  const [categorias, setCategorias] = useState([]);

  const cargarCategorias = async () => {
    const response = await crud.GET(`/api/categorias`);
    console.log(response);
    setCategorias(response.categoria);

  }

  useEffect(() => {
    cargarCategorias();
  }, []);


  const borrarCategoria = async (e, idCategoria) => {
    swal({
      title: "Esta seguro de eliminar la categoria",
      text: "Una vez eliminado, no podra recuperar esta categoria",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
      .then((willDelete) => {
        if (willDelete) {
          e.preventDefault();
          const response = crud.DELETE(`/api/categorias/${idCategoria}`);
          //console.log(response.msg);
          const mensaje = response.msg;
          if (response) {
            swal("La categoria a sido eliminada correctamente", {
              icon: "success",
            });
          }
          cargarCategorias();
        } else {
          swal("Accion cancelada");
        }
      });

  }


  const actualizarCategoria = async (idCategoria) => {

    navigate(`/actualizar-categoria/${idCategoria}`)

  }

  const crearProductos = async (idCategoria) =>{
    navigate(`/home-productos/${idCategoria}`);
  }

  return (
    <>
      <Header />
      <div className="md:flex md:min-h-screen">
        <Sidebar />
        <main className="flex-1">
          <h1 className="inline  bg-gradient-to-r from-amber-300 via-green-300 to-cyan-500 bg-clip-text font-display text-5xl tracking-tight text-transparent">Listado de categorias</h1>

          <div>
            <table>
              <thead className="bg-white">
                <tr>
                  <th>Imagen</th>
                  <th>Nombre</th>
                  <th>ID</th>
                  <th>Opciones</th>
                </tr>
              </thead>
              <tbody className="bg-withe">
                {
                  categorias.map(
                    item =>
                      <tr key={item._id}>
                        <td><img src={item.imagen} widht="500" height="500"></img></td>
                        <td>{item.nombre}</td>
                        <td>{item._id}</td>
                        <td>
                          <input
                            type='submit'
                            value="Eliminar"
                            className=" my-5 bg-violet-400 mb-5 w-full py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-indigo-400 transition-colors"
                            onClick={(e) => borrarCategoria(e, item._id)}

                          >
                          </input>

                          <input
                            type='submit'
                            value="Actualizar"
                            className=" my-5 bg-violet-400 mb-5 w-full py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-indigo-400 transition-colors"
                            onClick={(e) => actualizarCategoria(item._id)}
                          >
                          </input>

                        

                          <input
                            type='submit'
                            value="Crear producto"
                            className=" my-5 bg-violet-400 mb-5 w-full py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-indigo-400 transition-colors"
                            onClick={(e) => crearProductos(item._id)}

                          >
                          </input>
                        </td>
                      </tr>
                  )
                }
              </tbody>

            </table>
          </div>
        </main>
      </div>

    </>

  );
}

export default Admin;