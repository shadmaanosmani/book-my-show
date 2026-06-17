const express = require("express");
const { createPayment, verifyPayment, createCheckoutSession } = require("../controllers/payments");

const router = express.Router();

router.post("/", createPayment);
router.post("/checkout-session", createCheckoutSession);
router.get("/verify", verifyPayment);

module.exports = router;
