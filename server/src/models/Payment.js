const mongoose = require("mongoose");
const crypto = require("crypto");

const paymentSchema = new mongoose.Schema(
  {
    txnId: {
      type: String,
      unique: true,
    },
    amount: {
      type: Number,
      min: 0,
    },
    bookingId: String,
    status: {
      type: String,
      enum: ["PENDING", "PAID", "CANCELLED"],
    },
    method: {
      type: String,
    },
  },
  { timestamps: true },
);

paymentSchema.pre("save", async function () {
  if (this.isNew) {
    this.txnId = "TXN" + crypto.randomBytes(16).toString("hex");
  }
});

const Payment = mongoose.model("Payment", paymentSchema);

module.exports = Payment;
