import { useEffect } from "react";
import { fetchMovies } from "../lib/api";
import useHttp from "../hooks/useHttp";
import MovieCard from "../components/MovieCard";
import { Alert, Spin } from "antd";

const AllMovies = () => {
  const { isLoading, data, error, sendRequest } = useHttp(fetchMovies);

  useEffect(() => {
    sendRequest();
  }, []);

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
          description={error.message || "Failed to load movies"}
          type="error"
          showIcon
        />
      </div>
    );
  }

  return (
    <div style={{ padding: "20px 40px", backgroundColor: "#f5f5f5", minHeight: "calc(100vh - 200px)" }}>
      <h2 style={{ marginBottom: "20px", color: "#333", fontSize: "24px", fontWeight: "600" }}>
        Movies
      </h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
          gap: "25px",
        }}
      >
        {data?.payload?.map((movie) => {
          return <MovieCard key={movie._id} movie={movie} />;
        })}
      </div>
    </div>
  );
};

export default AllMovies;
