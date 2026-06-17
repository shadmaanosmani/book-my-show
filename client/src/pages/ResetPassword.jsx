import { Form, Input, Button, Alert } from "antd";
import { useState } from "react";
import { Link } from "react-router";
import { resetPassword } from "../lib/api";
import useHttp from "../hooks/useHttp";

const ResetPassword = () => {
  const [form] = Form.useForm();
  const { data, isLoading, error, sendRequest } = useHttp(resetPassword);
  const [submitted, setSubmitted] = useState(false);

  const searchParams = new URLSearchParams(window.location.search);
  const token = searchParams.get("token");
  const email = searchParams.get("email");

  const onFinish = async (values) => {
    if (!token || !email) return;
    await sendRequest({ token, email, newPassword: values.password });
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
          Reset Password
        </h2>
        {!token && (
          <Alert
            message="Invalid or missing token"
            type="error"
            showIcon
            style={{ marginBottom: "20px" }}
          />
        )}
        {error && (
          <Alert
            message={error || "Unable to reset password"}
            type="error"
            showIcon
            style={{ marginBottom: "20px" }}
          />
        )}
        {submitted && data && (
          <Alert
            message={data.message || "Password reset successful"}
            type="success"
            showIcon
            style={{ marginBottom: "20px" }}
          />
        )}

        <Form
          form={form}
          name="reset-password"
          onFinish={onFinish}
          layout="vertical"
        >
          <Form.Item
            label="New Password"
            name="password"
            rules={[{ required: true, message: "Please input your new password!" }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            label="Confirm Password"
            name="confirm"
            dependencies={["password"]}
            rules={[
              { required: true, message: "Please confirm your password!" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("The two passwords do not match!"));
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={isLoading} block disabled={!token || !email}>
              Reset Password
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

export default ResetPassword;
