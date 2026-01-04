import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
}

export function Button({
  children,
  onClick,
  className = "",
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`border cursor-pointer rounded-full border-gray-300  text-xs px-4 py-2 flex items-center gap-2 whitespace-nowrap ${className}`}
    >
      {children}
    </button>
  );
}

