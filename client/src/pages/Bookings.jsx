import { useEffect } from "react";
import { useNavigate } from "react-router";
import { Card, Typography, Space, Spin, Alert, Button, Tag } from "antd";
import { fetchMyBookings } from "../lib/api";
import useHttp from "../hooks/useHttp";
import UserContext from "../context/user-context";
import { useContext } from "react";

const { Title, Paragraph } = Typography;

const statusColor = {
  PENDING: "orange",
  CONFIRMED: "green",
  CANCELLED: "red",
};

const Bookings = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useContext(UserContext);
  const { isLoading, data, error, sendRequest } = useHttp(fetchMyBookings, true);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    sendRequest();
  }, [isAuthenticated, navigate, sendRequest]);

  const bookings = data?.payload || [];

  return (
    <div
      style={{
        padding: "18px 24px",
        minHeight: "calc(100vh - 180px)",
        border: "1px solid #e8e8e8",
        borderRadius: 14,
        backgroundColor: "#fff",
      }}
    >
      <Space direction="vertical" size="middle" style={{ width: "100%" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "16px" }}>
          <div>
            <Title level={3} style={{ marginBottom: 4 }}>
              My Bookings
            </Title>
            <Paragraph style={{ marginBottom: 0, color: "#888" }}>
              Review your ticket bookings and payment status.
            </Paragraph>
          </div>
          <Button type="primary" size="small" onClick={() => navigate("/")}>Browse Movies</Button>
        </div>

        {isLoading ? (
          <div style={{ textAlign: "center", padding: "40px 0" }}>
            <Spin size="large" />
          </div>
        ) : error ? (
          <Alert type="error" message="Unable to load bookings" description={error} />
        ) : bookings.length === 0 ? (
          <Card
            bodyStyle={{ padding: "24px" }}
            style={{
              borderRadius: 12,
              border: "1px solid #e8e8e8",
              boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
            }}
          >
            <Title level={4}>No bookings found yet.</Title>
            <Paragraph>Book a ticket to see it appear here.</Paragraph>
          </Card>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "16px",
              alignItems: "stretch",
            }}
          >
            {bookings.map((booking) => (
              <Card
                key={booking._id}
                size="small"
                title={booking.movie?.title || "Booked Movie"}
                extra={<Tag color={statusColor[booking.status] || "default"}>{booking.status}</Tag>}
                bodyStyle={{ padding: "16px" }}
                style={{
                  borderRadius: 12,
                  minHeight: 180,
                  border: "1px solid #e8e8e8",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
                }}
              >
                <div style={{ display: "grid", gap: "10px", fontSize: "14px" }}>
                  <div>
                    <strong>Theatre:</strong> {booking.theatre?.name || "—"}
                  </div>
                  <div>
                    <strong>Seats:</strong> {booking.seats?.join(", ") || "—"}
                  </div>
                  <div>
                    <strong>Total:</strong> ₹{booking.totalPrice}
                  </div>
                </div>
                <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginTop: 14 }}>
                  {booking.movie?._id ? (
                    <Button type="default" size="small" onClick={() => navigate(`/movie/${booking.movie._id}`)}>
                      View Movie
                    </Button>
                  ) : null}
                  {booking.theatre?._id ? (
                    <Button type="default" size="small" onClick={() => navigate(`/theatres/${booking.theatre._id}`)}>
                      View Theatre
                    </Button>
                  ) : null}
                </div>
              </Card>
            ))}
          </div>
        )}
      </Space>
    </div>
  );
};

export default Bookings;
