import { Link } from "react-router-dom";
import { logout } from "../features/auth/authSlice";
import type { RootState } from "../app/store";
import { useSelector, useDispatch } from "react-redux";

export default function Navbar() {
    const cartCount = useSelector((s: RootState) =>
        s.cart.items.reduce((sum, i) =>
            sum + i.quantity, 0))
    const auth = useSelector((s: RootState) => s.auth)
    const dispatch = useDispatch()

    return (
        <nav className="border-b container mx-auto
            flex items-center justify-between p-4"
        >
            <Link to="/" className="font-semibold">E‑Shop</Link>
            <div className="flex gap-4 items-center">
                <Link to="/#/cart">Cart ({cartCount})</Link>
                {auth.isAuthenticated ? (
                <>
                    <Link to="/#/orders">My Orders</Link>
                    <button
                        className="text-red-600"
                        onClick={() => dispatch(logout())}
                    >
                        Logout
                    </button>
                </>
                ) : (
                <Link to="/#/login">Login</Link>
                )}
            </div>
        </nav>
    )
}