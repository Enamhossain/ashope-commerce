const express = require('express');
const { processPayment, getPaymentStatus } = require('../controllers/paymentController');

const router = express.Router();

// Controller functions (you need to implement these)

// Route to process a payment
router.post('/process', processPayment);

// Route to get payment status
router.get('/status/:paymentId', getPaymentStatus);

module.exports = router;