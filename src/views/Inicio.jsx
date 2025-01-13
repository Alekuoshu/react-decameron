import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useSWR from 'swr'
import clienteAxios from "../config/axios"
import CardHotel from "../components/CardHotel"

  /**
   * Componente que muestra el inicio de la aplicacion, 
   * con una grilla de hoteles. 
   * Si no hay hoteles, se muestra un mensaje de 
   * bienvenida y un enlace para agregar el primer hotel.
   * 
   * @returns {JSX.Element} El JSX del componente.
   */
export default function Inicio() {

  const navigate = useNavigate();
  const token = localStorage.getItem("AUTH_TOKEN");

  useEffect(() => {
    if(!token) {
      navigate("/auth/login");
    }
  }, [])

  // SWR: React Hooks for Remote Data Fetching
  // permite cachear peticiones HTTP para evitar 
  // re-peticiones innecesarias y mejorar el rendimiento.
  const fetcher = () => clienteAxios('/api/hoteles').then(data => data.data)
  const { data, error, isLoading } = useSWR('/api/hoteles', fetcher, {
    refreshInterval: 1000
  })

  if(isLoading) return 'Cargando...';
  if(error) return 'Error al cargar los hoteles';
  const hoteles = data?.data?.sort((a, b) => a.id - b.id);

  return (
    <>

      <div className="w-11/12 mx-auto">

        <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
              
              {hoteles.length !== 0 && (

                hoteles.map(hotel =>(
                  <CardHotel 
                    key={hotel.id}
                    hotel={hotel}
                  />
                ))

              )}

        </div>

        {hoteles.length === 0 && (
          <h2 className="text-center text-gray-500 flex items-center justify-center text-xl sm:text-2xl md:text-3xl xl:text-4xl px-8 py-20 md:py-72 xl:py-60">No hay hoteles agregados aún. Comienza agregando el primero.</h2>
        )}

      </div>
      
    </>
  )
}
