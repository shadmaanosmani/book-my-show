import { useEffect } from "react";
import { useNavigate } from "react-router";
import { fetchTheatres } from "../lib/api";
import useHttp from "../hooks/useHttp";
import { Alert, Spin, Card } from "antd";

const Theatres = () => {
  const navigate = useNavigate();
  const { isLoading, data, error, sendRequest } = useHttp(fetchTheatres);

  useEffect(() => {
    sendRequest();
  }, [sendRequest]);

  if (isLoading) {
    return (
      <div style={{ padding: "20px", textAlign: "center", marginTop: "50px" }}>
        <Spin size="large" />
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: "20px" }}>
        <Alert
          title="Error"
          description={error.message || "Failed to load theatres"}
          type="error"
          showIcon
        />
      </div>
    );
  }

  const theatres = data?.payload || [];

  return (
    <div style={{ padding: "20px 40px", backgroundColor: "#f5f5f5", minHeight: "calc(100vh - 200px)" }}>
      <h2 style={{ marginBottom: "20px", color: "#333", fontSize: "24px", fontWeight: "600" }}>
        Theatres
      </h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: "24px",
        }}
      >
        {theatres.map((theatre) => (
          <Card
            key={theatre._id}
            title={theatre.name}
            style={{ minHeight: "180px", cursor: "pointer" }}
            hoverable
            onClick={() => navigate(`/theatres/${theatre._id}`)}
          >
            <p style={{ marginBottom: "8px" }}>
              <strong>Address:</strong> {theatre.address}
            </p>
            <p style={{ marginBottom: "8px" }}>
              <strong>Capacity:</strong> {theatre.capacity}
            </p>
            <p style={{ marginBottom: 0 }}>
              <strong>Partner:</strong> {theatre.user?.username || "N/A"}
            </p>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Theatres;
