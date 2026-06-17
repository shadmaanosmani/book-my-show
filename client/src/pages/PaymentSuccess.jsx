import { useEffect, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router";
import { Button, Typography, Space, Card, Result, Spin } from "antd";
import { verifyPayment } from "../lib/api";

const { Paragraph } = Typography;

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [paymentData, setPaymentData] = useState(null);

  const { bookingId: stateBookingId, amount: stateAmount } = location.state || {};
  const sessionId = searchParams.get("session_id");

  useEffect(() => {
    if (!stateBookingId && sessionId) {
      setLoading(true);
      verifyPayment({ sessionId })
        .then((response) => {
          setPaymentData(response.payload || {});
        })
        .catch((err) => {
          console.error("Payment verification failed:", err);
          setError(err?.message || "Unable to verify payment");
        })
        .finally(() => setLoading(false));
    }
  }, [sessionId, stateBookingId]);

  const bookingId = stateBookingId || paymentData?.bookingId;
  const amount = stateAmount || paymentData?.amount;

  if (loading) {
    return (
      <div
        style={{
          padding: "40px 20px",
          minHeight: "calc(100vh - 200px)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Card style={{ maxWidth: 500, width: "100%", textAlign: "center" }}>
          <Spin size="large" />
          <Paragraph style={{ marginTop: 16 }}>Verifying your payment...</Paragraph>
        </Card>
      </div>
    );
  }

  if (error || !bookingId) {
    return (
      <div
        style={{
          padding: "40px 20px",
          minHeight: "calc(100vh - 200px)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Card style={{ maxWidth: 500, width: "100%" }}>
          <Result
            status="error"
            title="Payment Verification Failed"
            subTitle={error || "No booking information found. Please try booking again."}
            extra={
              <Button type="primary" onClick={() => navigate("/")}>
                Back to Movies
              </Button>
            }
          />
        </Card>
      </div>
    );
  }

  return (
    <div
      style={{
        padding: "40px 20px",
        minHeight: "calc(100vh - 200px)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Card style={{ maxWidth: 600, width: "100%" }}>
        <Result
          status="success"
          title="Payment Successful"
          subTitle={`Your booking has been confirmed. Amount paid: ₹${amount}`}
          extra={
            <Space size="middle">
              <Button type="primary" onClick={() => navigate("/bookings")}>
                View Your Bookings
              </Button>
              <Button onClick={() => navigate("/")}>
                Back to Movies
              </Button>
            </Space>
          }
        />
      </Card>
    </div>
  );
};

export default PaymentSuccess;
