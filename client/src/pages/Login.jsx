import { Form, Input, Button, Alert } from "antd";
import UserContext from "../context/user-context";
import { useContext } from "react";
import { Link } from "react-router";

const Login = () => {
  const [form] = Form.useForm();
  const { login, loginError, loginIsLoading } = useContext(UserContext);

  const onFinish = (values) => {
    login(values);
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
          Login
        </h2>
        {loginError && (
          <Alert
            message={loginError || "Login failed"}
            type="error"
            showIcon
            style={{ marginBottom: "20px" }}
          />
        )}
        <Form form={form} name="login" onFinish={onFinish} layout="vertical">
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
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loginIsLoading} block>
              Login
            </Button>
          </Form.Item>
          <div style={{ textAlign: "center", marginTop: 8 }}>
            <Link to="/forgot-password">Forgot password?</Link>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Login;
