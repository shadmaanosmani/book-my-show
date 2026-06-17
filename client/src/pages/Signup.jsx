import { Form, Input, Button, Alert, Radio } from "antd";
import { registerUser } from "../lib/api";
import useHttp from "../hooks/useHttp";
import { Navigate } from "react-router";

const Signup = () => {
  const [form] = Form.useForm();
  const { data, isLoading, error, sendRequest } = useHttp(registerUser);

  const onFinish = (values) => {
    sendRequest(values);
  };

  if (!isLoading && data) {
    return <Navigate to="/login" />;
  }

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
          Sign Up
        </h2>
        {error && (
          <Alert
            message={error || "Registration failed"}
            type="error"
            showIcon
            style={{ marginBottom: "20px" }}
          />
        )}
        <Form form={form} name="signup" onFinish={onFinish} layout="vertical">
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
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[
              { required: true, message: "Please input your password!" },
              { min: 6, message: "Password must be at least 6 characters!" },
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            label="Role"
            name="role"
            initialValue="USER"
            rules={[{ required: true, message: "Please select a role!" }]}
          >
            <Radio.Group>
              <Radio value="USER">USER</Radio>
              <Radio value="PARTNER">PARTNER</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={isLoading} block>
              Sign Up
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Signup;
