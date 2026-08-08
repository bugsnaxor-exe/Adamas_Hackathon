const express = require("express");
const router = express.Router();
const protect = require("../../middlewares/auth").protect;

const {
    getWalletDetails,
    rechargeWallet,
    payForTrip,
    getTransactionHistory,
} = require("./wallet.controller");

const {
    rechargeWalletSchema,
    payForTripSchema,
    historyQuerySchema,
} = require("./transaction.validate");

const {
    validateRequest,
    validateQuery,
} = require("../../middlewares/validateRequest");

router.use(protect);

// GET /api/wallet/:userId -> Get current balance and 10 recent transactions
router.get("/me", getWalletDetails);

// POST /api/wallet/recharge -> Add money to wallet
router.post("/recharge", validateRequest(rechargeWalletSchema), rechargeWallet);

// POST /api/wallet/pay -> Pay for a trip using wallet balance
router.post("/pay", validateRequest(payForTripSchema), payForTrip);

// GET /api/wallet/history -> Get complete transaction ledger
router.get(
    "/history",
    validateQuery(historyQuerySchema),
    getTransactionHistory,
);

module.exports = router;
