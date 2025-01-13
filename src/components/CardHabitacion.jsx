import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth"
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

/**
 * CardHabitacion
 * 
 * Muestra informacion de una habitación, además de dos botones para eliminar y editar
 * 
 * @param {Object} habitacion - objeto con información de la habitación
 * @param {number} habitacion.id - id de la habitación
 * @param {number} habitacion.hotel_id - id del hotel al que pertenece la habitación
 * @param {string} habitacion.tipo_habitacion - tipo de habitación
 * @param {string} habitacion.acomodacion - acomodación de la habitación
 * @param {number} habitacion.cantidad - cantidad de habitaciones
 * 
 * @returns {ReactElement} un JSX element que muestra la información de la habitación y los botones para eliminar y editar
 */
export default function CardHabitacion({ habitacion }) {

    const { id, hotel_id, tipo_habitacion, acomodacion, cantidad } = habitacion
    const navigate = useNavigate();

    const MySwal = withReactContent(Swal)

    const { eliminarHabitacion } = useAuth();

    /**
     * Elimina una habitación, previamente mostrando un mensaje de confirmación.
     * Si se confirma la eliminación, se eliminara la habitación y se redirigira a la ruta de habitaciones del hotel.
     * 
     * @param {number} id - id de la habitación a eliminar
     */
    const handleEliminar = (id) => {
        MySwal.fire({
            title: "¿Desea eliminar la habitación?",
            text: "¡No podrás revertir esto!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#0C4DA2",
            cancelButtonColor: "#bd0000",
            confirmButtonText: "Si, ¡Eliminar!"
          }).then((result) => {
            if (result.isConfirmed) {
                eliminarHabitacion(id, hotel_id);
                navigate(`/habitaciones/${hotel_id}`);
              Swal.fire({
                title: "¡Eliminado!",
                text: "La habitación ha sido eliminada",
                confirmButtonColor: "#0C4DA2",
                icon: "success"
              });
            }
          });
    }

    /**
     * Redirige al usuario a la ruta para editar la habitación con el id y hotel_id provistos.
     * 
     * @param {number} id - id de la habitación a editar
     * @param {number} hotel_id - id del hotel al que pertenece la habitación a editar
     */
    const handleActualizar = () => {
        navigate(`/habitaciones/${hotel_id}/editar/${id}`);
    }

  return (
        <div className="bg-white transition ease-in-out duration-500 shadow-md hover:shadow-2xl rounded-lg p-5 relative">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#1e3a8a" className="size-12 m-auto">
                <path d="M11.47 3.841a.75.75 0 0 1 1.06 0l8.69 8.69a.75.75 0 1 0 1.06-1.061l-8.689-8.69a2.25 2.25 0 0 0-3.182 0l-8.69 8.69a.75.75 0 1 0 1.061 1.06l8.69-8.689Z" />
                <path d="m12 5.432 8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 0 1-.75-.75v-4.5a.75.75 0 0 0-.75-.75h-3a.75.75 0 0 0-.75.75V21a.75.75 0 0 1-.75.75H5.625a1.875 1.875 0 0 1-1.875-1.875v-6.198a2.29 2.29 0 0 0 .091-.086L12 5.432Z" />
            </svg>

            <h3 className="text-2xl font-bold text-center my-3 text-[#0C4DA2]">Habitación: {tipo_habitacion}</h3>
            <p className="text-center text-[#0C4DA2]">{acomodacion}</p>
            <p className="text-center text-[#0C4DA2]">Cantidad: {cantidad}</p>
            <div className="absolute top-4 right-4">
                <div className="flex items-center justify-between gap-3">

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
