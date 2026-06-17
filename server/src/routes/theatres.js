const express = require("express");
const {
  createTheatre,
  getAllTheatres,
  getTheatreById,
  addMovie,
} = require("../controllers/theatres");
const { isLoggedIn, isPartner } = require("../middlewares/users");

const router = express.Router();

router.post("/", isLoggedIn, isPartner, createTheatre);
router.get("/", isLoggedIn, getAllTheatres);
router.get("/:id", isLoggedIn, getTheatreById);
router.post("/:theatreId/movies", isLoggedIn, isPartner, addMovie);

module.exports = router;
