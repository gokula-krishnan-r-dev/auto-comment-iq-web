import { cn } from "@/lib/utils";
import React, { ButtonHTMLAttributes, ReactNode } from "react";

interface CircleButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  className?: string;
}

const CircleButton: React.FC<CircleButtonProps> = ({
  children,
  className,
  ...buttonProps
}) => {
  return (
    <button
      className={cn(
        "px-4 bg-white hover:bg-gray-100 py-4 border rounded-full",
        className
      )}
      {...buttonProps}
    >
      {children}
    </button>
  );
};

export default CircleButton;
