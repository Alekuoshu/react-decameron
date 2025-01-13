import { useContext } from "react";
import { UserContext } from "../context/UserProvider";
import { Link } from "react-router-dom"
import { useAuth } from "../hooks/useAuth"

/**
 * Componente que renderiza el header de la aplicación, 
 * incluyendo el logo, título y botones para agregar un nuevo hotel 
 * y salir de la sesión.
 * 
 * También muestra un saludo personalizado con el nombre del usuario autenticado.
 * 
 * @returns {JSX.Element} El JSX del header de la aplicación.
 */
function Header() {

    const { user } = useContext(UserContext);
    const { logout } = useAuth();

    
    /**
     * Función que se encarga de cerrar la sesión del usuario autenticado.
     * 
     * Utiliza el hook `useAuth` para obtener la función `logout` y 
     * cerrar la sesión.
     */
    const handleLogout = async () => {
        await logout();
    }

  return (
    <header className="w-full bg-white px-12 py-5">
        <div className="w-11/12 mx-auto grid gap-6 grid-cols-1 sm:grid-cols-3">
            
            <Link to={"/"}>
                <img src="/img/decameron.png" alt="Imagen Logo" className="md:w-2/3 xl:w-1/2" />
            </Link>
            
            <h1 className="text-2xl md:text-3xl xl:text-4xl font-bold uppercase text-center flex items-center justify-center text-[#0C4DA2]">Hoteles Decameron</h1>
            
            <div className="buttons flex items-center justify-center sm:justify-end gap-5">
                <div className="flex items-center">
                    Hola, {user}
                </div>
                <Link to={"agregar-hotel"}>
                    <div className="add cursor-pointer" title="Agregar nuevo hotel">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#038018" className="size-10 transition ease-in-out hover:scale-125 duration-500">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>
                    </div>
                </Link>

                <div 
                    className="logout cursor-pointer" 
                    title="Salir"
                    onClick={handleLogout}
                    >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#bd0000" className="size-10 transition ease-in-out hover:scale-125 duration-500">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15" />
                    </svg>
                </div>
            </div>
        </div>
    </header>
  )
}

export default Header