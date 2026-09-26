type BadgeVariant = "published" | "draft" | "default" | "primary";

interface BadgeProps {
  children: string;
  variant?: BadgeVariant;
}

const variantStyles: Record<BadgeVariant, string> = {
  published: "bg-tertiary-fixed text-on-tertiary-fixed-variant",
  draft: "bg-secondary-container text-on-secondary-fixed-variant",
  default: "bg-surface-container text-on-surface-variant",
  primary: "bg-primary-fixed text-primary",
};

export function Badge({ children, variant = "default" }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center px-xs py-[2px] rounded-full font-meta-data text-meta-data ${variantStyles[variant]}`}
    >
      {children}
    </span>
  );
}
