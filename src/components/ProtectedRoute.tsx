import { Navigate, useLocation } from "react-router-dom";
import { ReactNode } from "react";
import { useSelector } from "react-redux";

export default function ProtectedRoute({children}: {children: ReactNode}) {
    const isAuth = useSelector(s => s.auth.Authenticated);
    const location = useLocation();

    if (!isAuth) return
        <Navigate
            replace
            state={{from: location}}
            to="/#/login"
        />
    return <>{children}</>
}