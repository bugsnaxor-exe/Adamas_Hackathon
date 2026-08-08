const express = require('express');
const router = express.Router();

const { 
  getWalletDetails, 
  rechargeWallet, 
  payForTrip, 
  getTransactionHistory 
} = require('./wallet.controller');

// GET /api/wallet/:userId -> Get current balance and 10 recent transactions
router.get('/:userId', getWalletDetails);

// POST /api/wallet/recharge -> Add money to wallet
router.post('/recharge', rechargeWallet);

// POST /api/wallet/pay -> Pay for a trip using wallet balance
router.post('/pay', payForTrip);

// GET /api/wallet/:userId/history -> Get complete transaction ledger
router.get('/:userId/history', getTransactionHistory);

module.exports = router;