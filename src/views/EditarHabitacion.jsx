import { createRef, useState, useEffect, useContext } from "react"
import { Link, useParams, useNavigate } from "react-router-dom"
import { UserContext } from "../context/UserProvider"
import clienteAxios from "../config/axios"
import Select from "../components/Select"
import { useAuth } from "../hooks/useAuth"
import tipos_habitacion from "../data/tipos_habitacion"
import acomodaciones from "../data/acomodaciones"

  /**
   * Edita una habitacion.
   * 
   * Muestra un formulario con los datos actuales de la habitacion y permite al usuario editarlos.
   * 
   * @returns {ReactElement} un JSX element que muestra el formulario para editar habitacion
   */
export default function EditarHabitacion() {

  const [habitacion, setHabitacion] = useState([])
  const { hotelName } = useContext(UserContext);
  const navigate = useNavigate();
  const token = localStorage.getItem("AUTH_TOKEN");

  useEffect(() => {
    if(!token) {
      navigate("/auth/login");
    }
    obtenerHabitacion()
  }, [])
  
  const { editarHabitacion } = useAuth()

  const { id, idHabitacion } = useParams()
  // console.log('id', id);
  // console.log('idHabitacion', idHabitacion);

  /**
   * Consulta la API por la habitacion con el id proporcionado y se la asigna al estado local.
   * 
   * @async
   * @function
   */
  const obtenerHabitacion = async () => {
    try {
      const { data } = await clienteAxios(`/api/habitaciones/${idHabitacion}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      // console.log('data', data);
      setHabitacion(data.data)
    } catch (error) {
      console.log(error);
    }
  }

  const { tipo_habitacion, acomodacion, cantidad } = habitacion

  const tipoRef = createRef()
  const acomodacionRef = createRef()
  const cantidadRef = createRef()

  /**
   * Envia el formulario para editar una habitación.
   * 
   * @param {Event} e - Evento submit del formulario
   */
  const handleSubmit = async (e) => {
    e.preventDefault()

    const datos = {
      id: idHabitacion,
      hotel_id: id,
      tipo_habitacion: tipoRef.current.value,
      acomodacion: acomodacionRef.current.value,
      cantidad: parseInt(cantidadRef.current.value)
    }

    // console.log('datos', datos);

    editarHabitacion(datos)
  }

  return (
    <>
        <h2 className="text-3xl font-black text-center mt-3">Editar Habitación: {hotelName}</h2>
        
        <div className="w-full max-w-2xl m-auto bg-white shadow-md rounded-md mt-10 px-5 py-10 mb-20">
                <form
                  onSubmit={handleSubmit}
                  noValidate
                >
        
                  <div className="mb-4">
                    <label
                      className="text-slate-800"
                      htmlFor="tipo_habitacion"
                    >
                      Tipo Habitación:
                    </label>
                    <Select 
                      name="tipo_habitacion"
                      id="tipo_habitacion"
                      valueRef={tipoRef}
                      valueAct={tipo_habitacion}
                      data={tipos_habitacion}
                      />
                  </div>
        
                  <div className="mb-4">
                    <label
                      className="text-slate-800"
                      htmlFor="acomodacion"
                    >
                      Acomodación:
                    </label>
                    <Select 
                      name="acomodacion"
                      id="acomodacion"
                      valueRef={acomodacionRef}
                      valueAct={acomodacion}
                      data={acomodaciones}
                      />
                  </div>

                  <div className="mb-4">
                    <label
                      className="text-slate-800"
                      htmlFor="cantidad"
                    >
                      Cantidad:
                    </label>
                    <input
                      type="number"
                      id="cantidad"
                      name="cantidad"
                      className="mt-2 w-full p-3 bg-gray-50"
                      placeholder="Ej: 10"
                      defaultValue={cantidad}
                      ref={cantidadRef}
                    />
                  </div>
        
                  <input 
                    type="submit" 
                    value="Actualizar Habitación" 
                    className="bg-blue-900 hover:bg-blue-950 transition-colors cursor-pointer uppercase font-bold w-full p-3 text-white"
                  />
        
                  <Link to={`/habitaciones/${id}`}>
                  <input 
                    type="button" 
                    value="Cancelar" 
                    className="bg-red-600 hover:bg-red-700 transition-colors cursor-pointer uppercase font-bold w-full p-3 text-white mt-3"
                  />
                  </Link>
                </form>
              </div>
    </>
  )
}
