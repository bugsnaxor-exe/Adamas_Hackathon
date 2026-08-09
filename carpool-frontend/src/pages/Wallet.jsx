import React, { useEffect, useState } from "react";
import { walletAPI } from "../api/wallet.api";
import Card from "../components/common/Card";
import Input from "../components/common/Input";
import Button from "../components/common/Button";

export default function Wallet() {
    const [wallet, setWallet] = useState({ balance: 0 });
    const [amount, setAmount] = useState(100);
    const [paymentMethod, setPaymentMethod] = useState("UPI");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const fetchWallet = async () => {
        try {
            const res = await walletAPI.getWallet();

            // Axios stores the backend JSON response inside `res.data`
            const responseBody = res.data;

            console.log("Backend Response (User Document):", responseBody);

            // Since it's in the User schema, we check where the user object lives.
            // It might be nested inside responseBody.user, responseBody.data, or it might be the responseBody itself.
            const userDocument =
                responseBody.user || responseBody.data || responseBody;

            // Extract the 'wallet' field directly from the User document
            const currentBalance = userDocument.balance || 0;

            setWallet({ balance: Number(currentBalance) });
        } catch (err) {
            console.error("Failed to fetch wallet balance:", err);
        }
    };

    useEffect(() => {
        fetchWallet();
    }, []);

    const recharge = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const payload = {
                amount: Number(amount),
                paymentMethod: paymentMethod,
                gatewayTransactionId: `txn_mock_${Date.now()}`,
            };

            await walletAPI.recharge(payload);

            // Fetch the updated balance and await it so the UI instantly updates
            await fetchWallet();

            setAmount(100);
        } catch (error) {
            console.error("Recharge failed:", error);

            let backendMessage = "Recharge failed.";
            if (
                error.response?.data?.errors &&
                error.response.data.errors.length > 0
            ) {
                backendMessage =
                    error.response.data.errors[0].message ||
                    error.response.data.errors[0];
            } else if (error.response?.data?.message) {
                backendMessage = error.response.data.message;
            } else {
                backendMessage = error.message;
            }

            setError(backendMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-6 max-w-2xl mx-auto p-4">
            <div className="bg-indigo-600 rounded-2xl p-6 text-white text-center shadow-md">
                <p className="text-sm uppercase tracking-wide opacity-80">
                    Available Balance
                </p>
                <h2 className="text-5xl font-bold mt-2">
                    ₹{wallet.balance || 0}
                </h2>
            </div>

            <Card>
                <Card.Header>
                    <Card.Title>Recharge Wallet</Card.Title>
                </Card.Header>
                <Card.Content>
                    {error && (
                        <div className="bg-rose-50 border border-rose-200 text-rose-600 p-3 rounded-lg text-sm mb-4">
                            {error}
                        </div>
                    )}

                    <form onSubmit={recharge} className="flex flex-col gap-4">
                        <div className="flex flex-col sm:flex-row gap-4 items-end">
                            <div className="w-full">
                                <Input
                                    label="Amount (₹)"
                                    type="number"
                                    min="1"
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="w-full">
                                <label className="block text-xs font-semibold text-slate-600 uppercase mb-1.5">
                                    Payment Method
                                </label>
                                <select
                                    className="w-full px-3 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-100 focus:border-indigo-600 outline-none"
                                    value={paymentMethod}
                                    onChange={(e) =>
                                        setPaymentMethod(e.target.value)
                                    }
                                    required
                                >
                                    <option value="UPI">UPI</option>
                                    <option value="Card">
                                        Credit/Debit Card
                                    </option>
                                    <option value="Razorpay">Razorpay</option>
                                </select>
                            </div>

                            <Button
                                type="submit"
                                isLoading={loading}
                                className="w-full sm:w-auto mb-[2px]"
                            >
                                Add Money
                            </Button>
                        </div>
                    </form>
                </Card.Content>
            </Card>
        </div>
    );
}
