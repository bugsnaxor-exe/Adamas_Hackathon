import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { authAPI } from "../../api/auth.api";
import Input from "../../components/common/Input";
import Button from "../../components/common/Button";
import Card from "../../components/common/Card";
import { Mail, Lock, Car } from "lucide-react";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        try {
            const res = await authAPI.loginEmail({ email, password });
            login(
                {
                    _id: res._id,
                    name: res.name,
                    email: res.email, // if your backend also returns email
                },
                res.token,
            );
            navigate("/");
        } catch (err) {
            setError(err.message || err.error || "Invalid email or password");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
            <Card className="w-full max-w-md p-6">
                <div className="flex flex-col items-center mb-6">
                    <div className="p-3 bg-indigo-100 rounded-full mb-3">
                        <Car className="w-8 h-8 text-indigo-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-slate-800">
                        Welcome Back
                    </h2>
                    <p className="text-sm text-slate-500">
                        Sign in to your employee account
                    </p>
                </div>

                {error && (
                    <div className="bg-rose-50 border border-rose-200 text-rose-600 p-3 rounded-lg text-sm mb-4">
                        {error}
                    </div>
                )}

                <form onSubmit={handleLogin} className="space-y-4">
                    <Input
                        label="Email Address"
                        type="email"
                        icon={Mail}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <Input
                        label="Password"
                        type="password"
                        icon={Lock}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <Button
                        type="submit"
                        className="w-full mt-2"
                        isLoading={loading}
                    >
                        Sign In
                    </Button>
                </form>

                <p className="text-center text-sm mt-5 text-slate-600">
                    New here?{" "}
                    <Link
                        to="/register"
                        className="text-indigo-600 font-semibold hover:underline"
                    >
                        Register
                    </Link>
                </p>
            </Card>
        </div>
    );
}
