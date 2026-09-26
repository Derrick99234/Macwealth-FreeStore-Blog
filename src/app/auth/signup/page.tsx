"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";

export default function SignUpPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Failed to create account");
        setLoading(false);
        return;
      }

      // Automatically sign in upon successful registration
      const loginRes = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (loginRes?.error) {
        router.push("/auth/signin");
      } else {
        router.push("/");
        router.refresh();
      }
    } catch {
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#121620]/90 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-white tracking-tight">Create an Account</h1>
        <p className="text-slate-400 text-sm mt-1.5">Join Macwealth FreeStore to read and write</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm px-4 py-3 rounded-xl">
            {error}
          </div>
        )}

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
            Full Name
          </label>
          <input
            className="w-full px-4 py-3 bg-[#0a0c10] border border-white/10 rounded-xl text-white placeholder-slate-500 text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
            type="text"
            placeholder="Jane Doe"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

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
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
            Password
          </label>
          <input
            className="w-full px-4 py-3 bg-[#0a0c10] border border-white/10 rounded-xl text-white placeholder-slate-500 text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
            type="password"
            placeholder="At least 6 characters"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
            Confirm Password
          </label>
          <input
            className="w-full px-4 py-3 bg-[#0a0c10] border border-white/10 rounded-xl text-white placeholder-slate-500 text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
            type="password"
            placeholder="Repeat password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full mt-2 bg-indigo-600 hover:bg-indigo-500 text-white font-medium py-3 rounded-xl transition-all shadow-lg shadow-indigo-600/20 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        >
          {loading ? "Creating account..." : "Sign Up"}
        </button>

        <div className="text-center pt-2 text-sm text-slate-400">
          Already have an account?{" "}
          <Link href="/auth/signin" className="text-indigo-400 hover:text-indigo-300 font-medium transition-colors">
            Sign In
          </Link>
        </div>
      </form>
    </div>
  );
}
