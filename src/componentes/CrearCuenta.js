import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import crud from '../conexiones/crud';

const CrearCuenta = () => {

  const navigate = useNavigate();

  const [usuario, setUsuario] = useState({
    nombre: "",
    email: "",
    password: "",
    confirmar: ""
  });

  const { nombre, email, password, confirmar } = usuario;

  const onChange = (e) => {
    setUsuario({
      ...usuario,
      [e.target.name]: e.target.value
    })
  };

  const crearCuenta = async () => {

    //todos los cambos debe ir diligenciados 

    if ((nombre).length === 0 || (email).length === 0 || (password).length === 0) {
      console.log('Ningun campo debe ir vacio');
      const mensaje = "Todo los campos son obligatorios";
      swal({
        title: 'Error',
        text: mensaje,
        icon: 'error',
        buttons: {
          confirm: {
            text: 'OK',
            value: true,
            visible: true,
            clasName: 'btn btn-danger',
            closeModal: true

          }
        }
      });
    }

    //los dos password deben coincidir
    else if (password !== confirmar) {
      console.log('diferentes');
      const mensaje = "Las contraseñas son diferentes";
      swal({
        title: 'Error',
        text: mensaje,
        icon: 'error',
        buttons: {
          confirm: {
            text: 'OK',
            value: true,
            visible: true,
            clasName: 'btn btn-danger',
            closeModal: true

          }
        }
      });
    } else {
      const data = {
        nombre: usuario.nombre,
        email: usuario.email,
        password: usuario.password
      }
      console.log(data);
      const response = await crud.POST(`/api/usuarios`, data);
      const mensaje = response.msg;
      //console.log(mensaje);
      //los tres iguales es una asignacion 
      if (mensaje === "El usuario ya existe") {
        const mensaje = "El usuario ya existe";
        swal({
          title: 'Error',
          text: mensaje,
          icon: 'error',
          buttons: {
            confirm: {
              text: 'OK',
              value: true,
              visible: true,
              clasName: 'btn btn-danger',
              closeModal: true

            }
          }
        });


      } else {
        const mensaje = "El usuario fue creado correctamente";
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

        //limpiar las cajas 

        setUsuario({
          nombre: '',
          email: '',
          password: '',
          confirmar: ''
        })
        //redireccionar a la pagina de login 
        navigate("/login");

      };


    }

  };

  const onSubmit = (e) => {
    e.preventDefault();
    crearCuenta();

  }

  return (
    <main className='container mx-auto mt-5 md:mt-20 p-5 md:flex md:justify-center'>
      <div className='md:w-2/3 lg:w-2/5'>
        <h2 className="inline bg-gradient-to-r from-indigo-200 via-violet-700 to-indigo-200 bg-clip-text font-display text-5xl tracking-tight text-transparent">Registro Nuevo Usuario</h2>

        <form
          className="my-10 bg-white shadow rounded-lg p-10"
          onSubmit={onSubmit}
        >

          <div className="my-5">
            <label className="uppercase text-gray-600 block text-lx font-bold">Nombre</label>
            <input
              type="nombre"
              id="nombre"
              name="nombre"
              placeholder="Ingrese nombre"
              className="w-full mt-3 p-3 border rounded-xl bg-gray-400"
              value={nombre}
              onChange={onChange}
            ></input>
            <label className="uppercase text-gray-600 block text-lx font-bold">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email de Registro"
              className="w-full mt-3 p-3 border rounded-xl bg-gray-400"
              value={email}
              onChange={onChange}
            ></input>
            <label className="uppercase text-gray-600 block text-lx font-bold">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Password de registro"
              className="w-full mt-3 p-3 border rounded-xl bg-gray-400"
              value={password}
              onChange={onChange}
            ></input>
            <label className="uppercase text-gray-600 block text-lx font-bold"> Confirmar password</label>
            <input
              type="password"
              id="confirmar"
              name="confirmar"
              placeholder="Confirmar Pasword"
              className="w-full mt-3 p-3 border rounded-xl bg-gray-400"
              value={confirmar}
              onChange={onChange}
            ></input>
            <input
              type="submit"
              value="Registrar Usuario"
              className="my-5 bg-violet-600 mb-5 w-full py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-indigo-400 transition-colors"
            />
            <Link
              className="block text-center my-5"
              to={"/"}
            >Regresar
            </Link>


          </div>
        </form>
      </div>
    </main>

    /*<div>
     <h1>Crear cuenta </h1>
     <h2>Ingrese los datos del usuario</h2>

     <input placeholder='Nombre'></input>
     <input placeholder='Email'></input>
     <input placeholder='Password'></input>
     <input placeholder='Confirmar'></input>
    
     <button>Crear cuenta</button>
     <Link to={"/"}>Regresar</Link>
   </div>*/

  )
}

export default CrearCuenta;