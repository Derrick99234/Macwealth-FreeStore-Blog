"use client";

import { useState } from "react";

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
        setMessage({ type: "success", text: data.message || "Reset link sent!" });
      } else {
        setMessage({ type: "error", text: data.error || "Something went wrong" });
      }
    } catch {
      setMessage({ type: "error", text: "Something went wrong" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-md shadow-lg">
      <div className="text-center mb-lg">
        <h1 className="text-display-lg-mobile text-primary font-display-lg">Reset Password</h1>
        <p className="text-on-surface-variant text-meta-data font-meta-data mt-xs">Enter your email to receive a reset link.</p>
      </div>
      {message && (
        <div className={`mb-md px-md py-sm rounded-lg font-ui-label text-ui-label ${
          message.type === "success" ? "bg-tertiary text-on-tertiary" : "bg-error-container text-error"
        }`}>
          {message.text}
        </div>
      )}
      {message?.type !== "success" && (
        <form onSubmit={handleSubmit} className="space-y-md">
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
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-on-primary font-ui-button text-ui-button py-sm rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
          <div className="text-center pt-xs">
            <a href="/auth/signin" className="text-primary text-meta-data font-meta-data hover:underline">
              Back to sign in
            </a>
          </div>
        </form>
      )}
    </div>
  );
}
