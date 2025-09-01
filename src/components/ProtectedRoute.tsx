import { Navigate, useLocation } from "react-router-dom";
import { ReactNode } from "react";
import { RootState } from "../app/store";
import { useSelector } from "react-redux";

export default function ProtectedRoute({children}: {children: ReactNode}) {
    const isAuth = useSelector((s: RootState) => s.auth.isAuthenticated);
    const location = useLocation();

    if (!isAuth) return
        <Navigate
            replace
            state={{from: location}}
            to="/#/login"
        />
    return <>{children}</>
}