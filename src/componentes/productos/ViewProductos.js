import React from 'react';
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import crud from "../../conexiones/crud";

export const ViewProductos = ({ producto }) => {

    const navigate = useNavigate();


    const { nombre, descripcion, stock, precio, imagen } = producto;

    const actualizarProductos = async (e, idProducto) => {

        navigate(`/actualizar-producto/${idProducto}`)

    }

    const eliminarProducto = async (e, idProducto) => {
        swal({
            title: "Esta seguro de eliminar el producto",
            text: "Una vez eliminado no podra ser recuperado",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    e.preventDefault();
                    const response = crud.DELETE(`/api/productos/${idProducto}`);
                    //console.log(response.msg);
                    const mensaje = response.msg;
                    if (response) {
                        swal("El producto  se elimino correctamente", {
                            icon: "success",
                        });
                    }
                    //cargarProductos();
                } else {
                    swal("Se ha cancelado la accion");
                }
            });
    
    }



    return (
        <div className='border-b p-5 flex justify-between items-center'>
            <div className='flex flex-col items-start'>
                <p className='mb-a text-x1 text-gray-500'>Nombre:{nombre}</p>
                <p className='mb-a text-sm text-gray-500'>Descripcion:{descripcion}</p>
                <p className='mb-a text-x1 text-gray-500'>Stock:{stock}</p>
                <p className='mb-a text-x1 text-gray-500'>Precio:{precio}</p>
                <img src={imagen} width="150" height="150"></img>

            </div>

            <div>
                <button className="bg-pink-400 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                 onClick={(e) => actualizarProductos(e, producto._id)}
                 >
                    Editar
                </button>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                onClick={(e) => eliminarProducto(e, producto._id)}>
                    Eliminar
                </button>


            </div>



        </div>
    )
};

export default ViewProductos;