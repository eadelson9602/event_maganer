"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import { useRegisterForm } from "../hooks";
import ErrorAlert from "../components/ErrorAlert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function RegisterPage() {
  const {
    name,
    email,
    password,
    showPassword,
    validationErrors,
    isLoading,
    error,
    setName,
    setEmail,
    setPassword,
    setShowPassword,
    handleSubmit,
    clearError,
  } = useRegisterForm();

  // Clear error when component mounts or unmounts
  useEffect(() => {
    clearError();
    return () => {
      clearError();
    };
  }, [clearError]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 py-12">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-3xl text-center">Sign Up</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <ErrorAlert message={error || ""} onClose={clearError} />

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                />
                {validationErrors.name && (
                  <p className="text-sm text-destructive">
                    {validationErrors.name}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="user@example.com"
                />
                {validationErrors.email && (
                  <p className="text-sm text-destructive">
                    {validationErrors.email}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="new-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password123!"
                    className={`pr-10 ${
                      validationErrors.password
                        ? "border-destructive bg-destructive/10 focus-visible:ring-destructive"
                        : ""
                    }`}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <Eye className="h-4 w-4 text-muted-foreground" />
                    )}
                  </Button>
                </div>
                {validationErrors.password && (
                  <div className="rounded-md bg-destructive/10 border border-destructive/20 p-2">
                    <p className="text-sm font-medium text-destructive">
                      {validationErrors.password}
                    </p>
                  </div>
                )}
                {!validationErrors.password && (
                  <p className="text-xs text-muted-foreground">
                    Minimum 8 characters, one uppercase, one number and one
                    special character (@$!%*?&)
                  </p>
                )}
              </div>
            </div>

            <Button
              type="submit"
              className="w-full"
              variant={"outline"}
              disabled={isLoading}
            >
              {isLoading ? "Registering..." : "Sign Up"}
            </Button>

            <div className="text-center text-sm">
              <Link href="/login" className="text-primary hover:underline">
                Already have an account? Sign in
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
