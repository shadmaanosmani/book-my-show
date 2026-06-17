import { useState } from "react";
import { Button, Input, Space, Typography } from "antd";
import { createCheckoutSession } from "../lib/api";

const { Text } = Typography;

const PaymentForm = ({ bookingId, amount, onError, onProcessing }) => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email.trim()) {
      onError("Please enter your email address");
      return;
    }

    setIsSubmitting(true);
    onProcessing(true);

    try {
      const response = await createCheckoutSession({
        bookingId,
        amount,
        customerEmail: email,
      });

      const sessionUrl = response?.payload?.sessionUrl;
      if (!sessionUrl) {
        throw new Error("Unable to create checkout session");
      }

      window.location.href = sessionUrl;
    } catch (err) {
      console.error("Checkout error:", err);
      onError(err?.message || "Payment failed. Please try again.");
    } finally {
      setIsSubmitting(false);
      onProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Space direction="vertical" size="large" style={{ width: "100%" }}>
        <div>
          <label style={{ display: "block", marginBottom: "8px", fontWeight: "500" }}>
            Email Address
          </label>
          <Input
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isSubmitting}
          />
        </div>

        <div style={{ padding: "16px", backgroundColor: "#fafafa", borderRadius: 4 }}>
          <Text>
            You will be redirected to Stripe Checkout to securely enter your card details and complete the payment.
          </Text>
        </div>

        <Button
          type="primary"
          htmlType="submit"
          loading={isSubmitting}
          disabled={isSubmitting}
          style={{ width: "100%" }}
        >
          {isSubmitting ? "Redirecting..." : "Pay Now"}
        </Button>
      </Space>
    </form>
  );
};

export default PaymentForm;
