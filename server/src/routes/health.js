const express = require("express");
const router = express.Router();

router.get("/health", (req, res) => {
  res.json({
    success: true,
    message: "Received health check",
  });
});

router.get("/echo", (req, res) => {
  res.json({
    success: true,
    message: "Echo received",
  });
});

module.exports = router;
