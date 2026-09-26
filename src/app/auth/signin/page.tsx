"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignInPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (res?.error) {
      setError("Invalid email or password");
      setLoading(false);
    } else {
      router.push("/admin");
    }
  };

  return (
    <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-md shadow-lg">
      <div className="text-center mb-lg">
        <h1 className="text-display-lg-mobile text-primary font-display-lg">Admin Sign In</h1>
        <p className="text-on-surface-variant text-meta-data font-meta-data mt-xs">Enter your credentials to continue.</p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-md">
        {error && (
          <div className="bg-error-container text-error text-ui-label font-ui-label px-md py-sm rounded-lg">{error}</div>
        )}
        <div>
          <label className="block text-ui-label text-on-surface-variant font-ui-label mb-xs">Email</label>
          <input
            className="w-full px-md py-sm bg-surface-container border border-outline-variant rounded-lg font-ui-label text-ui-label focus:outline-none focus:ring-2 focus:ring-primary/50"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block text-ui-label text-on-surface-variant font-ui-label mb-xs">Password</label>
          <input
            className="w-full px-md py-sm bg-surface-container border border-outline-variant rounded-lg font-ui-label text-ui-label focus:outline-none focus:ring-2 focus:ring-primary/50"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-primary text-on-primary font-ui-button text-ui-button py-sm rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          {loading ? "Signing in..." : "Sign In"}
        </button>
        <div className="text-center pt-xs">
          <a href="/auth/forgot-password" className="text-primary text-meta-data font-meta-data hover:underline">
            Forgot password?
          </a>
        </div>
      </form>
    </div>
  );
}
