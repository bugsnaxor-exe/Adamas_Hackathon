import React from "react";

export default function StatusBadge({ status, className = "" }) {
    // Normalize the status string to handle case variations safely
    const normalizedStatus = (status || "").toLowerCase();

    // Define color mappings for different status types
    const getBadgeStyles = () => {
        switch (normalizedStatus) {
            // Success States
            case "completed":
            case "success":
            case "active":
                return "bg-emerald-100 text-emerald-800 border-emerald-200";

            // Warning/Pending States
            case "pending":
            case "booked":
            case "waiting":
                return "bg-amber-100 text-amber-800 border-amber-200";

            // Danger/Error States
            case "cancelled":
            case "failed":
            case "error":
                return "bg-rose-100 text-rose-800 border-rose-200";

            // Info/In-Progress States
            case "ongoing":
            case "in progress":
            case "started":
                return "bg-blue-100 text-blue-800 border-blue-200";

            // Default Fallback
            default:
                return "bg-slate-100 text-slate-800 border-slate-200";
        }
    };

    return (
        <span
            className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border ${getBadgeStyles()} ${className}`}
        >
            {/* Capitalize the first letter for display, or show 'Unknown' if empty */}
            {status
                ? status.charAt(0).toUpperCase() + status.slice(1)
                : "Unknown"}
        </span>
    );
}
