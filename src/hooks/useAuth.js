import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import clienteAxios from "../config/axios";
import { UserContext } from "../context/UserProvider";

/**
 * useAuth hook
 *
 * @returns {Object} with properties:
 * - login: (datos) => Promise<void>
 * - registroHotel: (datos) => Promise<void>
 * - registroHabitacion: (datos) => Promise<void>
 * - editarHotel: (datos) => Promise<void>
 * - editarHabitacion: (datos) => Promise<void>
 * - eliminarHotel: (id) => Promise<void>
 * - eliminarHabitacion: (id, hotel_id) => Promise<void>
 * - logout: () => Promise<void>
 */
export const useAuth = () => {
  const { setUser } = useContext(UserContext);
  const token = localStorage.getItem("AUTH_TOKEN");

  const navigate = useNavigate();

  const login = async (datos) => {
    try {
      const { data } = await clienteAxios.post("/api/login", datos);
      await localStorage.setItem("AUTH_TOKEN", data.token);
      // console.log("user", data.user);
      await setUser(data.user.name);
      await navigate("/");
    } catch (error) {
      if (error?.response?.data?.errors) {
        let errores = Object.values(error.response.data.errors);
        errores.forEach((error) => {
          toast.error(Array.isArray(error) ? error[0] : error, {
            position: "bottom-right",
            autoClose: 5000,
          });
        });
        // console.log("error", Object.values(error.response.data.errors));
      } else {
        toast.error(error.response.data.error, {
          position: "bottom-right",
          autoClose: 5000,
        });
        // console.log("error2", error.response.data.error);
      }
    }
  };

  const registroHotel = async (datos) => {
    try {
      const { data } = await clienteAxios.post("/api/hoteles", datos, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // console.log("respuesta", data);
      navigate("/");
      window.scrollTo(0, 0);
      toast.success("Hotel creado correctamente", {
        position: "bottom-right",
        autoClose: 3000,
      });
    } catch (error) {
      if (error?.response?.data?.errors) {
        let errores = Object.values(error.response.data.errors);
        errores.forEach((error) => {
          toast.error(error[0], {
            position: "bottom-right",
            autoClose: 5000,
          });
        });
        // console.log("error", Object.values(error.response.data.errors));
      } else {
        toast.error(error.response.data.error, {
          position: "bottom-right",
          autoClose: 5000,
        });
        // console.log("error", error.response.data.error);
      }
    }
  };

  const registroHabitacion = async (datos) => {
    try {
      const { data } = await clienteAxios.post("/api/habitaciones", datos, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // console.log("respuesta", data);
      navigate(`/habitaciones/${datos.hotel_id}`);
      window.scrollTo(0, 0);
      toast.success("Habitación asignada", {
        position: "bottom-right",
        autoClose: 3000,
      });
    } catch (error) {
      if (error?.response?.data?.errors) {
        let errores = Object.values(error.response.data.errors);
        errores.forEach((error) => {
          toast.error(error[0], {
            position: "bottom-right",
            autoClose: 5000,
          });
        });
        // console.log("error", Object.values(error.response.data.errors));
      } else {
        toast.error(error.response.data.error, {
          position: "bottom-right",
          autoClose: 5000,
        });
        // console.log("error", error.response.data.error);
      }
    }
  };

  const editarHotel = async (datos) => {
    try {
      const { data } = await clienteAxios.post(
        `/api/hoteles/${datos.id}`,
        datos,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // console.log("respuesta", data);
      navigate("/");
      window.scrollTo(0, 0);
      toast.success("Hotel actualizado", {
        position: "bottom-right",
        autoClose: 3000,
      });
    } catch (error) {
      if (error?.response?.data?.errors) {
        let errores = Object.values(error.response.data.errors);
        errores.forEach((error) => {
          toast.error(error[0], {
            position: "bottom-right",
            autoClose: 5000,
          });
        });
        // console.log("error", Object.values(error.response.data.errors));
      } else {
        toast.error(error.response.data.error, {
          position: "bottom-right",
          autoClose: 5000,
        });
        // console.log("error", error.response.data.error);
      }
    }
  };

  const editarHabitacion = async (datos) => {
    try {
      const { data } = await clienteAxios.post(
        `/api/habitaciones/${datos.id}`,
        datos,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // console.log("respuesta", data);
      navigate(`/habitaciones/${datos.hotel_id}`);
      window.scrollTo(0, 0);
      toast.success("Habitación actualizada", {
        position: "bottom-right",
        autoClose: 3000,
      });
    } catch (error) {
      if (error?.response?.data?.errors) {
        let errores = Object.values(error.response.data.errors);
        errores.forEach((error) => {
          toast.error(error[0], {
            position: "bottom-right",
            autoClose: 5000,
          });
        });
        // console.log("error", Object.values(error.response.data.errors));
      } else {
        toast.error(error.response.data.error, {
          position: "bottom-right",
          autoClose: 5000,
        });
        // console.log("error", error.response.data.error);
      }
    }
  };

  const eliminarHotel = async (id) => {
    try {
      await clienteAxios.delete(`/api/hoteles/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      navigate("/");
      // toast.success("Hotel eliminado", {
      //   position: "bottom-right",
      //   autoClose: 3000,
      // });
    } catch (error) {
      if (error?.response?.data?.errors) {
        let errores = Object.values(error.response.data.errors);
        errores.forEach((error) => {
          toast.error(error[0], {
            position: "bottom-right",
            autoClose: 5000,
          });
        });
        // console.log("error", Object.values(error.response.data.errors));
      } else {
        toast.error(error.response.data.error, {
          position: "bottom-right",
          autoClose: 5000,
        });
        // console.log("error", error.response.data.error);
      }
    }
  };

  const eliminarHabitacion = async (id, hotel_id) => {
    try {
      await clienteAxios.delete(`/api/habitaciones/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      navigate(`/habitaciones/${hotel_id}`);
      // toast.success("Hotel eliminado", {
      //   position: "bottom-right",
      //   autoClose: 3000,
      // });
    } catch (error) {
      if (error?.response?.data?.errors) {
        let errores = Object.values(error.response.data.errors);
        errores.forEach((error) => {
          toast.error(error[0], {
            position: "bottom-right",
            autoClose: 5000,
          });
        });
        // console.log("error", Object.values(error.response.data.errors));
      } else {
        toast.error(error.response.data.error, {
          position: "bottom-right",
          autoClose: 5000,
        });
        // console.log("error", error.response.data.error);
      }
    }
  };

  const logout = async () => {
    try {
      await clienteAxios.post("/api/logout", null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      localStorage.removeItem("AUTH_TOKEN");
      navigate("/auth/login");
    } catch (error) {
      if (error?.response?.data?.errors) {
        let errores = Object.values(error.response.data.errors);
        errores.forEach((error) => {
          toast.error(error[0], {
            position: "bottom-right",
            autoClose: 5000,
          });
        });
        // console.log("error", Object.values(error.response.data.errors));
      } else {
        toast.error(error.response.data.error, {
          position: "bottom-right",
          autoClose: 5000,
        });
        // console.log("error", error.response.data.error);
      }
    }
  };

  return {
    login,
    registroHotel,
    registroHabitacion,
    editarHotel,
    editarHabitacion,
    eliminarHotel,
    eliminarHabitacion,
    logout,
  };
};
