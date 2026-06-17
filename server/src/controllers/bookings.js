const Booking = require("../models/Booking");
const ApiResponse = require("../core/ApiResponse");
const { BadRequest } = require("../core/ApiError");

const createBooking = async (req, res) => {
  const { userId } = req;
  const { totalPrice, theatreId, movieId, seats } = req.body;

  const existingBooking = await Booking.findOne({
    theatre: theatreId,
    movie: movieId,
    user: userId,
    seats: { $in: [...seats] },
  });

  if (existingBooking) {
    throw new BadRequest("Some of the seats are already booked!");
  }

  const booking = await Booking.create({
    user: userId,
    theatre: theatreId,
    movie: movieId,
    status: "PENDING",
    totalPrice: totalPrice,
    seats: seats,
  });

  res
    .status(201)
    .json(ApiResponse.build(true, booking, "Booking created successfully"));
};

const getMyBookings = async (req, res) => {
  const { userId } = req;

  const bookings = await Booking.find({ user: userId })
    .populate("movie")
    .populate("theatre");

  res.json(ApiResponse.build(true, bookings, "Bookings fetched successfully"));
};

module.exports = { createBooking, getMyBookings };
