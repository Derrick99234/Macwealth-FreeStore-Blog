export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-surface-bright flex items-center justify-center p-md">
      <div className="w-full max-w-sm">{children}</div>
    </div>
  );
}
