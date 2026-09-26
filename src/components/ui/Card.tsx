import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export function Card({ children, className = "", hover = true }: CardProps) {
  return (
    <div
      className={`bg-surface-container-lowest border border-outline-variant rounded-xl p-md ${hover ? "hover:shadow-[0px_10px_15px_-3px_rgba(15,23,42,0.08)] transition-all duration-300" : ""} ${className}`}
    >
      {children}
    </div>
  );
}
