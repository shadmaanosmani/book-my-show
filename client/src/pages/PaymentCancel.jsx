import { useNavigate } from "react-router";
import { Button, Card, Result, Space } from "antd";

const PaymentCancel = () => {
  const navigate = useNavigate();

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
          status="error"
          title="Payment Cancelled"
          subTitle="Your payment was cancelled. The booking has not been confirmed. You can try booking again."
          extra={
            <Space size="middle">
              <Button type="primary" onClick={() => navigate("/")}>
                Back to Movies
              </Button>
              <Button onClick={() => navigate("/theatres")}>Browse Theatres</Button>
            </Space>
          }
        />
      </Card>
    </div>
  );
};

export default PaymentCancel;
