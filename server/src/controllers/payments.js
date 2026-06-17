const Payment = require("../models/Payment");
const Booking = require("../models/Booking");
const ApiResponse = require("../core/ApiResponse");
const { BadRequest, NotFound } = require("../core/ApiError");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY || "STRIPE_SECRET_KEY");

const createPayment = async (req, res) => {
  const { amount, bookingId, method } = req.body;

  const payment = await Payment.create({
    amount,
    bookingId,
    method,
    status: "PENDING",
  });

  const paymentIntent = await stripe.paymentIntents.create({
    amount: amount * 100,
    currency: "inr",
    payment_method_types: ["card"],
    metadata: {
      bookingId,
      paymentId: payment._id.toString(),
    },
  });

  res.status(201).json(
    ApiResponse.build(
      true,
      {
        payment,
        clientSecret: paymentIntent.client_secret,
        paymentIntentId: paymentIntent.id,
      },
      "Payment created successfully",
    ),
  );
};

const createCheckoutSession = async (req, res) => {
  const { amount, bookingId, customerEmail } = req.body;

  if (!amount || !bookingId) {
    throw new BadRequest("Missing bookingId or amount");
  }

  const payment = await Payment.create({
    amount,
    bookingId,
    method: "card",
    status: "PENDING",
  });

  const successUrl = `${process.env.CLIENT_URL || "http://localhost:5173"}/payments/success?session_id={CHECKOUT_SESSION_ID}`;
  const cancelUrl = `${process.env.CLIENT_URL || "http://localhost:5173"}/payments/cancel`;

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "payment",
    line_items: [
      {
        price_data: {
          currency: "inr",
          product_data: {
            name: "Movie Booking Payment",
          },
          unit_amount: amount * 100,
        },
        quantity: 1,
      },
    ],
    success_url: successUrl,
    cancel_url: cancelUrl,
    metadata: {
      bookingId,
      paymentId: payment._id.toString(),
    },
    customer_email: customerEmail || undefined,
  });

  res.status(201).json(
    ApiResponse.build(
      true,
      {
        sessionUrl: session.url,
        sessionId: session.id,
      },
      "Checkout session created successfully",
    ),
  );
};

const verifyPayment = async (req, res) => {
  const { paymentIntentId, sessionId } = req.query;

  let paymentIntent = null;

  if (sessionId) {
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ["payment_intent"],
    });

    if (!session || !session.payment_intent) {
      throw new BadRequest("Invalid checkout session");
    }

    paymentIntent = session.payment_intent;
  } else if (paymentIntentId) {
    paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
  } else {
    throw new BadRequest("Missing paymentIntentId or sessionId");
  }

  if (!paymentIntent || !paymentIntent.metadata?.paymentId) {
    throw new BadRequest("Invalid Stripe payment intent");
  }

  const payment = await Payment.findById(paymentIntent.metadata.paymentId);
  if (!payment) {
    throw new NotFound("Associated payment record not found");
  }

  const status = paymentIntent.status === "succeeded" ? "PAID" : "CANCELLED";
  payment.status = status;
  payment.txnId = paymentIntent.id;
  await payment.save();

  if (paymentIntent.metadata.bookingId) {
    const booking = await Booking.findById(paymentIntent.metadata.bookingId);
    if (booking) {
      booking.status = status === "PAID" ? "CONFIRMED" : "CANCELLED";
      await booking.save();
    }
  }

  res.json(
    ApiResponse.build(
      true,
      {
        paymentIntentId: paymentIntent.id,
        status,
        paymentId: payment._id,
        bookingId: paymentIntent.metadata.bookingId,
        amount: payment.amount,
      },
      "Payment verified successfully",
    ),
  );
};

module.exports = { createPayment, createCheckoutSession, verifyPayment };
