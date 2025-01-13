import { createRef, useEffect } from "react"
import { Link } from "react-router-dom"
import Select from "../components/Select"
import { useAuth } from "../hooks/useAuth"
import { useNavigate } from "react-router-dom"
import ciudades from "../data/ciudades"
import { useMask } from '@react-input/mask';

  /**
   * Agrega un hotel.
   * 
   * Formulario para agregar un hotel. Contiene los campos para el nombre, 
   * dirección, ciudad, NIT y número de habitaciones.
   * 
   * @returns {ReactElement} Un JSX element que muestra el formulario para agregar un hotel.
   */
export default function AgregarHotel() {

  const navigate = useNavigate();
  const token = localStorage.getItem("AUTH_TOKEN");

  useEffect(() => {
    if(!token) {
      navigate("/auth/login");
    }
  }, [])

  const { registroHotel } = useAuth()

  const nombreRef = createRef()
  const direccionRef = createRef()
  const ciudadRef = createRef()
  // const nitRef = createRef()
  const nitRef = useMask({
    mask: 'XXXXXXXXX-X',
    replacement: { X: /\d/ },
  });
  const numHabRef = createRef()

  /**
   * Maneja el envío del formulario para agregar un hotel.
   * 
   * Previene el comportamiento predeterminado del envío del formulario, crea un objeto
   * con los datos del formulario y llama a la función `registroHotel` del hook `useAuth`.
   * 
   * @param {Event} e - El evento de envío del formulario.
   */
  const handleSubmit = async (e) => {
    e.preventDefault()

    const datos = {
      nombre: nombreRef.current.value,
      direccion: direccionRef.current.value,
      ciudad: ciudadRef.current.value,
      nit: nitRef.current.value,
      numero_hab: parseInt(numHabRef.current.value)
    }

    // console.log('datos', datos);

    registroHotel(datos)
  }

  return (
    <>
        <h2 className="text-3xl font-black text-center mt-3">Agregar Hotel</h2>
        
              <div className="w-full max-w-2xl m-auto bg-white shadow-md rounded-md mt-10 px-5 py-10 mb-20">
                <form
                  onSubmit={handleSubmit}
                  noValidate
                >
        
                  <div className="mb-4">
                    <label
                      className="text-slate-800"
                      htmlFor="nombre"
                    >
                      Nombre:
                    </label>
                    <input
                      type="text"
                      id="nombre"
                      className="mt-2 w-full p-3 bg-gray-50"
                      placeholder="Nombre hotel"
                      ref={nombreRef}
                    />
                  </div>
        
                  <div className="mb-4">
                    <label
                      className="text-slate-800"
                      htmlFor="direccion"
                    >
                      Dirección:
                    </label>
                    <input
                      type="text"
                      id="direccion"
                      className="mt-2 w-full p-3 bg-gray-50"
                      placeholder="Dirección hotel"
                      ref={direccionRef}
                    />
                  </div>
        
                  <div className="mb-4">
                    <label
                      className="text-slate-800"
                      htmlFor="ciudad"
                    >
                      Ciudad:
                    </label>
                    <Select 
                      name="ciudad"
                      id="ciudad"
                      valueRef={ciudadRef}
                      data={ciudades}
                    />
                  </div>
        
                  <div className="mb-4">
                    <label
                      className="text-slate-800"
                      htmlFor="nit"
                    >
                      NIT:
                    </label>
                    <input
                      type="text"
                      id="nit"
                      className="mt-2 w-full p-3 bg-gray-50"
                      placeholder="Ej: 123456789-1"
                      ref={nitRef}
                    />
                  </div>

                  <div className="mb-4">
                    <label
                      className="text-slate-800"
                      htmlFor="numero_hab"
                    >
                      Número Habitaciones:
                    </label>
                    <input
                      type="number"
                      id="numero_hab"
                      className="mt-2 w-full p-3 bg-gray-50"
                      placeholder="Ej: 10"
                      ref={numHabRef}
                    />
                  </div>
        
                  <input 
                    type="submit" 
                    value="Guardar Hotel" 
                    className="bg-blue-900 hover:bg-blue-950 transition-colors cursor-pointer uppercase font-bold w-full p-3 text-white"
                  />
        
                  <Link to="/">
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
