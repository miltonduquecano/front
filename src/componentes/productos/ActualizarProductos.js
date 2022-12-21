import React, { useEffect, useState } from "react";
import Header from "../Header";
import Sidebar from "../Sidebar";
import { useNavigate, useParams } from 'react-router-dom';
import crud from '../../conexiones/crud';
import swal from 'sweetalert';



const ActualizarProductos = () => {

  const navigate = useNavigate();

  const { idProducto, idCategoria} = useParams();
  //console.log(idProducto);

  //const [productos, setProductos] = useState([]);

  const [producto,setProducto] = useState({
    nombre: '',
    descripcion: '',
    stock: '',
    precio: '',
    imagen: '',
    categoriaId: '',

  });

  /*const cargarProducto = async () => {
    const response = await crud.GET(`/api/productos/${idProducto}`);
    console.log(response);
    setProducto(response.producto);
  }
  useEffect(() => {
    cargarProducto();
  }, []);*/



  const { nombre, descripcion, stock, precio, imagen } = producto;

  const onChange = (e) => {
    setProducto({
      ...producto,
      [e.target.name]: e.target.value

    })
  };

  const actualizarProductos = async () => {
    const data = {
      nombre: producto.nombre,
      descripcion: producto.descripcion,
      stock: producto.stock,
      precio: producto.precio,
      imagen: producto.imagen,
      categoriaId: idCategoria
      
    }
    const response = await crud.PUT(`/api/productos/${idProducto}`, data);
    const mensaje = "El producto se actualizo correctamente";
    swal({
      title: 'Informacion',
      text: mensaje,
      icon: 'success',
      buttons: {
        confirm: {
          text: 'OK',
          value: true,
          visible: true,
          clasName: 'btn btn-primary',
          closeModal: true

        }
      }
    });
    //redireccionar a la pagina de admin 
    navigate(`/home-productos/${idCategoria}`);

  };
  const onSubmit = (e) => {
    e.preventDefault();
    actualizarProductos();

  }


  return (

    <>
      <Header />
      <div className="md:flex md:min-h-screen">
        <Sidebar />
        <main className="flex-1">
          <div className="mt-5 flex justify-center">
            <h1 className="inline  bg-gradient-to-r from-amber-300 via-green-300 to-cyan-500 bg-clip-text font-display text-5xl tracking-tight text-transparent">Actualizar productos</h1>
          </div>

          <div className="mt-10 flex justify-center">
            <form
              onSubmit={onSubmit}
              className="my-10 bg-white shadow rounded-lg p-10"
            >
              <div className="my-5">
                <label className="uppercase text-gray-600 block text-lx font-bold">Nombre</label>
                <input
                  type="text"
                  id="nombre"
                  name="nombre"
                  placeholder="nombre "
                  className="w-full mt-3 p-3 border rounded-xl bg-gray-400"
                  value={nombre}
                  onChange={onChange}
                ></input>

                <label className="uppercase text-gray-600 block text-lx font-bold">Descripcion</label>
                <input
                  type="text"
                  id="descripcion"
                  name="descripcion"
                  placeholder="descripcion "
                  className="w-full mt-3 p-3 border rounded-xl bg-gray-400"
                  value={descripcion}
                  onChange={onChange}
                ></input>

                <label className="uppercase text-gray-600 block text-lx font-bold">Stock</label>
                <input
                  type="number"
                  id="stock"
                  name="stock"
                  placeholder="stock "
                  className="w-full mt-3 p-3 border rounded-xl bg-gray-400"
                  value={stock}
                  onChange={onChange}
                ></input>

                <label className="uppercase text-gray-600 block text-lx font-bold">Precio</label>
                <input
                  type="number"
                  id="precio"
                  name="precio"
                  placeholder="precio"
                  className="w-full mt-3 p-3 border rounded-xl bg-gray-400"
                  value={precio}
                  onChange={onChange}
                ></input>

                <label className="uppercase text-gray-600 block text-lx font-bold">Imagen</label>
                <input
                  type="text"
                  id="imagen"
                  name="imagen"
                  placeholder="Imagen"
                  className="w-full mt-3 p-3 border rounded-xl bg-gray-400"
                  value={imagen}
                  onChange={onChange}
                ></input>

                <input
                  type="submit"
                  value="Actualizar Producto"
                  className=" my-5 bg-teal-400 mb-5 w-full py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-indigo-400 transition-colors"
                />


              </div>
            </form>

          </div>
        </main>
      </div>


    </>


  );

}

export default ActualizarProductos;