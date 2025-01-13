import { Outlet } from "react-router-dom"
import { ToastContainer } from "react-toastify"

/**
 * Componente que renderiza el layout de autenticación.
 * 
 * Este layout se utiliza en las rutas de autenticación (/login y /registro)
 * y renderiza el logotipo de la aplicación y el componente que se encuentra
 * en la ruta actual.
 * 
 * @returns {JSX.Element} El JSX del layout de autenticaci n.
 */
export default function AuthLayout() {
  return (
    <>
      <main className="max-w-xl mx-auto mt-10 md:mt-28 flex flex-col items-center">
        <img src="../img/decameron.png" alt="imagen logotipo" className="w-3/4" />

        <div className="p-10 w-full">
          <Outlet />
        </div>
      </main>

      <ToastContainer />
    </>
  )
}
