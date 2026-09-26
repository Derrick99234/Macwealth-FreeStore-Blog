import { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: Variant;
}

const variantStyles: Record<Variant, string> = {
  primary:
    "bg-primary text-on-primary hover:opacity-90 shadow-sm active:scale-95",
  secondary:
    "text-primary border border-outline-variant hover:bg-surface-container-high active:scale-95",
  ghost:
    "text-primary hover:bg-primary/5 active:opacity-80",
};

export function Button({
  children,
  variant = "primary",
  className = "",
  ...props
}: ButtonProps) {
  return (
    <button
      className={`font-ui-button text-ui-button px-md py-xs rounded-lg transition-all cursor-pointer ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
