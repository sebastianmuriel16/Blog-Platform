import type { ErrorResponse } from "../../types/error.type";
import type { SignupRequest } from "../../types/SignupRequest.type";
import { Link } from "react-router-dom";

interface SignupFormProps {
  onSubmit: (data: SignupRequest) => void;
  error: ErrorResponse | null;
}

export const SignupForm = ({ onSubmit, error }: SignupFormProps) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const name = formData.get("name");
    const email = formData.get("email");
    const password = formData.get("password");

    const data: SignupRequest = {
      name: name as string,
      email: email as string,
      password: password as string,
    };

    onSubmit(data);
  };

  return (
    <form className="w-full max-w-md" onSubmit={handleSubmit}>
      <h2 className="text-2xl font-semibold text-gray-900 mb-6">
        Crear cuenta
      </h2>

      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">Nombre</label>
          <input
            type="text"
            name="name"
            placeholder="Tu nombre"
            className="w-full px-4 py-2 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            placeholder="tu@email.com"
            className="w-full px-4 py-2 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">
            Contraseña
          </label>
          <input
            type="password"
            name="password"
            placeholder="••••••••"
            className="w-full px-4 py-2 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
        </div>

        {error && (
          <div className="px-4 py-2 rounded-lg bg-red-50 border border-red-200">
            <span className="text-sm text-red-600">{error.message}</span>
          </div>
        )}

        <button
          type="submit"
          className="w-full py-2 px-4 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors mt-2"
        >
          Crear cuenta
        </button>

        <p className="text-sm text-center text-gray-500">
          ¿Ya tienes cuenta?{" "}
          <Link
            to="/login"
            className="text-indigo-600 hover:underline font-medium"
          >
            Inicia sesión
          </Link>
        </p>
      </div>
    </form>
  );
};
