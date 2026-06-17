const express = require("express");
const { createBooking, getMyBookings } = require("../controllers/bookings");
const { isLoggedIn } = require("../middlewares/users");

const router = express.Router();

router.post("/", isLoggedIn, createBooking);
router.get("/", isLoggedIn, getMyBookings);

module.exports = router;
