import { createContext, useContext, useState } from "react";
import api from "../services/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [accessToken, setAccessToken] = useState(
        localStorage.getItem("access")
    );
    const [user, setUser] = useState(null);

    const [ cartCount, setCartCount ] = useState(0);

    async function login(email, password) {
        const response = await api.post("/auth/login/", {
            email,
            password,
        })
        const { access, refresh } = response.data;

        localStorage.setItem("access", access);
        localStorage.setItem("refresh", refresh);

        setAccessToken(access);

        return response.data;
    };

    async function logout() {
        const refreshToken = localStorage.getItem("refresh");

        try {
            if (refreshToken) {
                await api.post("/auth/logout/", {
                refresh: refreshToken,
            })
            }
            
        } catch(error) {
            console.log(error)
        } finally {
            localStorage.removeItem("access");
            localStorage.removeItem("refresh");

            setAccessToken(null);
            setUser(null);
            setCartCount(0);
        }
    };

    async function refreshCart() {
        if (!localStorage.getItem("access")) {
            setCartCount(0);
            return;
        }

        try {
            const response = await api.get("/cart/");
            const items = response.data.items || [];

            const totalQuantity = items.reduce((total, item) => {
                return total + Number(item.quantity);
            }, 0);

            setCartCount(totalQuantity);
        } catch (error) {
            console.log(error);
        }
    }


    return (
        <AuthContext.Provider value= {{accessToken, user, login, logout, refreshCart, cartCount }}
        
        >
            {children}
         </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);