import React from "react";
import { ShoppingCart } from "lucide-react";
import { useAppContext } from "../context/AppContext";
import { Link } from "react-router-dom";

const ProductoCard = ({ producto }) => {
  const { agregarAlCarrito, user } = useAppContext();

  return (
    <div className="bg-red-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
      {/* Imagen del producto */}
      <div className="w-full h-48 overflow-hidden">
        <img
          src={producto.imagen}
          alt={producto.titulo}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>

      {/* Contenido del card */}
      <div className="p-5">
        {/* Título como enlace al detalle */}
        <Link to={`/productos/${producto.id}`}>
          <h3 className="text-xl font-bold text-red-400 mb-2 hover:text-red-300 transition-colors">
            {producto.titulo}
          </h3>
        </Link>

        <p className="text-red-200 text-sm mb-4 line-clamp-3">
          {producto.descripcion}
        </p>

        {/* Precio y botón */}
        <div className="flex justify-between items-center">
          <span className="text-lg font-semibold text-white">
            ${producto.precio.toFixed(2)}
          </span>
          <button
            onClick={
              user
                ? () => agregarAlCarrito(producto)
                : () => alert("Inicia sesión para comprar!!!")
            }
            className="bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 rounded-lg flex items-center transition-colors duration-300"
          >
            <ShoppingCart size={16} className="mr-1" />
            Agregar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductoCard;
