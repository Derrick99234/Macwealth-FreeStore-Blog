"use client";

import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

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
    if (password !== confirm) { setError("Passwords do not match"); return; }
    if (password.length < 6) { setError("Password must be at least 6 characters"); return; }
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
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  if (done) {
    return (
      <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-md shadow-lg text-center">
        <h1 className="text-display-lg-mobile text-primary font-display-lg mb-md">Password Reset</h1>
        <p className="text-on-surface-variant text-meta-data font-meta-data mb-md">Your password has been reset successfully.</p>
        <a href="/auth/signin" className="bg-primary text-on-primary font-ui-button text-ui-button px-lg py-sm rounded-lg inline-block hover:opacity-90">Sign In</a>
      </div>
    );
  }

  return (
    <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-md shadow-lg">
      <div className="text-center mb-lg">
        <h1 className="text-display-lg-mobile text-primary font-display-lg">Set New Password</h1>
        <p className="text-on-surface-variant text-meta-data font-meta-data mt-xs">Enter your new password below.</p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-md">
        {error && <div className="bg-error-container text-error text-ui-label font-ui-label px-md py-sm rounded-lg">{error}</div>}
        <div>
          <label className="block text-ui-label text-on-surface-variant font-ui-label mb-xs">New Password</label>
          <input className="w-full px-md py-sm bg-surface-container border border-outline-variant rounded-lg font-ui-label text-ui-label focus:outline-none focus:ring-2 focus:ring-primary/50" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <div>
          <label className="block text-ui-label text-on-surface-variant font-ui-label mb-xs">Confirm Password</label>
          <input className="w-full px-md py-sm bg-surface-container border border-outline-variant rounded-lg font-ui-label text-ui-label focus:outline-none focus:ring-2 focus:ring-primary/50" type="password" value={confirm} onChange={(e) => setConfirm(e.target.value)} required />
        </div>
        <button type="submit" disabled={loading} className="w-full bg-primary text-on-primary font-ui-button text-ui-button py-sm rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50">
          {loading ? "Resetting..." : "Reset Password"}
        </button>
      </form>
    </div>
  );
}
