"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";

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

    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (res?.error) {
        setError("Invalid email or password. Please try again.");
        setLoading(false);
      } else {
        router.push("/admin");
        router.refresh();
      }
    } catch {
      setError("An unexpected error occurred. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#121620]/90 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-white tracking-tight">Welcome Back</h1>
        <p className="text-slate-400 text-sm mt-1.5">Sign in to your account to continue</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm px-4 py-3 rounded-xl">
            {error}
          </div>
        )}

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
            Email Address
          </label>
          <input
            className="w-full px-4 py-3 bg-[#0a0c10] border border-white/10 rounded-xl text-white placeholder-slate-500 text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300">
              Password
            </label>
            <Link
              href="/auth/forgot-password"
              className="text-xs text-indigo-400 hover:text-indigo-300 transition-colors"
            >
              Forgot password?
            </Link>
          </div>
          <input
            className="w-full px-4 py-3 bg-[#0a0c10] border border-white/10 rounded-xl text-white placeholder-slate-500 text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-medium py-3 rounded-xl transition-all shadow-lg shadow-indigo-600/20 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        >
          {loading ? "Signing in..." : "Sign In"}
        </button>

        <div className="text-center pt-2 text-sm text-slate-400">
          Don't have an account?{" "}
          <Link href="/auth/signup" className="text-indigo-400 hover:text-indigo-300 font-medium transition-colors">
            Create account
          </Link>
        </div>
      </form>
    </div>
  );
}
