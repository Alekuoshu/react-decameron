import { createContext, useState, useEffect } from "react";

const UserContext = createContext();

/**
 * UserProvider proporciona el estado de usuario y funciones para actualizarlo
 * a todos los componentes dentro de su alcance.
 *
 * @example
 * import { UserProvider } from "./context/UserProvider";
 *
 * <UserProvider>
 *   <App />
 * </UserProvider>
 *
 * @param {React.ReactNode} children - Componentes que usan UserProvider
 * @returns {React.ReactElement} Elemento JSX con UserContext.Provider
 */
const UserProvider = ({ children }) => {

    const token = localStorage.getItem("AUTH_TOKEN");
    if (!token) localStorage.setItem("AUTH_TOKEN", "");
  
    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem("user");
        return storedUser ? JSON.parse(storedUser) : [];
    });
    const [hotelName, setHotelName] = useState(() => {
        const storedHotelName = localStorage.getItem("hotelName");
        return storedHotelName ? JSON.parse(storedHotelName) : [];
    });

    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("hotelName", JSON.stringify(hotelName));
    }, [user, hotelName]);

  return (
    <UserContext.Provider value={{ user, setUser, hotelName, setHotelName }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserProvider, UserContext };