import { useState } from "react";
import { useLocation, useNavigate, Navigate } from "react-router";
import { Card, Button, Space, Alert, Spin, Typography } from "antd";
import PaymentForm from "../components/PaymentForm";

const { Title } = Typography;

const Payment = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const bookingId = state?.bookingId;
  const amount = state?.amount;
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentError, setPaymentError] = useState(null);

  if (!bookingId || !amount) {
    return <Navigate to="/" replace />;
  }

  const handlePaymentSuccess = () => {
    navigate("/payments/success", {
      state: { bookingId, amount },
    });
  };

  const handlePaymentError = (error) => {
    setPaymentError(error);
    setIsProcessing(false);
  };

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
      <Card
        style={{ maxWidth: 500, width: "100%" }}
        title={<Title level={3}>Complete Your Payment</Title>}
      >
        {paymentError && (
          <Alert
            message="Payment Error"
            description={paymentError}
            type="error"
            showIcon
            closable
            onClose={() => setPaymentError(null)}
            style={{ marginBottom: 24 }}
          />
        )}

        {isProcessing ? (
          <div style={{ textAlign: "center", padding: "40px 0" }}>
            <Spin size="large" />
            <div style={{ marginTop: 16 }}>Processing payment...</div>
          </div>
        ) : (
          <>
            <div
              style={{
                marginBottom: 24,
                padding: "12px",
                backgroundColor: "#f5f5f5",
                borderRadius: "4px",
              }}
            >
              <div style={{ fontSize: "14px", color: "#666" }}>
                Amount to pay:
              </div>
              <div style={{ fontSize: "24px", fontWeight: "bold", color: "#1f1f1f" }}>
                ₹{amount}
              </div>
            </div>

            <PaymentForm
              bookingId={bookingId}
              amount={amount}
              onSuccess={handlePaymentSuccess}
              onError={handlePaymentError}
              onProcessing={setIsProcessing}
            />

            <Space direction="vertical" size="middle" style={{ width: "100%", marginTop: 24 }}>
              <Button
                type="default"
                block
                onClick={() => navigate(-1)}
                disabled={isProcessing}
              >
                Cancel
              </Button>
            </Space>
          </>
        )}
      </Card>
    </div>
  );
};

export default Payment;
