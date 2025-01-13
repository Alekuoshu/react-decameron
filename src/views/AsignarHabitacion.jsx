import { createRef, useEffect } from "react"
import { Link, useParams } from "react-router-dom"
import { useAuth } from "../hooks/useAuth"
import { useNavigate } from "react-router-dom"
import Select from "../components/Select"
import tipos_habitacion from "../data/tipos_habitacion"
import acomodaciones from "../data/acomodaciones"

/**
 * AsignarHabitacion
 * 
 * Muestra un formulario para asignar una habitación a un hotel.
 * 
 * @param {number} hotel_id - id del hotel al que se va a asignar la habitación
 * 
 * @returns {ReactElement} un JSX element que muestra el formulario para asignar habitación
 */
export default function AsignarHabitacion() {

  const navigate = useNavigate();
  const token = localStorage.getItem("AUTH_TOKEN");

  const { id: hotel_id } = useParams()

  useEffect(() => {
    if(!token) {
      navigate("/auth/login");
    }
  }, [])
  
  const { registroHabitacion } = useAuth()

  const tipoRef = createRef()
  const acomodacionRef = createRef()
  const cantidadRef = createRef()

  /**
   * Envia el formulario para asignar una habitación a un hotel.
   * 
   * @param {Event} e - Evento submit del formulario
   */
  const handleSubmit = async (e) => {
    e.preventDefault()

    const datos = {
      hotel_id: hotel_id,
      tipo_habitacion: tipoRef.current.value,
      acomodacion: acomodacionRef.current.value,
      cantidad: parseInt(cantidadRef.current.value)
    }

    // console.log('datos', datos);

    registroHabitacion(datos)
  }

  return (
    <>
        <h2 className="text-3xl font-black text-center mt-3">Asignar Habitación:</h2>
        
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
                      ref={cantidadRef}
                    />
                  </div>
        
                  <input 
                    type="submit" 
                    value="Guardar Hotel" 
                    className="bg-blue-900 hover:bg-blue-950 transition-colors cursor-pointer uppercase font-bold w-full p-3 text-white"
                  />
        
                  <Link to={`/habitaciones/${hotel_id}`}>
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
