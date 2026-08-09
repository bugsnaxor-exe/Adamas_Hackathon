import axiosClient from "./axiosClient";

export const walletAPI = {
    // GET: /api/wallet/me (Get current balance and 10 recent transactions)
    getWallet: () => axiosClient.get("/wallet/me"),

    // POST: /api/wallet/recharge (Add money to wallet)
    // CORRECTED: Passes the data object directly to the backend
    recharge: (data) => axiosClient.post("/wallet/recharge", data),

    // POST: /api/wallet/pay (Pay for a trip using wallet balance)
    payForTrip: (data) => axiosClient.post("/wallet/pay", data),

    // GET: /api/wallet/history (Get complete transaction ledger)
    getHistory: (params) => axiosClient.get("/wallet/history", { params }),
};
