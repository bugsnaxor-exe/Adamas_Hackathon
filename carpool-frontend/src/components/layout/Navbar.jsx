import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Car, Wallet, LogOut, Menu } from "lucide-react";
import Button from "../common/Button";

export default function Navbar({ onMenuClick }) {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <header className="bg-white border-b border-slate-200 sticky top-0 z-40">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                {/* Left: Branding & Mobile Menu Toggle */}
                <div className="flex items-center gap-3">
                    <button
                        onClick={onMenuClick}
                        className="p-2 -ml-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-lg lg:hidden transition"
                        aria-label="Toggle Menu"
                    >
                        <Menu className="w-5 h-5" />
                    </button>

                    <Link
                        to="/"
                        className="flex items-center gap-2 text-indigo-600 font-extrabold text-xl tracking-tight"
                    >
                        <Car className="w-7 h-7" />
                        <span className="hidden sm:block">CommuteShare</span>
                    </Link>
                </div>

                {/* Right: User Actions */}
                {user && (
                    <div className="flex items-center gap-4 sm:gap-6">
                        {/* Wallet Quick Link */}
                        <Link
                            to="/wallet"
                            className="hidden sm:flex items-center gap-2 bg-indigo-50 text-indigo-700 px-3 py-1.5 rounded-lg text-sm font-semibold hover:bg-indigo-100 transition"
                        >
                            <Wallet className="w-4 h-4" />
                            <span>Wallet</span>
                        </Link>

                        {/* Profile & Logout */}
                        <div className="flex items-center gap-3 pl-4 sm:pl-6 border-l border-slate-200">
                            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-indigo-600 to-indigo-400 text-white flex items-center justify-center font-bold text-sm shadow-sm">
                                {user?.name
                                    ? user.name.charAt(0).toUpperCase()
                                    : "U"}
                            </div>
                            <div className="hidden md:block">
                                <p className="text-sm font-bold text-slate-800 leading-tight">
                                    {user?.name || "Employee"}
                                </p>
                                <p className="text-xs text-slate-500 font-medium">
                                    {user?.email}
                                </p>
                            </div>

                            <button
                                onClick={handleLogout}
                                className="text-slate-400 hover:text-rose-600 p-2 rounded-lg hover:bg-rose-50 transition ml-2"
                                title="Logout"
                            >
                                <LogOut className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </header>
    );
}
