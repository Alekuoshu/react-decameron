import { createBrowserRouter } from "react-router-dom";
import Layout from "./layouts/Layout";
import AuthLayout from "./layouts/AuthLayout";
import Inicio from "./views/Inicio";
import Login from "./views/Login";
import AgregarHotel from "./views/AgregarHotel";
import EditarHotel from "./views/EditarHotel";
import HabitacionesHotel from "./views/HabitacionesHotel";
import AsignarHabitacion from "./views/AsignarHabitacion";
import EditarHabitacion from "./views/EditarHabitacion";

// Configuración de routes de la aplicación
export const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                index: true,
                element: <Inicio />,
            },
            {
                path: "/agregar-hotel",
                element: <AgregarHotel />,
            },
            {
                path: "/hotel/:id",
                element: <EditarHotel />,
            },
            {
                path: "/habitaciones/:id",
                element: <HabitacionesHotel />,
            },
            {
                path: "/habitaciones/:id/asignar",
                element: <AsignarHabitacion />,
            },
            {
                path: "/habitaciones/:id/editar/:idHabitacion",
                element: <EditarHabitacion />,
            },
        ],
    },
    {
        path: "/auth",
        element: <AuthLayout />,
        children: [
            {
                path: "/auth/login",
                element: <Login />,
            },
        ],
    },
]);