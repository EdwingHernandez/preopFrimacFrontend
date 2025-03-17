import { Navigate, Outlet } from "react-router-dom";

const isAuthenticated = async () => {
    try {
        const response = await fetch("http://localhost:8080/users/validate-session", {
            method: "GET",
            credentials: "include",
        });

        return response.ok;
    } catch (error) {
        console.error("Error al validar la sesión:", error);
        return false;
    }
};


const PrivateRoute = async () => {
    const authenticated = await isAuthenticated();
    return authenticated ? <Outlet /> : <Navigate to="/" replace />;
};

export default PrivateRoute;
