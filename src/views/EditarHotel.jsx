import { createRef, useState, useEffect } from "react"
import { Link, useParams, useNavigate } from "react-router-dom"
import clienteAxios from "../config/axios"
import Select from "../components/Select"
import { useAuth } from "../hooks/useAuth"
import ciudades from "../data/ciudades"

  /**
   * Edita un hotel existente.
   * 
   * Muestra un formulario con los campos para editar un hotel existente.
   * 
   * @returns {ReactElement} Un JSX element que muestra el formulario para editar un hotel.
   */
export default function EditarHotel() {

  const [hotel, setHotel] = useState([])
  const navigate = useNavigate();
  const token = localStorage.getItem("AUTH_TOKEN");

  useEffect(() => {
    if(!token) {
      navigate("/auth/login");
    }
    obtenerHotel()
  }, [])
  
  const { editarHotel } = useAuth()

  const { id } = useParams()
  // console.log('id', id);

  /**
   * Consulta la API por el hotel con el id proporcionado y se la asigna al estado local.
   * 
   * @async
   * @function
   */
  const obtenerHotel = async () => {
    try {
      const { data } = await clienteAxios(`/api/hoteles/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      // console.log('data', data);
      setHotel(data.data)
    } catch (error) {
      console.log(error);
    }
  }

  const { nombre, direccion, ciudad, nit, numero_hab } = hotel

  const nombreRef = createRef()
  const direccionRef = createRef()
  const ciudadRef = createRef()
  const nitRef = createRef()
  const numHabRef = createRef()

  /**
   * Edita un hotel existente.
   * 
   * Previene el comportamiento predeterminado del envío del formulario, crea un objeto
   * con los datos del formulario y llama a la función `editarHotel` del hook `useAuth`.
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
      numero_hab: parseInt(numHabRef.current.value),
      id: id
    }

    // console.log('datos', datos);

    editarHotel(datos)
  }

  return (
    <>
        <h2 className="text-3xl font-black text-center mt-3">Editar Hotel: {nombre}</h2>
        
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
                      defaultValue={nombre}
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
                      defaultValue={direccion}
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
                     data={ciudades}
                     valueRef={ciudadRef} 
                     valueAct={ciudad} 
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
                      defaultValue={nit}
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
                      defaultValue={numero_hab}
                      ref={numHabRef}
                    />
                  </div>
        
                  <input 
                    type="submit" 
                    value="Actualizar Hotel" 
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
