import React, { createContext, useContext, useState } from "react";

// Create the context
const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    // Initialize state from localStorage to persist sessions across browser reloads
    const [user, setUser] = useState(() => {
        try {
            const storedUser = localStorage.getItem("user");
            return storedUser ? JSON.parse(storedUser) : null;
        } catch (error) {
            console.error("Failed to parse user from localStorage", error);
            return null;
        }
    });

    const [token, setToken] = useState(() => {
        return localStorage.getItem("token") || null;
    });

    // Call this function when the user successfully logs in or registers
    const login = (userData, authToken) => {
        setUser(userData);
        setToken(authToken);

        // Save to localStorage so the Axios Interceptor can attach it to future requests
        localStorage.setItem("user", JSON.stringify(userData));
        localStorage.setItem("token", authToken);
    };

    // Call this function to log the user out
    const logout = () => {
        setUser(null);
        setToken(null);

        // Clear local storage
        localStorage.removeItem("user");
        localStorage.removeItem("token");
    };

    // The context value that will be supplied to any descendants of this component
    const value = {
        user,
        token,
        login,
        logout,
        isAuthenticated: !!token, // Returns true if a token exists
    };

    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
};

// Custom hook to easily consume the AuthContext in any component
export const useAuth = () => {
    const context = useContext(AuthContext);

    if (context === null) {
        throw new Error("useAuth must be used within an AuthProvider");
    }

    return context;
};
