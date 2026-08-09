import React from "react";

// Main Card Wrapper
export function Card({ children, className = "", ...props }) {
    return (
        <div
            className={`bg-white rounded-2xl shadow-sm border border-slate-200 ${className}`}
            {...props}
        >
            {children}
        </div>
    );
}

// Card Header Section
export function CardHeader({ children, className = "", ...props }) {
    return (
        <div
            className={`px-5 py-4 border-b border-slate-100 flex flex-col gap-1 ${className}`}
            {...props}
        >
            {children}
        </div>
    );
}

// Card Title Text
export function CardTitle({ children, className = "", ...props }) {
    return (
        <h3
            className={`text-lg font-bold text-slate-800 leading-none tracking-tight ${className}`}
            {...props}
        >
            {children}
        </h3>
    );
}

// Card Main Content Area
export function CardContent({ children, className = "", ...props }) {
    return (
        <div className={`p-5 ${className}`} {...props}>
            {children}
        </div>
    );
}

// Card Footer Section
export function CardFooter({ children, className = "", ...props }) {
    return (
        <div
            className={`px-5 py-4 border-t border-slate-100 bg-slate-50 rounded-b-2xl flex items-center ${className}`}
            {...props}
        >
            {children}
        </div>
    );
}

// Export as a compound component for clean imports (e.g., <Card.Header>)
export default Object.assign(Card, {
    Header: CardHeader,
    Title: CardTitle,
    Content: CardContent,
    Footer: CardFooter,
});
