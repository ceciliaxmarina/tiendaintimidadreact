import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-pink-800 to-red-900 border-t border-red-800 text-gray-400 py-4">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-center md:text-left mb-2 md:mb-0">
            <p className="text-sm">
              Desarrolladora <span className="font-medium text-red-400">Cecilia Fernández</span> /Todos los derechos reservados/ 2025.
            </p>
          </div>
          <div className="text-center md:text-right">
            <p className="text-sm">Hecho con fines educativos</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
