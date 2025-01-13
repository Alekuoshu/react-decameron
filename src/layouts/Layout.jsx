import { Outlet } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import Header from "../components/Header"
// import Footer from "../components/Footer"

/**
 * Componente que renderiza el layout principal de la aplicación.
 * 
 * Este componente renderiza el Header, el contenido principal de la página (mediante el componente Outlet) y el ToastContainer para mostrar notificaciones.
 * 
 * @returns {JSX.Element} El JSX del layout principal.
 */
export default function Layout() {

  return (
    <>
        <Header />

        <main className="bg-gray-100 p-5 md:p-12 md:py-5">
          <Outlet />
        </main>

        {/* <Footer /> */}


      <ToastContainer />
    </>
  )
}
