const Theatre = require("../models/Theatre");
const ApiResponse = require("../core/ApiResponse");
const Movie = require("../models/Movie");
const { NotFound } = require("../core/ApiError");

const createTheatre = async (req, res) => {
  const { name, address, capacity } = req.body;
  const { userId } = req;
  const theatre = await Theatre.create({
    name,
    address,
    capacity,
    user: userId,
  });
  res
    .status(201)
    .json(ApiResponse.build(true, { id: theatre._id }, "Theatre created"));
};

const getAllTheatres = async (req, res) => {
  const theatres = await Theatre.find().populate([
    {
      path: "user",
      select: "-password",
    },
    {
      path: "movies",
    },
  ]);
  res.status(200).json(ApiResponse.build(true, theatres, "Theatres fetched"));
};

const getTheatreById = async (req, res) => {
  const { id } = req.params;

  const theatre = await Theatre.findById(id).populate([
    {
      path: "user",
      select: "-password",
    },
    {
      path: "movies",
    },
  ]);
  res.status(200).json(ApiResponse.build(true, theatre, "Theatre fetched"));
};

const addMovie = async (req, res) => {
  const { movieId } = req.body;
  const { theatreId } = req.params;

  Theatre.findByIdAndUpdate(theatreId, { $addToSet: { movies: movieId } });
  Movie.findByIdAndUpdate(movieId, { $addToSet: { theatres: theatreId } });

  res
    .status(201)
    .json(ApiResponse.build(true, null, "Movie added successfully"));
};

module.exports = { createTheatre, getAllTheatres, getTheatreById, addMovie };
