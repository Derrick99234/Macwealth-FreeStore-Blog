"use client";

import { useState } from "react";
import Link from "next/link";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (res.ok) {
        setMessage({ type: "success", text: data.message || "Reset link has been prepared!" });
      } else {
        setMessage({ type: "error", text: data.error || "Something went wrong" });
      }
    } catch {
      setMessage({ type: "error", text: "Something went wrong. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#121620]/90 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-white tracking-tight">Reset Password</h1>
        <p className="text-slate-400 text-sm mt-1.5">Enter your email to receive recovery instructions</p>
      </div>

      {message && (
        <div
          className={`mb-6 px-4 py-3 rounded-xl text-sm ${
            message.type === "success"
              ? "bg-emerald-500/10 border border-emerald-500/20 text-emerald-400"
              : "bg-red-500/10 border border-red-500/20 text-red-400"
          }`}
        >
          {message.text}
        </div>
      )}

      {message?.type !== "success" ? (
        <form onSubmit={handleSubmit} className="space-y-5">
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

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-medium py-3 rounded-xl transition-all shadow-lg shadow-indigo-600/20 disabled:opacity-50 cursor-pointer"
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>
      ) : null}

      <div className="text-center pt-6 text-sm text-slate-400">
        <Link href="/auth/signin" className="text-indigo-400 hover:text-indigo-300 font-medium transition-colors">
          Return to Sign In
        </Link>
      </div>
    </div>
  );
}
