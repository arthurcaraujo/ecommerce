import { Link } from "react-router-dom";
import type { Product } from "../types";

export default function ProductCard({ p }: { p: Product }) {
    return (
        <div className="border rounded p-3 flex flex-col gap-2">
            {
                p.image &&
                <img
                    alt={p.title}
                    className="w-full h-40 object-cover rounded"
                    src={p.image}
                />
            }
            <h3 className="font-medium">{p.title}</h3>
            <p className="text-blue-700 font-semibold">
                $ {p.price.toFixed(2)}
            </p>
            <Link
                className="text-sm text-indigo-600"
                to={`/#/product/${p.id}`}
            >
                View details
            </Link>
        </div>
    )
}