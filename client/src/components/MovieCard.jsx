import { Card } from "antd";
import { useNavigate } from "react-router";

const { Meta } = Card;

const MovieCard = ({ movie }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/movie/${movie._id}`);
  };

  return (
    <Card
      hoverable
      variant="borderless"
      styles={{ body: { padding: "12px" } }}
      onClick={handleClick}
      cover={
        <div style={{ position: "relative", overflow: "hidden" }}>
          <img
            alt={movie.title}
            src={movie.posterUrl}
            style={{
              height: "320px",
              width: "100%",
              objectFit: "cover",
              display: "block",
            }}
          />
        </div>
      }
    >
      <Meta
        title={
          <div
            style={{
              fontSize: "14px",
              fontWeight: "600",
              color: "#333",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {movie.title}
          </div>
        }
        description={
          <div style={{ color: "#777", fontSize: "12px" }}>
            {movie.runtime} min
          </div>
        }
      />
    </Card>
  );
};

export default MovieCard;