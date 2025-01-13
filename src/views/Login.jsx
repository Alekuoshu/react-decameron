import { createRef, useEffect } from "react"
import { useAuth } from "../hooks/useAuth"
import { useNavigate } from "react-router-dom"

  /**
   * Componente que renderiza el formulario de inicio de sesión.
   * 
   * Si el usuario ya tiene un token de autenticación guardado en el local storage,
   * se redirige a la ruta raíz. De lo contrario se renderiza el formulario de inicio
   * de sesión.
   * 
   * @returns {JSX.Element} El JSX del formulario de inicio de sesión.
   */
export default function Login() {

  const navigate = useNavigate();
  const token = localStorage.getItem("AUTH_TOKEN");

  useEffect(() => {
    if(token) {
      navigate("/");
    }
  }, [])
  
  const { login } = useAuth();

  const emailRef = createRef()
  const passwordRef = createRef()

  /**
   * Función que maneja el envío del formulario de inicio de sesión.
   * 
   * Previene el comportamiento predeterminado del envío del formulario, crea un objeto
   * con los datos del formulario y llama a la función `login` del hook `useAuth`.
   * 
   * @param {Event} e - El evento de envío del formulario.
   */
  const handleSubmit = async (e) => {
    e.preventDefault()

    const datos = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    }

    login(datos)

  }

  return (
    <>
      <h1 className="text-4xl font-black text-center">Iniciar Sesión</h1>
      <p className="text-center">Si eres admin puedes acceder</p>

      <div className="bg-white shadow-md rounded-md mt-5 px-5 py-5">
        <form
          onSubmit={handleSubmit}
          noValidate
        >

          <div className="mb-4">
            <label
              className="text-slate-800"
              htmlFor="email"
            >
              Email:
            </label>
            <input
              type="email"
              id="email"
              className="mt-2 w-full p-3 bg-gray-50"
              placeholder="Tu Email"
              ref={emailRef}
            />
          </div>

          <div className="mb-4">
            <label
              className="text-slate-800"
              htmlFor="password"
            >
              Password:
            </label>
            <input
              type="password"
              id="password"
              className="mt-2 w-full p-3 bg-gray-50"
              placeholder="Tu Password"
              ref={passwordRef}
            />
          </div>

          <input 
            type="submit" 
            value="Iniciar Sesión" 
            className="bg-blue-900 hover:bg-blue-950 transition-colors cursor-pointer uppercase font-bold w-full p-3 text-white"
          />
        </form>
      </div>

      <p className="text-center mt-3 text-xs text-gray-500">
        &copy; {new Date().getFullYear()} Alejandro Villegas. Todos los derechos reservados.
      </p>

    </>
  )
}
