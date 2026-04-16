import type { LoginRequest } from "../../types/login.type";
import type { ErrorResponse } from "../../types/error.type";
import { Link } from "react-router-dom";

interface LoginFormProps {
  onSubmit: (data: LoginRequest) => void;
  error: ErrorResponse | null;
}
export const LoginForm = ({ onSubmit, error }: LoginFormProps) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const email = formData.get("email");
    const password = formData.get("password");

    const data: LoginRequest = {
      email: email as string,
      password: password as string,
    };

    onSubmit(data);
  };

  return (
    <form className="w-full max-w-md" onSubmit={handleSubmit}>
      <h2 className="text-2xl font-semibold text-gray-900 mb-6">Login</h2>
      {error && <span className="text-xs text-red-500">{error.message}</span>}
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            placeholder="tu@email.com"
            required
            className="w-full px-4 py-2 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            name="password"
            required
            placeholder="••••••••"
            className="w-full px-4 py-2 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
        </div>

        <button
          className="w-full py-2 px-4 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors mt-2"
          type="submit"
        >
          Login
        </button>

        <p className="text-sm text-center text-gray-500">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="text-indigo-600 hover:underline font-medium"
          >
            Sign up
          </Link>
        </p>
      </div>
    </form>
  );
};
