import { useContext, useEffect, useState } from "react";
import { Form, Input, InputNumber, Button, Alert } from "antd";
import { useNavigate, Navigate } from "react-router";
import UserContext from "../context/user-context";
import { createTheatre } from "../lib/api";
import useHttp from "../hooks/useHttp";

const CreateTheatre = () => {
  const { user, isAuthenticated } = useContext(UserContext);
  const [successMessage, setSuccessMessage] = useState(null);
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const { data, isLoading, error, sendRequest } = useHttp(createTheatre);

  const onFinish = async (values) => {
    await sendRequest({
      name: values.name,
      address: values.address,
      capacity: Number(values.capacity),
    });
  };

  useEffect(() => {
    if (data && !error) {
      setSuccessMessage("Theatre created successfully.");
      form.resetFields();
      setTimeout(() => {
        navigate("/");
      }, 1000);
    }
  }, [data, error, form, navigate]);

  if (!isAuthenticated || user?.role !== "PARTNER") {
    return <Navigate to="/" />;
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
          maxWidth: "500px",
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
          Create Theatre
        </h2>
        {error && (
          <Alert
            message={error || "Could not create theatre"}
            type="error"
            showIcon
            style={{ marginBottom: "20px" }}
          />
        )}
        {successMessage && (
          <Alert
            message={successMessage}
            type="success"
            showIcon
            style={{ marginBottom: "20px" }}
          />
        )}
        <Form form={form} name="create-theatre" onFinish={onFinish} layout="vertical">
          <Form.Item
            label="Theatre Name"
            name="name"
            rules={[{ required: true, message: "Please enter the theatre name." }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Address"
            name="address"
            rules={[{ required: true, message: "Please enter the theatre address." }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Seating Capacity"
            name="capacity"
            rules={[
              { required: true, message: "Please enter the seating capacity." },
              { type: "number", min: 1, message: "Capacity must be at least 1." },
            ]}
          >
            <InputNumber style={{ width: "100%" }} min={1} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={isLoading} block>
              Create Theatre
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default CreateTheatre;
