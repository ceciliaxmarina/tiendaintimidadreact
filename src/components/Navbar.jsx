import { ShoppingCart, LogOut } from "lucide-react";
import { Link } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

const Navbar = () => {
  const { user, cerrarSesion, cart } = useAppContext();

  return (
    <header className="fixed top-0 left-0 w-full bg-gradient-to-r from-pink-800 to-red-900 bg-opacity-90 backdrop-blur-md shadow-lg z-40 transition-all duration-300 border-b border-red-800">

      <div className="container mx-auto px-4 py-3">
        <div className="flex flex-wrap justify-between items-center">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-red-400 items-center space-x-2 flex">
            Tienda Intimidad 
          </Link>

          {/* Navbar */}
          <nav className="flex flex-wrap items-center gap-8">
            <Link
              to="/"
              className="text-gray-300 hover:text-red-400 transition duration-300 ease-in-out"
            >
              Inicio
            </Link>
            <Link
              to="/productos"
              className="text-gray-300 hover:text-red-400 transition duration-300 ease-in-out"
            >
              Productos
            </Link>
            {user && (
              <Link
                to="/cart"
                className="relative group text-gray-300 hover:text-red-400 transition duration-300 ease-in-out"
              >
                <ShoppingCart className="inline-block mr-1 group-hover:text-red-400" size={20} />
                <span className="hidden sm:inline">Cart</span>
                {cart.length > 0 && (
                  <span
                    className="absolute -top-2 -left-2 bg-red-500 text-white rounded-full px-2 py-0.5 text-xs group-hover:bg-red-400 transition duration-300 ease-in-out"
                  >
                    {cart.length}
                  </span>
                )}
              </Link>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navbar;