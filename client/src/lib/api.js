import axios from "axios";

const BASE_URL = "http://localhost:3000";

export async function fetchMovies() {
  const res = await axios.get(`${BASE_URL}/api/v1/movies`);
  return res.data;
}

export async function fetchMovieDetails(movieId) {
  const res = await axios.get(`${BASE_URL}/api/v1/movies/${movieId}`);
  return res.data;
}

export async function registerUser(newUser) {
  const res = await axios.post(`${BASE_URL}/api/v1/users/register`, {
    ...newUser,
  });
  return res.data;
}

export async function loginUser(userData) {
  const res = await axios.post(`${BASE_URL}/api/v1/users/login`, {
    ...userData,
  });
  return res.data;
}

export async function forgotPassword(emailData) {
  const res = await axios.post(`${BASE_URL}/api/v1/users/forgot-password`, {
    ...emailData,
  });
  return res.data;
}

export async function resetPassword(resetData) {
  const res = await axios.post(`${BASE_URL}/api/v1/users/reset-password`, {
    ...resetData,
  });
  return res.data;
}

export async function fetchProfile() {
  const res = await axios.get(`${BASE_URL}/api/v1/users/profile`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`
    }
  });
  return res.data;
}

export async function createTheatre(theatreData) {
  const res = await axios.post(`${BASE_URL}/api/v1/theatres`, theatreData, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return res.data;
}

export async function fetchTheatres() {
  const res = await axios.get(`${BASE_URL}/api/v1/theatres`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return res.data;
}

export async function fetchTheatreDetails(theatreId) {
  const res = await axios.get(`${BASE_URL}/api/v1/theatres/${theatreId}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return res.data;
}

export async function addMovieToTheatre(theatreId, movieId) {
  const res = await axios.post(`${BASE_URL}/api/v1/theatres/${theatreId}/movies`, { movieId }, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return res.data;
}

export async function createBooking(bookingData) {
  const res = await axios.post(`${BASE_URL}/api/v1/bookings`, bookingData, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return res.data;
}

export async function fetchMyBookings() {
  const res = await axios.get(`${BASE_URL}/api/v1/bookings`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return res.data;
}

export async function createPayment(paymentData) {
  const res = await axios.post(`${BASE_URL}/api/v1/payments`, paymentData, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return res.data;
}

export async function createCheckoutSession(checkoutData) {
  const res = await axios.post(`${BASE_URL}/api/v1/payments/checkout-session`, checkoutData, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return res.data;
}

export async function verifyPayment({ paymentIntentId, sessionId }) {
  const res = await axios.get(`${BASE_URL}/api/v1/payments/verify`, {
    params: { paymentIntentId, sessionId },
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return res.data;
}
