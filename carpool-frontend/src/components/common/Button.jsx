import React from "react";
import { Loader2 } from "lucide-react";

export default function Button({
    children,
    type = "button",
    variant = "primary",
    size = "md",
    isLoading = false,
    disabled = false,
    className = "",
    onClick,
    ...props
}) {
    // Base styles applied to all button variants
    const baseStyles =
        "inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

    // Tailwind classes for different button visual styles
    const variants = {
        primary:
            "bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm focus:ring-indigo-600",
        secondary:
            "bg-slate-100 hover:bg-slate-200 text-slate-700 focus:ring-slate-500",
        outline:
            "border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-50 focus:ring-indigo-600",
        danger: "bg-rose-600 hover:bg-rose-700 text-white shadow-sm focus:ring-rose-600",
        ghost: "bg-transparent hover:bg-slate-100 text-slate-700 focus:ring-slate-500",
    };

    // Tailwind classes for different button sizes
    const sizes = {
        sm: "px-3 py-1.5 text-xs",
        md: "px-4 py-2.5 text-sm",
        lg: "px-6 py-3 text-base",
    };

    // Compile final class string
    const classes = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`;

    return (
        <button
            type={type}
            className={classes}
            onClick={onClick}
            disabled={disabled || isLoading}
            {...props}
        >
            {isLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
            {children}
        </button>
    );
}
