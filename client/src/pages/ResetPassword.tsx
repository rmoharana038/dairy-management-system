import { useState } from "react";
import { Link } from "wouter";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import AuthLayout from "@/components/AuthLayout";
import LoadingSpinner from "@/components/LoadingSpinner";

export default function ResetPassword() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      await sendPasswordResetEmail(auth, email);
      setSuccess(true);
    } catch (err: any) {
      setError(err.message || "Password reset failed");
    } finally {
      setIsLoading(false);
    }
  };

  if (success) {
    return (
      <AuthLayout title="Check your email">
        <div className="text-center">
          <p className="text-sm text-gray-600 mb-4">
            We've sent a password reset link to {email}
          </p>
          <Link href="/login" className="text-primary hover:text-blue-700">
            Back to login
          </Link>
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout title="Reset your password">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <Label htmlFor="email">Email address</Label>
          <Input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1"
          />
        </div>

        {error && (
          <div className="text-red-600 text-sm">{error}</div>
        )}

        <div>
          <Button
            type="submit"
            className="w-full bg-primary hover:bg-blue-700"
            disabled={isLoading}
          >
            {isLoading ? <LoadingSpinner size="sm" className="mr-2" /> : null}
            Send reset email
          </Button>
        </div>

        <div className="text-center">
          <Link href="/login" className="text-sm text-primary hover:text-blue-700">
            Back to login
          </Link>
        </div>
      </form>
    </AuthLayout>
  );
}
