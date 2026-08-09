import React from "react";
import { NavLink } from "react-router-dom";
import {
    Search,
    PlusCircle,
    Map,
    CarFront,
    Wallet,
    BarChart3,
    X,
} from "lucide-react";

export default function Sidebar({ isMobileMenuOpen, closeMobileMenu }) {
    // Define navigation links based on the functional modules
    const navLinks = [
        { name: "Find a Ride", path: "/", icon: Search },
        { name: "Offer a Ride", path: "/offer", icon: PlusCircle },
        { name: "My Trips", path: "/my-trips", icon: Map },
        { name: "My Vehicles", path: "/vehicles", icon: CarFront },
        { name: "Wallet & Payments", path: "/wallet", icon: Wallet },
        { name: "Reports & Analytics", path: "/analytics", icon: BarChart3 },
    ];

    return (
        <>
            {/* Mobile Backdrop Overlay */}
            {isMobileMenuOpen && (
                <div
                    className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-40 lg:hidden"
                    onClick={closeMobileMenu}
                />
            )}

            {/* Sidebar Container */}
            <aside
                className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-slate-200 transform transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0 lg:w-60 lg:bg-transparent lg:border-none lg:z-0
        ${isMobileMenuOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full"}
      `}
            >
                <div className="h-full flex flex-col pt-5 pb-4 overflow-y-auto lg:pt-0">
                    {/* Mobile Close Button */}
                    <div className="flex items-center justify-between px-4 mb-4 lg:hidden">
                        <span className="font-bold text-slate-800 text-lg">
                            Menu
                        </span>
                        <button
                            onClick={closeMobileMenu}
                            className="p-2 text-slate-500 hover:text-slate-800 rounded-lg bg-slate-100"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Navigation Links */}
                    <nav className="px-3 space-y-1">
                        {navLinks.map((item) => {
                            const Icon = item.icon;
                            return (
                                <NavLink
                                    key={item.name}
                                    to={item.path}
                                    onClick={closeMobileMenu} // Auto-close on mobile when a link is clicked
                                    className={({ isActive }) => `
                    flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200
                    ${
                        isActive
                            ? "bg-indigo-600 text-white shadow-sm"
                            : "text-slate-600 hover:bg-white hover:text-indigo-600 lg:hover:bg-slate-200 lg:hover:bg-opacity-50"
                    }
                  `}
                                >
                                    <Icon className={`w-5 h-5 flex-shrink-0`} />
                                    {item.name}
                                </NavLink>
                            );
                        })}
                    </nav>
                </div>
            </aside>
        </>
    );
}
