"use client";

import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";

export default function ResetPasswordPage() {
  const params = useParams();
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirm) {
      setError("Passwords do not match");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: params.token, password }),
      });
      const data = await res.json();
      if (res.ok) {
        setDone(true);
      } else {
        setError(data.error || "Reset failed");
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (done) {
    return (
      <div className="bg-[#121620]/90 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl text-center">
        <h1 className="text-2xl font-bold text-white mb-2">Password Reset Successful</h1>
        <p className="text-slate-400 text-sm mb-6">
          Your password has been reset. You can now sign in with your new password.
        </p>
        <Link
          href="/auth/signin"
          className="bg-indigo-600 hover:bg-indigo-500 text-white font-medium px-6 py-3 rounded-xl inline-block transition-all"
        >
          Proceed to Sign In
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-[#121620]/90 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-white tracking-tight">Set New Password</h1>
        <p className="text-slate-400 text-sm mt-1.5">Enter your new secure password below</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm px-4 py-3 rounded-xl">
            {error}
          </div>
        )}

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
            New Password
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
            placeholder="Repeat new password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full mt-2 bg-indigo-600 hover:bg-indigo-500 text-white font-medium py-3 rounded-xl transition-all shadow-lg shadow-indigo-600/20 disabled:opacity-50 cursor-pointer"
        >
          {loading ? "Resetting..." : "Update Password"}
        </button>
      </form>
    </div>
  );
}
