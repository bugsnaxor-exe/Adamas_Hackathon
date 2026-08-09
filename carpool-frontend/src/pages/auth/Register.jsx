import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { authAPI } from "../../api/auth.api";
import Input from "../../components/common/Input";
import Button from "../../components/common/Button";
import Card from "../../components/common/Card";
import { User, Mail, Lock, Phone } from "lucide-react";

export default function Registration() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        phone: "",
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleRegister = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        try {
            const res = await authAPI.register(formData);
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
            // Axios error handling returns the message from the backend
            setError(
                err.message ||
                    err.error ||
                    "Registration failed. Please check your inputs.",
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
            <Card className="w-full max-w-md p-6">
                <h2 className="text-2xl font-bold text-slate-800 mb-6 text-center">
                    Create Account
                </h2>

                {error && (
                    <div className="bg-rose-50 border border-rose-200 text-rose-600 p-3 rounded-lg text-sm mb-4">
                        {error}
                    </div>
                )}

                <form onSubmit={handleRegister} className="space-y-4">
                    <Input
                        label="Full Name"
                        icon={User}
                        value={formData.name}
                        onChange={(e) =>
                            setFormData({ ...formData, name: e.target.value })
                        }
                        required
                        minLength={2}
                    />
                    <Input
                        label="Email Address"
                        type="email"
                        icon={Mail}
                        value={formData.email}
                        onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                        }
                        required
                    />
                    <Input
                        label="Password"
                        type="password"
                        icon={Lock}
                        value={formData.password}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                password: e.target.value,
                            })
                        }
                        required
                        minLength={6}
                    />
                    <Input
                        label="Phone Number"
                        type="tel"
                        icon={Phone}
                        value={formData.phone}
                        onChange={(e) =>
                            setFormData({ ...formData, phone: e.target.value })
                        }
                        required
                        minLength={10}
                        placeholder="10-digit mobile number"
                    />
                    <Button
                        type="submit"
                        className="w-full mt-2"
                        isLoading={loading}
                    >
                        Register
                    </Button>
                </form>

                <p className="text-center text-sm mt-5 text-slate-600">
                    Already have an account?{" "}
                    <Link
                        to="/login"
                        className="text-indigo-600 font-semibold hover:underline"
                    >
                        Sign In
                    </Link>
                </p>
            </Card>
        </div>
    );
}
