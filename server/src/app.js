const express = require("express");
const ApiResponse = require("./core/ApiResponse");
const { ApiError } = require("./core/ApiError");
const cors = require("cors");
const MailgunClient = require("./lib/MailgunClient");

const healthCheckRoutes = require("./routes/health");
const movieRoutes = require("./routes/movies");
const userRoutes = require("./routes/users");
const theatreRoutes = require("./routes/theatres");
const bookingRoutes = require("./routes/bookings");
const paymentRoutes = require("./routes/payments");

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(healthCheckRoutes);
app.use("/api/v1/movies", movieRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/theatres", theatreRoutes);
app.use("/api/v1/bookings", bookingRoutes);
app.use("/api/v1/payments", paymentRoutes);

app.get("/test", async (req, res) => {
  await MailgunClient.sendSimpleMessage();
  res.send("Mail sent successfully");
});

const handleError = (err, req, res, next) => {
  console.error(err);

  if (err instanceof ApiError) {
    const { status = 500, message = "Internal server error" } = err;
    return res.status(status).json(ApiResponse.build(false, null, message));
  }

  res.status(500).json({ success: false, message: "Something went wrong" });
};

app.use(handleError);

module.exports = app;
