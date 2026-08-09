import React, { useEffect } from "react";
import { X } from "lucide-react";

export default function Modal({
    isOpen,
    onClose,
    title,
    children,
    maxWidth = "max-w-md",
}) {
    // Handle Escape key press to close the modal
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === "Escape" && isOpen) {
                onClose();
            }
        };

        // Prevent background scrolling when modal is open
        if (isOpen) {
            document.body.style.overflow = "hidden";
            document.addEventListener("keydown", handleKeyDown);
        } else {
            document.body.style.overflow = "unset";
        }

        return () => {
            document.body.style.overflow = "unset";
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [isOpen, onClose]);

    // If the modal is not open, render nothing
    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm transition-opacity"
            onClick={onClose} // Clicking the backdrop closes the modal
        >
            <div
                className={`bg-white rounded-2xl shadow-xl w-full ${maxWidth} flex flex-col max-h-[90vh] overflow-hidden animate-in fade-in zoom-in-95 duration-200`}
                onClick={(e) => e.stopPropagation()} // Prevent clicks inside the modal from closing it
            >
                {/* Modal Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
                    <h2 className="text-lg font-bold text-slate-800">
                        {title}
                    </h2>
                    <button
                        onClick={onClose}
                        className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                        aria-label="Close modal"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Modal Content (Scrollable if too tall) */}
                <div className="px-6 py-4 overflow-y-auto">{children}</div>
            </div>
        </div>
    );
}
