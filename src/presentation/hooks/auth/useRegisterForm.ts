import { useState } from "react";
import { useAuth } from "./useAuth";

export function useRegisterForm() {
  const { register, isLoading, error, clearError } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [validationErrors, setValidationErrors] = useState<
    Record<string, string>
  >({});
  const [hasAttemptedSubmit, setHasAttemptedSubmit] = useState(false);

  const validatePassword = (pwd: string): string | null => {
    if (pwd.length < 8) {
      return "Password must be at least 8 characters";
    }
    if (!/[A-Z]/.test(pwd)) {
      return "Password must contain at least one uppercase letter";
    }
    if (!/\d/.test(pwd)) {
      return "Password must contain at least one number";
    }
    if (!/[@$!%*?&]/.test(pwd)) {
      return "Password must contain at least one special character (@$!%*?&)";
    }
    return null;
  };

  const handlePasswordChange = (value: string) => {
    setPassword(value);
    // Validate in real-time only after first submit attempt
    if (hasAttemptedSubmit) {
      const passwordError = validatePassword(value);
      if (passwordError) {
        setValidationErrors((prev) => ({
          ...prev,
          password: passwordError,
        }));
      } else {
        setValidationErrors((prev) => {
          const { password: _, ...rest } = prev;
          return rest;
        });
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();
    setHasAttemptedSubmit(true);
    setValidationErrors({});

    const errors: Record<string, string> = {};

    if (!name.trim()) {
      errors.name = "Name is required";
    }

    if (!email.trim()) {
      errors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = "Email is invalid";
    }

    const passwordError = validatePassword(password);
    if (passwordError) {
      errors.password = passwordError;
    }

    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }

    await register({ name, email, password });
  };

  return {
    name,
    email,
    password,
    showPassword,
    validationErrors,
    isLoading,
    error,
    setName,
    setEmail,
    setPassword: handlePasswordChange,
    setShowPassword,
    handleSubmit,
    clearError,
  };
}
