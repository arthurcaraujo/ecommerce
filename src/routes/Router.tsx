import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import App from "../App";
import Cart from "../pages/Cart";
import Checkout from "../pages/Checkout";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Orders from "../pages/Orders";
import ProductDetails from "../pages/ProductDetails";

export default function Router() {
    return (
        <HashRouter>
            <Routes>
                <Route element={<App />} path="/">
                    <Route
                        element={<Home />}
                        index
                    />
                    <Route
                        element={<Cart />}
                        path="cart"
                    />
                    <Route
                        element={<Checkout />}
                        path="checkout"
                    />
                    <Route
                        element={<Login />}
                        path="login"
                    />
                    <Route
                        element={<Orders />}
                        path="orders"
                    />
                    <Route
                        element={<ProductDetails />}
                        path="product/:id"
                    />
                    <Route
                        element={<Navigate replace to={"/"} />}
                        path="*"
                    />
                </Route> 
            </Routes>
        </HashRouter>
    )
}