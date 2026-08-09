import React, { useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

export default function Layout({ children }) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
            {/* Top Navigation Bar */}
            <Navbar
                onMenuClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            />

            <div className="flex-1 flex max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 gap-6">
                {/* Sidebar Navigation */}
                <Sidebar
                    isMobileMenuOpen={isMobileMenuOpen}
                    closeMobileMenu={() => setIsMobileMenuOpen(false)}
                />

                {/* Main Content Area */}
                <main className="flex-1 w-full max-w-full overflow-hidden">
                    {children}
                </main>
            </div>
        </div>
    );
}
