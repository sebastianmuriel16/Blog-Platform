import { useState } from "react";
import { LoginForm } from "../../components/LoginForm/LoginForm";
import { signIn } from "../../services/AuthService";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import type { ErrorResponse } from "../../types/error.type";
import type { LoginRequest } from "../../types/login.type";

export const LoginPage = () => {
  const { login } = useAuth();
  const [error, setError] = useState<ErrorResponse | null>(null);
  const navigate = useNavigate();
  const onSubmit = async (data: LoginRequest) => {
    try {
      const response = await signIn(data);
      login(response.token);
      navigate("/");
    } catch (error) {
      setError(error as ErrorResponse);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center mt-10">
      <LoginForm onSubmit={onSubmit} error={error} />
    </div>
  );
};
