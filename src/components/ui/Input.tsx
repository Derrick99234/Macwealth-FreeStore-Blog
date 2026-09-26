import { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  search?: boolean;
}

export function Input({ search, className = "", ...props }: InputProps) {
  return (
    <input
      className={`font-ui-label text-ui-label bg-surface-container border border-outline-variant rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all outline-none ${search ? "pl-xl pr-md py-sm" : "px-md py-sm"} ${className}`}
      {...props}
    />
  );
}
