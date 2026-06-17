import { Route, Routes } from "react-router";
import Layout from "./components/Layout";
import AllMovies from "./pages/AllMovies";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import MovieDetails from "./pages/MovieDetails";
import CreateTheatre from "./pages/CreateTheatre";
import Theatres from "./pages/Theatres";
import TheatreDetails from "./pages/TheatreDetails";
import Payment from "./pages/Payment";
import PaymentSuccess from "./pages/PaymentSuccess";
import PaymentCancel from "./pages/PaymentCancel";
import Bookings from "./pages/Bookings";

const App = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<AllMovies />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/create-theatre" element={<CreateTheatre />} />
        <Route path="/theatres" element={<Theatres />} />
        <Route path="/theatres/:id" element={<TheatreDetails />} />
        <Route path="/bookings" element={<Bookings />} />
        <Route path="/payments" element={<Payment />} />
        <Route path="/payments/success" element={<PaymentSuccess />} />
        <Route path="/payments/cancel" element={<PaymentCancel />} />
      </Routes>
    </Layout>
  );
};

export default App;
