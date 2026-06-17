import { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router";
import { fetchMovieDetails, createBooking } from "../lib/api";
import useHttp from "../hooks/useHttp";
import UserContext from "../context/user-context";
import {
  Alert,
  Spin,
  Card,
  Typography,
  Avatar,
  Space,
  Button,
  Modal,
  Select,
  message,
} from "antd";

const { Title, Paragraph } = Typography;
const { Meta } = Card;
const seatRows = ["A", "B", "C", "D", "E", "F"];
const seatCols = Array.from({ length: 9 }, (_, index) => index + 1);
const seatPrice = 150;

const MovieDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { user, isAuthenticated } = useContext(UserContext);
  const { isLoading, data, error, sendRequest } = useHttp(fetchMovieDetails);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTheatre, setSelectedTheatre] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [isBooking, setIsBooking] = useState(false);

  useEffect(() => {
    if (id) {
      sendRequest(id);
    }
  }, [id, sendRequest]);

  const handleOpenBooking = () => {
    if (!data?.payload?.theatres?.length) {
      message.warning("No theatres are currently showing this movie.");
      return;
    }
    setIsModalOpen(true);
  };

  const handleCloseBooking = () => {
    setIsModalOpen(false);
    setSelectedTheatre(null);
    setSelectedSeats([]);
  };

  const toggleSeatSelection = (seat) => {
    setSelectedSeats((prevSeats) =>
      prevSeats.includes(seat)
        ? prevSeats.filter((item) => item !== seat)
        : [...prevSeats, seat],
    );
  };

  const handleConfirmBooking = async () => {
    if (!isAuthenticated) {
      message.warning("Please log in before booking tickets.");
      navigate("/login");
      return;
    }

    if (!selectedTheatre) {
      message.warning("Please select a theatre.");
      return;
    }

    if (!selectedSeats.length) {
      message.warning("Please select at least one seat.");
      return;
    }

    setIsBooking(true);
    try {
      const bookingResponse = await createBooking({
        theatreId: selectedTheatre,
        movieId: id,
        seats: selectedSeats,
        totalPrice: selectedSeats.length * seatPrice,
      });
      message.success(
        "Booking created successfully. Redirecting to payment...",
      );
      handleCloseBooking();
      navigate("/payments", {
        state: {
          bookingId: bookingResponse.payload._id,
          amount: selectedSeats.length * seatPrice,
        },
      });
    } catch (err) {
      message.error(
        err?.response?.data?.message || err.message || "Booking failed.",
      );
    } finally {
      setIsBooking(false);
    }
  };

  if (isLoading) {
    return (
      <div style={{ padding: "20px", textAlign: "center", marginTop: "50px" }}>
        <Spin size="large" />
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: "20px" }}>
        <Alert
          title="Error"
          description={error.message || "Failed to load movie details"}
          type="error"
          showIcon
        />
      </div>
    );
  }

  const movie = data?.payload;

  if (!movie) {
    return (
      <div style={{ padding: "20px" }}>
        <Alert
          title="Not Found"
          description="Movie not found"
          type="warning"
          showIcon
        />
      </div>
    );
  }

  return (
    <div
      style={{
        padding: "20px 40px",
        backgroundColor: "#f5f5f5",
        minHeight: "calc(100vh - 200px)",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          paddingBottom: "20px",
          display: "flex",
          justifyContent: "space-between",
          gap: "12px",
          flexWrap: "wrap",
        }}
      >
        <Button type="default" onClick={() => navigate("/")}>
          Back to Movies
        </Button>
        <Button type="primary" onClick={handleOpenBooking}>
          Book Ticket
        </Button>
      </div>
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          display: "flex",
          gap: "20px",
          alignItems: "flex-start",
        }}
      >
        <div style={{ flex: "0 0 300px" }}>
          <img
            alt={movie.title}
            src={movie.posterUrl}
            style={{
              width: "100%",
              maxHeight: "450px",
              objectFit: "contain",
              backgroundColor: "#f5f5f5",
              borderRadius: "8px",
            }}
          />
        </div>
        <div style={{ flex: 1 }}>
          <Title level={2} style={{ marginBottom: "16px" }}>
            {movie.title}
          </Title>
          <Paragraph style={{ fontSize: "16px", marginBottom: "16px" }}>
            {movie.desc}
          </Paragraph>
          <div style={{ marginBottom: "16px" }}>
            <strong>Runtime:</strong> {movie.runtime} minutes
          </div>
          <div style={{ marginBottom: "24px" }}>
            <Title level={4} style={{ marginBottom: "12px" }}>
              Available Theatres
            </Title>
            {movie.theatres?.length > 0 ? (
              <Space
                direction="vertical"
                size="small"
                style={{ width: "100%" }}
              >
                {movie.theatres.map((theatre) => (
                  <Card
                    key={theatre._id}
                    size="small"
                    style={{ backgroundColor: "#fafafa" }}
                  >
                    <p style={{ marginBottom: 4, fontWeight: 600 }}>
                      {theatre.name}
                    </p>
                    <p style={{ margin: 0, color: "#555" }}>
                      {theatre.address}
                    </p>
                  </Card>
                ))}
              </Space>
            ) : (
              <p style={{ color: "#999" }}>
                No theatres are currently showing this movie.
              </p>
            )}
          </div>
          <div>
            <Title level={4} style={{ marginBottom: "12px" }}>
              Cast
            </Title>
            <Space direction="vertical" size="middle" style={{ width: "100%" }}>
              {movie.cast.map((actor) => (
                <Card key={actor._id} size="small" style={{ width: "100%" }}>
                  <Meta
                    avatar={<Avatar src={actor.profilePic} size="large" />}
                    title={actor.name}
                    description={actor.alias}
                  />
                </Card>
              ))}
            </Space>
          </div>
        </div>
      </div>

      <Modal
        title="Book Your Seats"
        open={isModalOpen}
        onCancel={handleCloseBooking}
        onOk={handleConfirmBooking}
        confirmLoading={isBooking}
        okText="Confirm Booking"
        width={900}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div>
            <strong>Select Theatre</strong>
            <Select
              placeholder="Select a theatre"
              style={{ width: "100%", marginTop: "8px" }}
              value={selectedTheatre}
              onChange={setSelectedTheatre}
            >
              {movie.theatres?.map((theatre) => (
                <Select.Option key={theatre._id} value={theatre._id}>
                  {theatre.name} — {theatre.address}
                </Select.Option>
              ))}
            </Select>
          </div>

          <div>
            <strong>Seat Map</strong>
            <div style={{ marginTop: "12px", overflowX: "auto" }}>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: `48px repeat(${seatCols.length}, 48px)`,
                  gap: "8px",
                  alignItems: "center",
                  marginBottom: "8px",
                }}
              >
                <div />
                {seatCols.map((col) => (
                  <div
                    key={col}
                    style={{ textAlign: "center", fontWeight: 600 }}
                  >
                    {col}
                  </div>
                ))}
              </div>
              {seatRows.map((row) => (
                <div
                  key={row}
                  style={{
                    display: "grid",
                    gridTemplateColumns: `48px repeat(${seatCols.length}, 48px)`,
                    gap: "8px",
                    alignItems: "center",
                    marginBottom: "8px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: 600,
                    }}
                  >
                    {row}
                  </div>
                  {seatCols.map((col) => {
                    const seat = `${row}${col}`;
                    const active = selectedSeats.includes(seat);
                    return (
                      <Button
                        key={seat}
                        type={active ? "primary" : "default"}
                        onClick={() => toggleSeatSelection(seat)}
                        style={{
                          width: "48px",
                          height: "48px",
                          padding: 0,
                          minWidth: "auto",
                        }}
                      >
                        {col}
                      </Button>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "12px",
            }}
          >
            <div>
              <p style={{ margin: 0, fontWeight: 600 }}>Selected Seats</p>
              <p style={{ margin: 0 }}>
                {selectedSeats.length > 0 ? selectedSeats.join(", ") : "None"}
              </p>
            </div>
            <div>
              <p style={{ margin: 0, fontWeight: 600 }}>Total Price</p>
              <p style={{ margin: 0 }}>₹{selectedSeats.length * seatPrice}</p>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default MovieDetails;
