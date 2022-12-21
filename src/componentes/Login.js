import React, {useState} from "react";
import {Link, useNavigate} from 'react-router-dom';
import swal from 'sweetalert';
import crud from '../conexiones/crud';

const Login = () => {

  const navigate = useNavigate();

  const [usuario, setUsuario]= useState({
    email:'',
    password:''

  });

  const { email, password} = usuario;

  const onChange =(e) => {
    setUsuario({
      ...usuario,
      [e.target.name]:e.target.value
    })
  };

  const ingresarCuenta = async() => {

    const data ={
      email:usuario.email,
      password:usuario.password
    }
    console.log(data);
    const response = await crud.POST(`/api/auth`,data);
    const mensaje = response.msg;
    console.log(mensaje);
    if(mensaje === "el usuario no existe"){
      const mensaje = "el usuario no existe";
      swal({
        title:'Error',
        text: mensaje,
        icon:'error',
        buttons:{
          confirm:{
            text:'OK',
            value:true,
            visible:true,
            clasName:'btn btn-danger',
            closeModal: true

          }
        }
      });

    }else if(mensaje === "contraseña incorrecta"){
      const mensaje = "password incorrecto";
      swal({
        title:'Error',
        text: mensaje,
        icon:'error',
        buttons:{
          confirm:{
            text:'OK',
            value:true,
            visible:true,
            clasName:'btn btn-danger',
            closeModal: true

          }
        }
      });

    }else{
      const jwt =response.token;

      //guardar la informacion el el localStorage
      localStorage.setItem('token',jwt);

      // redireccionar a otra pagina 
      navigate("/admin");
    }
    
};

const onSubmit =(e)=>{
  e.preventDefault();
  ingresarCuenta();

}

return (
      <main className='container mx-auto mt-5 md:mt-20 p-5 md:flex md:justify-center'>
      <div className='md:w-2/3 lg:w-2/5'>
      <h1 className="inline  bg-gradient-to-r from-amber-300 via-green-300 to-cyan-500 bg-clip-text font-display text-5xl tracking-tight text-transparent">Inicio de Sesion</h1>

<form 
  className="my-10 bg-white shadow rounded-lg p-10"
  onSubmit = {onSubmit}
>
        <div className="my-5">
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
          <input 
          type="submit"
          value="Iniciar Sesión"
          className=" my-5 bg-teal-400 mb-5 w-full py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-indigo-400 transition-colors"
          />
<Link
className="block text-center my-5"
to={"/crear-cuenta"}
>Crear Cuenta
</Link>

        </div>
      </form>
      </div>
      </main>
     
      /*
     <div>
      <h1>Bienvenidos al Grupo Doce</h1>
      <h1>Iniciar Sesion</h1>
      <h2>Ingrese sus credenciales</h2>
      <input placeholder='Email'></input>
      <button>Ingresar</button>
      <input placeholder='Password'></input>
      <Link to={"/crear-cuenta"}>Crear Cuenta</Link>
    </div>*/

    )
}


export default Login;