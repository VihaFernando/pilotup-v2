import Link from "next/link";
import { ReactNode } from "react";

type GlassButtonProps = {
  href: string;
  children: ReactNode;
  className?: string;
};

export function GlassButton({ href, children, className = "" }: GlassButtonProps) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center justify-center rounded-xl bg-brand-primaryAccent px-4 py-2 text-brand-buttonText font-medium ${className}`}
    >
      {children}
    </Link>
  );
}
