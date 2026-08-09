import React, { forwardRef } from "react";

const Input = forwardRef(
    (
        {
            label,
            error,
            icon: Icon,
            type = "text",
            className = "",
            id,
            ...props
        },
        ref,
    ) => {
        // Generate a unique ID if one isn't provided, useful for linking the label to the input
        const inputId = id || React.useId();

        return (
            <div className={`w-full ${className}`}>
                {/* Label */}
                {label && (
                    <label
                        htmlFor={inputId}
                        className="block text-xs font-semibold text-slate-600 uppercase mb-1.5 tracking-wide"
                    >
                        {label}
                    </label>
                )}

                {/* Input Wrapper */}
                <div className="relative">
                    {/* Optional Icon */}
                    {Icon && (
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                            <Icon className="w-5 h-5" />
                        </div>
                    )}

                    {/* Input Field */}
                    <input
                        ref={ref}
                        id={inputId}
                        type={type}
                        className={`
            w-full px-4 py-2.5 rounded-xl text-sm transition-all duration-200 bg-white border outline-none shadow-sm
            ${Icon ? "pl-10" : ""}
            ${
                error
                    ? "border-rose-500 focus:ring-2 focus:ring-rose-100 focus:border-rose-500 text-rose-900 placeholder-rose-300"
                    : "border-slate-200 focus:ring-2 focus:ring-indigo-100 focus:border-indigo-600 text-slate-900 placeholder-slate-400 hover:border-slate-300"
            }
            disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:cursor-not-allowed
          `}
                        {...props}
                    />
                </div>

                {/* Error Message */}
                {error && (
                    <p className="mt-1.5 text-xs text-rose-600 font-medium">
                        {error}
                    </p>
                )}
            </div>
        );
    },
);

// Setting displayName is recommended when using forwardRef
Input.displayName = "Input";

export default Input;
