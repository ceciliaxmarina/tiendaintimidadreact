import React, { useState } from "react";
import Confetti from "react-confetti";
import { useAppContext } from "../context/AppContext";
import { Trash2, CreditCard, ArrowLeft, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";

const CartPage = () => {
  const {  cart, eliminarDelCarrito, vaciarCarrito } = useAppContext();
  const [isCelebrating, setIsCelebrating] = useState(false);

  const total = cart.reduce((acc, item) => acc + (item.precio * item.cantidad), 0);

  const handleFinalizarCompra = () => {
    setIsCelebrating(true);
    vaciarCarrito();
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 pt-24 pb-12 px-4 relative">
      {/* Efecto de confeti */}
      {isCelebrating && (
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          colors={["#06b6d4", "#3b82f6", "#8b5cf6", "#ec4899", "#f59e0b"]}
          numberOfPieces={300}
          recycle={false}
        />
      )}

      {/* Contenido del carrito */}
      <div className="container mx-auto max-w-4xl">
        {/* Título y enlace para volver */}
        <div className="flex items-center mb-8">
          <Link to="/productos" className="text-blue-400 hover:text-blue-300 mr-4">
            <ArrowLeft size={24} />
          </Link>
          <h1 className="text-3xl font-bold text-blue-400">Tu Carrito</h1>
        </div>

        {/* Mensaje de celebración */}
        {isCelebrating && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-gray-900 bg-opacity-90 p-8 rounded-lg text-center shadow-xl max-w-md">
              <h2 className="text-3xl font-bold text-green-400 mb-4">¡Compra exitosa! 🎉</h2>
              <p className="text-gray-300 mb-6">
                Gracias por tu compra. Disfruta de tus productos!
              </p>
              <Link
                to="/productos"
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
              >
                Volver a los cursos
              </Link>
            </div>
          </div>
        )}

        {/* Carrito vacío */}
        {cart.length === 0 && !isCelebrating ? (
          <div className="text-center py-12">
            <ShoppingCart size={64} className="mx-auto text-gray-500 mb-4" />
            <h2 className="text-xl text-gray-400 mb-2">Tu carrito está vacío</h2>
            <p className="text-gray-500">
              Explora nuestros{" "}
              <Link to="/productos" className="text-blue-400 hover:underline">
                cursos
              </Link>{" "}
              y encuentra el perfecto para ti.
            </p>
          </div>
        ) : (
          !isCelebrating && (
            <>
              {/* Lista de productos en el carrito */}
              <div className="space-y-4 mb-8">
                {cart.map((item) => (
                  <div
                    key={item.key}
                    className="bg-gray-800 p-4 rounded-lg flex flex-col sm:flex-row justify-between items-center gap-4"
                  >
                    <div className="flex items-center gap-4">
                      <img
                        src={item.imagen}
                        alt={item.titulo}
                        className="w-20 h-16 object-cover rounded"
                      />
                      <div>
                        <h3 className="font-semibold text-blue-400 text-lg">
                          {item.titulo}
                        </h3>
                        <p className="text-gray-400 text-sm">
                          ${item.precio.toFixed(2)} x {item.cantidad}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-gray-300">
                        Subtotal: ${(item.precio * item.cantidad).toFixed(2)}
                      </span>
                      <button
                        onClick={() => eliminarDelCarrito(item.id)}
                        className="text-red-400 hover:text-red-300 transition-colors"
                        aria-label="Eliminar producto"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Resumen del carrito */}
              <div className="bg-gray-800 p-6 rounded-lg mt-8">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-lg font-semibold">Total:</span>
                  <span className="text-2xl font-bold text-blue-400">
                    ${total.toFixed(2)}
                  </span>
                </div>

                {/* Acciones */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={vaciarCarrito}
                    className="w-full sm:w-auto bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded-lg transition-colors flex-1 flex items-center justify-center"
                  >
                    <Trash2 size={18} className="mr-2" />
                    Vaciar Carrito
                  </button>
                  <button
                    onClick={handleFinalizarCompra}
                    className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors flex-1 flex items-center justify-center"
                  >
                    <CreditCard size={18} className="mr-2" />
                    Finalizar Compra
                  </button>
                </div>
              </div>
            </>
          )
        )}
      </div>
    </div>
  );
};

export default CartPage;
