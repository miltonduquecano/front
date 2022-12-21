import React  from "react";
import { useNavigate} from 'react-router-dom';

const Header = () => {

    const navigate = useNavigate();

    const cerrarSesion = () =>{
        localStorage.removeItem("token");
        navigate("/");
    
      }

    return (
        <header className="px-4 py-5 bg-blue-800 border-b">
            <div className="md:flex md:justify-between">
            <h2 className="text-4xl text-neutral--900 hover:text-sky-400 font-black text-center mb-5 md:mb-0">
                Panel de administrador 
            </h2>

            <div className="flex flex-col md:flex-row items-center gap-4">
            <input
                type='submit'
                value="Cerrar sesion"
                className=" my-5 bg-teal-400 mb-5 w-full py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-indigo-400 transition-colors"
                onClick={cerrarSesion}
            >
            </input>
            </div>

            </div>

        </header>


    );
}

export default Header;