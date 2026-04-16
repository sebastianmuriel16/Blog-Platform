import { useState } from "react";
import { SignupForm } from "../../components/SignupForm/SingupForm";
import type { SignupRequest } from "../../types/SignupRequest.type";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

import type { ErrorResponse } from "../../types/error.type";
import { signUp } from "../../services/AuthService";
export const SignupPage = () => {
  const { login } = useAuth();
  const [error, setError] = useState<ErrorResponse | null>(null);
  const navigate = useNavigate();

  const onSubmit = async (data: SignupRequest) => {
    try {
      const response = await signUp(data);
      login(response.token);
      navigate("/");
    } catch (error) {
      setError(error as ErrorResponse);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center mt-10">
      <SignupForm onSubmit={onSubmit} error={error} />
    </div>
  );
};
