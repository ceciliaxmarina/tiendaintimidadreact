import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserPlus, Mail, Lock, Eye, EyeOff } from "lucide-react";
import { useAppContext } from "../context/AppContext";

const SignIn = () => {

    const { setUser, setIsAuthenticated } = useAppContext();

  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError("Las contraseñas no coinciden.");
      return;
    }
     // Actualizar el contexto con los datos del usuario
    setUser({
      nombre: formData.name,
      email: formData.email,
    });
    // Marcar como autenticado
    setIsAuthenticated(true);
    // Redirigir al Home
    navigate("/");
    console.log("Registro exitoso:", formData);
    navigate("/"); // Redirige a Login después del registro
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex items-center justify-center pt-20">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6 text-blue-400 flex items-center justify-center">
          <UserPlus className="mr-2" /> Registrarse
        </h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="nombre" className="block text-gray-300 mb-2">
              Nombre completo
            </label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Ej: Mati Campos"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-300 mb-2">
              Correo electrónico
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Ej: mati.campos@example.com"
              required
            />
          </div>
          <div className="mb-4 relative">
            <label htmlFor="password" className="block text-gray-300 mb-2">
              Contraseña
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="••••••••"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-10 text-gray-400"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          <div className="mb-6 relative">
            <label htmlFor="confirmPassword" className="block text-gray-300 mb-2">
              Confirmar contraseña
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="••••••••"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition duration-300 ease-in-out flex items-center justify-center"
          >
            <UserPlus className="mr-2" size={18} />
            Registrarse
          </button>
        </form>
        <p className="text-gray-400 text-center mt-4">
          ¿Ya tienes una cuenta?{" "}
          <Link to="/iniciar-sesion" className="text-blue-400 hover:underline">
            Iniciar sesión
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
