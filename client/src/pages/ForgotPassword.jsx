import { Form, Input, Button, Alert } from "antd";
import { useState } from "react";
import { Link } from "react-router";
import { forgotPassword } from "../lib/api";
import useHttp from "../hooks/useHttp";

const ForgotPassword = () => {
  const [form] = Form.useForm();
  const { data, isLoading, error, sendRequest } = useHttp(forgotPassword);
  const [submitted, setSubmitted] = useState(false);

  const onFinish = async (values) => {
    await sendRequest(values);
    setSubmitted(true);
  };

  return (
    <div
      style={{
        padding: "20px 40px",
        backgroundColor: "#f5f5f5",
        minHeight: "calc(100vh - 200px)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          backgroundColor: "#fff",
          padding: "40px",
          borderRadius: "8px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          width: "100%",
          maxWidth: "400px",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            marginBottom: "20px",
            color: "#333",
            fontSize: "24px",
            fontWeight: "600",
          }}
        >
          Forgot Password
        </h2>
        {error && (
          <Alert
            message={error || "Unable to send reset link"}
            type="error"
            showIcon
            style={{ marginBottom: "20px" }}
          />
        )}
        {submitted && data && (
          <Alert
            message={data.message || "Reset password link sent"}
            type="success"
            showIcon
            style={{ marginBottom: "20px" }}
          />
        )}
        <Form form={form} name="forgot-password" onFinish={onFinish} layout="vertical">
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Please input your email!" },
              { type: "email", message: "Please enter a valid email!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={isLoading} block>
              Send reset password link
            </Button>
          </Form.Item>
        </Form>
        <div style={{ textAlign: "center", marginTop: 8 }}>
          <Link to="/login">Back to login</Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
