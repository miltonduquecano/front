import React from 'react'

export const ViewProductos = ({producto}) =>{

    
    const {nombre, descripcion, stock, precio, imagen} = producto

    
     
    return(
        <div className='border-b p-5 flex justify-between items-center'>
            <div className='flex flex-col items-start'>
                <p className='mb-a text-x1 text-gray-500'>Nombre:{nombre}</p>
                <p className='mb-a text-sm text-gray-500'>Descripcion:{descripcion}</p>
                <p className='mb-a text-x1 text-gray-500'>Stock:{stock}</p>
                <p className='mb-a text-x1 text-gray-500'>Precio:{precio}</p>
                <img src={imagen} width="150" height="150"></img>
                
            </div>

            <div>
            <button class="bg-pink-400 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
  Editar
</button>
<button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
Eliminar
</button>


            </div>

            
        
        </div>
    )
};

export default ViewProductos;