import { useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import useSWR from 'swr'
import clienteAxios from "../config/axios"
import CardHabitacion from "../components/CardHabitacion";

  /**
   * HabitacionesHotel
   * 
   * Muestra todas las habitaciones asignadas a un hotel y permite al usuario asignar una nueva.
   * 
   * @returns {ReactElement} un JSX element que muestra todas las habitaciones asignadas a un hotel y permite asignar una nueva.
   */
export default function HabitacionesHotel() {

  const navigate = useNavigate();
  const token = localStorage.getItem("AUTH_TOKEN");

  useEffect(() => {
    if(!token) {
      navigate("/auth/login");
    }
  }, [])
  

  const { id } = useParams()
  // console.log('id', id);


  // Consulta a la API para obtener el hotel con el id especificado y todas sus habitaciones.
  const fetcher = () => {
    if (!id) {
      throw new Error('No se ha proporcionado un id de hotel');
    }
    return clienteAxios(`/api/hoteles/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(response => {
        if (!response.data) {
          throw new Error('La respuesta de la API no contiene datos');
        }
        return response.data;
      })
      .catch(error => {
        console.error('Error al obtener el hotel:', error);
        throw error;
      });
  }
  const { data, error, isLoading } = useSWR(`/api/hoteles/${id}`, fetcher, {
    refreshInterval: 200
  })

  if(isLoading) return 'Cargando...';
  const habitaciones = data.data.habitaciones.sort((a, b) => a.tipo_habitacion.localeCompare(b.tipo_habitacion));
  const nombre = data.data.nombre;
  const numero_hab = data.data.numero_hab;
  const restante = numero_hab - habitaciones.reduce((a, b) => a + b.cantidad, 0);



  /**
   * Redirige al usuario a la ruta para asignar una nueva habitacion al hotel con el id especificado.
   * 
   * @param {number} id - id del hotel al que se va a asignar la habitacion
   */
  const handleAgregar = () => {
    navigate(`/habitaciones/${id}/asignar`);
  }

  return (
    <>

      <div className="w-11/12 mx-auto mb-10">
        <div className="flex justify-end gap-5">
        
          <button type="button" className={`${restante > 0 ? 'bg-green-600 hover:bg-green-800' : 'bg-slate-400'} float-right w-auto flex items-center justify-between text-white font-bold py-2 px-4 rounded`} disabled={restante > 0 ? '' : 'disabled'} onClick={handleAgregar}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#fff" className="size-8">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              </svg>
              Asignar Habitación
          </button>

          <button type="button" className="float-right w-auto flex items-center justify-between bg-slate-600 hover:bg-slate-800 text-white font-bold py-2 px-4 rounded" onClick={() => navigate('/')}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
            </svg>
              Volver
          </button>

        </div>

        <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-center mt-3">Habitaciones: {nombre}</h2>
        <p className="text-sm sm:text-lg text-center font-bold mb-8">Capacidad: {numero_hab} / Restantes: {restante}</p>

          <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
                
                {habitaciones.length !== 0 && (

                  habitaciones.map(habitacion =>(
                    <CardHabitacion 
                      key={habitacion.id}
                      habitacion={habitacion}
                    />
                  ))

                )}

          </div>

          {habitaciones.length === 0 && (
              <h2 className="text-center text-gray-500 flex items-center justify-center text-xl sm:text-2xl md:text-3xl xl:text-4xl px-8 py-20 md:py-72 xl:py-60">No hay habitaciones asignadas aún. Comienza asignando la primera.</h2>
          )}

        </div>
      
    </>
  )
}
