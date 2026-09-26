"use client";

import { useState } from "react";

interface NewsletterFormProps {
  variant?: "banner" | "footer";
}

export function NewsletterForm({ variant = "banner" }: NewsletterFormProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      setStatus("error");
      setMessage("Please enter a valid email address.");
      return;
    }

    setStatus("loading");
    setMessage("");

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.toLowerCase().trim() }),
      });
      const data = await res.json();

      if (res.ok) {
        setStatus("success");
        setMessage(data.message || "Thank you for subscribing!");
        setEmail("");
      } else {
        setStatus("error");
        setMessage(data.error || "Subscription failed. Please try again.");
      }
    } catch {
      setStatus("error");
      setMessage("Network error. Please try again later.");
    }
  };

  if (variant === "footer") {
    return (
      <div className="w-full">
        {status === "success" ? (
          <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs flex items-center gap-2">
            <span className="material-symbols-outlined text-sm">check_circle</span>
            <span>{message}</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex gap-2 w-full">
            <input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (status === "error") setStatus("idle");
              }}
              required
              disabled={status === "loading"}
              className="flex-1 min-w-0 w-full px-3 py-2 bg-[#10141e] border border-white/[0.08] rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-all"
            />
            <button
              type="submit"
              disabled={status === "loading"}
              className="bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white px-4 py-2 rounded-xl text-xs font-medium transition-all shrink-0 cursor-pointer shadow-md shadow-indigo-600/20 whitespace-nowrap"
            >
              {status === "loading" ? "..." : "Join"}
            </button>
          </form>
        )}
        {status === "error" && (
          <p className="text-[11px] text-red-400 mt-1.5">{message}</p>
        )}
      </div>
    );
  }

  // Default "banner" variant - Generous, full-width styling
  return (
    <div className="w-full max-w-xl mx-auto">
      {status === "success" ? (
        <div className="p-4 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-sm flex items-center justify-center gap-2 text-center animate-in fade-in">
          <span className="material-symbols-outlined text-base">check_circle</span>
          <span>{message}</span>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 pt-2 w-full">
          <input
            type="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (status === "error") setStatus("idle");
            }}
            required
            disabled={status === "loading"}
            className="flex-1 min-w-0 sm:min-w-[320px] w-full px-5 py-3.5 bg-[#0a0c10] border border-white/15 rounded-xl text-white placeholder-slate-500 text-sm focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30 transition-all shadow-inner"
          />
          <button
            type="submit"
            disabled={status === "loading"}
            className="bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-medium px-8 py-3.5 rounded-xl text-sm transition-all shadow-lg shadow-indigo-600/25 shrink-0 cursor-pointer active:scale-95 whitespace-nowrap"
          >
            {status === "loading" ? "Subscribing..." : "Subscribe Now"}
          </button>
        </form>
      )}
      {status === "error" && (
        <p className="text-xs text-red-400 mt-2 text-center">{message}</p>
      )}
      <p className="text-[11px] text-slate-500 text-center mt-3">
        No spam. Unsubscribe anytime with a single click.
      </p>
    </div>
  );
}
