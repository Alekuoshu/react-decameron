import { useContext } from "react";
import { UserContext } from "../context/UserProvider";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth"
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

/**
 * CardHotel
 * 
 * Muestra la informacion de un hotel
 * 
 * @param {Object} hotel - Informacion del hotel
 * @param {number} hotel.id - Id del hotel
 * @param {string} hotel.nombre - Nombre del hotel
 * @param {string} hotel.direccion - Direccion del hotel
 * @param {string} hotel.ciudad - Ciudad del hotel
 * @param {string} hotel.nit - Nit del hotel
 * @param {number} hotel.numero_hab - Numero de habitaciones del hotel
 * 
 * @returns {ReactElement} Un JSX element que muestra la informacion del hotel
 */
export default function CardHotel({ hotel }) {

    const { id, nombre, direccion, ciudad, nit, numero_hab } = hotel
    const { setHotelName } = useContext(UserContext);
    const navigate = useNavigate();

    const MySwal = withReactContent(Swal)

    const { eliminarHotel } = useAuth();

    /**
     * Muestra un mensaje de confirmacion para eliminar un hotel.
     * Si se confirma la eliminacion, se elimina el hotel y se redirige a la ruta principal.
     * 
     * @param {number} id - id del hotel a eliminar
     */
    const handleEliminar = (id) => {
        MySwal.fire({
            title: "¿Desea eliminar el hotel?",
            text: "¡No podrás revertir esto!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#0C4DA2",
            cancelButtonColor: "#bd0000",
            confirmButtonText: "Si, ¡Eliminar!"
          }).then((result) => {
            if (result.isConfirmed) {
                eliminarHotel(id);
                navigate("/");
              Swal.fire({
                title: "¡Eliminado!",
                text: "El hotel ha sido eliminado",
                confirmButtonColor: "#0C4DA2",
                icon: "success"
              });
            }
          });
    }

    /**
     * Redirige al usuario a la ruta para editar el hotel con el id especificado.
     * 
     * @param {number} id - id del hotel a editar
     */
    const handleActualizar = () => {
        navigate(`/hotel/${id}`);
    }

    /**
     * Guarda el nombre del hotel en el estado y redirige al usuario a la ruta de habitaciones del hotel.
     * 
     * @param {string} nombre - nombre del hotel
     * @param {number} id - id del hotel
     */
    const handleHabitaciones = () => {
        setHotelName(nombre);
        navigate(`/habitaciones/${id}`);
    }

  return (
        <div className="bg-white transition ease-in-out duration-500 shadow-md hover:shadow-2xl rounded-lg p-5 relative">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#1e3a8a" className="size-12 m-auto">
                <path fillRule="evenodd" d="M3 2.25a.75.75 0 0 0 0 1.5v16.5h-.75a.75.75 0 0 0 0 1.5H15v-18a.75.75 0 0 0 0-1.5H3ZM6.75 19.5v-2.25a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75v2.25a.75.75 0 0 1-.75.75h-3a.75.75 0 0 1-.75-.75ZM6 6.75A.75.75 0 0 1 6.75 6h.75a.75.75 0 0 1 0 1.5h-.75A.75.75 0 0 1 6 6.75ZM6.75 9a.75.75 0 0 0 0 1.5h.75a.75.75 0 0 0 0-1.5h-.75ZM6 12.75a.75.75 0 0 1 .75-.75h.75a.75.75 0 0 1 0 1.5h-.75a.75.75 0 0 1-.75-.75ZM10.5 6a.75.75 0 0 0 0 1.5h.75a.75.75 0 0 0 0-1.5h-.75Zm-.75 3.75A.75.75 0 0 1 10.5 9h.75a.75.75 0 0 1 0 1.5h-.75a.75.75 0 0 1-.75-.75ZM10.5 12a.75.75 0 0 0 0 1.5h.75a.75.75 0 0 0 0-1.5h-.75ZM16.5 6.75v15h5.25a.75.75 0 0 0 0-1.5H21v-12a.75.75 0 0 0 0-1.5h-4.5Zm1.5 4.5a.75.75 0 0 1 .75-.75h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75h-.008a.75.75 0 0 1-.75-.75v-.008Zm.75 2.25a.75.75 0 0 0-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 0 0 .75-.75v-.008a.75.75 0 0 0-.75-.75h-.008ZM18 17.25a.75.75 0 0 1 .75-.75h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75h-.008a.75.75 0 0 1-.75-.75v-.008Z" clipRule="evenodd" />
            </svg>

            <h3 className="text-2xl font-bold text-center my-3 text-[#0C4DA2]">{nombre}</h3>
            <p className="text-center text-[#0C4DA2]">{direccion}</p>
            <p className="text-center text-[#0C4DA2]">{ciudad}</p>
            <p className="text-center text-[#0C4DA2] mb-6">NIT: {nit}</p>
            <small className="text-center absolute bottom-4 left-4 text-[#0C4DA2]">Capacidad: {numero_hab}</small>
            <div className="absolute top-4 right-4">
                <div className="flex items-center justify-between gap-3">

                    <div className="edit cursor-pointer" title="Ver habitaciones" onClick={handleHabitaciones}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#0C4DA2" className="size-7 transition ease-in-out hover:scale-125 duration-500">
                        <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                        <path fillRule="evenodd" d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 0 1 0-1.113ZM17.25 12a5.25 5.25 0 1 1-10.5 0 5.25 5.25 0 0 1 10.5 0Z" clipRule="evenodd" />
                        </svg>
                    </div>

                    <div className="edit cursor-pointer" title="editar" onClick={handleActualizar}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#038018" className="size-7 transition ease-in-out hover:scale-125 duration-500">
                        <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32l8.4-8.4Z" />
                        <path d="M5.25 5.25a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3V13.5a.75.75 0 0 0-1.5 0v5.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V8.25a1.5 1.5 0 0 1 1.5-1.5h5.25a.75.75 0 0 0 0-1.5H5.25Z" />
                        </svg>
                    </div>

                    <div 
                        className="delete cursor-pointer" 
                        title="eliminar"
                        onClick={() => handleEliminar(id)}
                        >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#bd0000" className="size-7 transition ease-in-out hover:scale-125 duration-500">
                        <path fillRule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z" clipRule="evenodd" />
                        </svg>
                    </div>
                </div>
            </div>
        </div>
  )
}
