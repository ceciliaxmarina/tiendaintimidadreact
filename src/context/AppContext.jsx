import React, { createContext, useContext, useState } from "react";

// Crear el contexto
export const AppContext = createContext();

// Proveedor del contexto
export function AppProvider({ children }) {
  // Estado de autenticación
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState();

  // Estado del carrito
  const [cart, setCart] = useState([]);

  // Funciones para el carrito
  const agregarAlCarrito = (producto) => {
    setCart((carritoActual) => {
      // Verificar si el producto ya está en el carrito
      const productoExistente = carritoActual.find(item => item.id === producto.id);

      if (productoExistente) {
        // Si ya existe, incrementar la cantidad
        return carritoActual.map(item =>
          item.id === producto.id
            ? { ...item, cantidad: (item.cantidad || 1) + 1, key: `${item.id}-${Date.now()}` }
            : item
        );
      } else {
        // Si no existe, agregarlo con cantidad 1 y una clave única
        return [...carritoActual, { ...producto, cantidad: 1, key: `${producto.id}-${Date.now()}` }];
      }
    });
  };

  const vaciarCarrito = () => {
    setCart([]);
  };

  // En tu AppContext.js
  const eliminarDelCarrito = (productoId) => {
    setCart((carritoActual) => {
      const productoExistente = carritoActual.find(item => item.id === productoId);

      if (productoExistente && productoExistente.cantidad > 1) {
        // Si la cantidad es mayor a 1, disminuirla
        return carritoActual.map(item =>
          item.id === productoId
            ? { ...item, cantidad: item.cantidad - 1 }
            : item
        );
      } else {
        // Si la cantidad es 1, eliminar el producto
        return carritoActual.filter(item => item.id !== productoId);
      }
    });
  };


  // Función para cerrar sesión
  const cerrarSesion = () => {
    setIsAuthenticated(false);
    setUser();
    vaciarCarrito();
  };

  // Valor que se provee a todos los componentes
  const value = {
    // Autenticación
    isAuthenticated,
    setIsAuthenticated,
    user,
    setUser,
    cerrarSesion,

    // Carrito
    cart,
    agregarAlCarrito,
    vaciarCarrito,
    eliminarDelCarrito
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext debe usarse dentro de AppProvider");
  }
  return context;
}
