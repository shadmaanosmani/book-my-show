import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { fetchTheatreDetails, fetchMovies, addMovieToTheatre } from "../lib/api";
import useHttp from "../hooks/useHttp";
import { Alert, Spin, Card, Typography, Button, Select, Space, message } from "antd";

const { Title, Paragraph } = Typography;

const TheatreDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [isAddingMovie, setIsAddingMovie] = useState(false);
  
  const { isLoading, data, error, sendRequest } = useHttp(fetchTheatreDetails);
  const { data: moviesData, sendRequest: fetchMoviesHandler } = useHttp(fetchMovies);

  useEffect(() => {
    if (id) {
      sendRequest(id);
    }
    fetchMoviesHandler();
  }, [id, sendRequest, fetchMoviesHandler]);

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
          description={error.message || "Failed to load theatre details"}
          type="error"
          showIcon
        />
      </div>
    );
  }

  const theatre = data?.payload;
  const allMovies = moviesData?.payload || [];
  const theatreMovieIds = theatre?.movies?.map(m => m._id) || [];
  const availableMovies = allMovies.filter(m => !theatreMovieIds.includes(m._id));

  if (!theatre) {
    return (
      <div style={{ padding: "20px" }}>
        <Alert
          title="Not Found"
          description="Theatre not found"
          type="warning"
          showIcon
        />
      </div>
    );
  }

  const handleAddMovie = async () => {
    if (!selectedMovie) {
      message.warning("Please select a movie");
      return;
    }
    setIsAddingMovie(true);
    try {
      await addMovieToTheatre(id, selectedMovie);
      message.success("Movie added successfully");
      setSelectedMovie(null);
      sendRequest(id);
    } catch (err) {
      message.error(err.message || "Failed to add movie");
    } finally {
      setIsAddingMovie(false);
    }
  };

  return (
    <div style={{ padding: "20px 40px", backgroundColor: "#f5f5f5", minHeight: "calc(100vh - 200px)" }}>
      <Button type="default" style={{ marginBottom: "20px" }} onClick={() => navigate("/theatres")}>Back to Theatres</Button>
      <Card style={{ maxWidth: "900px", margin: "0 auto" }}>
        <Title level={2} style={{ marginBottom: "16px" }}>
          {theatre.name}
        </Title>
        <Paragraph style={{ fontSize: "16px", marginBottom: "16px" }}>
          <strong>Address:</strong> {theatre.address}
        </Paragraph>
        <Paragraph style={{ fontSize: "16px", marginBottom: "16px" }}>
          <strong>Capacity:</strong> {theatre.capacity}
        </Paragraph>
        <Paragraph style={{ fontSize: "16px", marginBottom: "24px" }}>
          <strong>Partner:</strong> {theatre.user?.username || "N/A"}
        </Paragraph>

        <div style={{ marginBottom: "24px", paddingTop: "16px", borderTop: "1px solid #d9d9d9" }}>
          <Title level={4} style={{ marginBottom: "12px" }}>Add Movie to Theatre</Title>
          <Space style={{ width: "100%" }}>
            <Select
              placeholder="Select a movie"
              style={{ minWidth: "300px" }}
              value={selectedMovie}
              onChange={setSelectedMovie}
            >
              {availableMovies.map((movie) => (
                <Select.Option key={movie._id} value={movie._id}>
                  {movie.title}
                </Select.Option>
              ))}
            </Select>
            <Button type="primary" onClick={handleAddMovie} loading={isAddingMovie}>
              Add Movie
            </Button>
          </Space>
        </div>

        <div>
          <Title level={4} style={{ marginBottom: "12px" }}>Movies in Theatre</Title>
          {theatre.movies && theatre.movies.length > 0 ? (
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {theatre.movies.map((movie) => (
                <Card key={movie._id} size="small" style={{ backgroundColor: "#fafafa" }}>
                  <p style={{ marginBottom: 0 }}>
                    <strong>{movie.title}</strong>
                  </p>
                </Card>
              ))}
            </div>
          ) : (
            <p style={{ color: "#999" }}>No movies added yet</p>
          )}
        </div>
      </Card>
    </div>
  );
};

export default TheatreDetails;
