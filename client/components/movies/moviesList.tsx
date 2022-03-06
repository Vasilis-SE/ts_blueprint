import React from "react";
import { Row, Col } from "react-bootstrap";
import {
  IFailedResponse,
  ISuccessfulResponse,
} from "../../interfaces/response";
import MovieCard from "./movieCard";
import MovieCardPlaceHolder from "./movieCardPlaceholder";

const fetchMoviesForIndex = async (): Promise<
  ISuccessfulResponse | IFailedResponse
> => {
  let response = await fetch("/api").then((response) => response.json());
  return response;
};

export default function MoviesList() {
  const [finished, setFinished] = React.useState(false);
  const [movies, setMovies] = React.useState<any[]>([]);
  const [errorMessage, setErrorMessage] = React.useState("");

  React.useEffect(() => {
    setFinished(false);

    const handleMoviesResponse = async () => {
      const data: any = await fetchMoviesForIndex();
      console.log(">> ", data);

      if (!data.status) setErrorMessage(data.message);
      else setMovies(data.data);

      setFinished(true);
    };

    // Delay requesyt to display results (given a better feeling...)
    setTimeout(() => handleMoviesResponse(), 1300);
  }, []);

  const buildMovieList = () => {
    let cards = [];

    for (let movie of movies) {
      cards.push(
        <Col xs={12} md={6} lg={4}>
          <MovieCard
            id={movie.id}
            title={movie.title}
            description={movie.description}
            username={movie.username}
            likes={movie.likes}
            hates={movie.hates}
            created_at={movie.created_at}
          ></MovieCard>
        </Col>
      );
    }

    return <Row className="g-4">{cards}</Row>;
  };

  return finished ? (
    errorMessage != "" ? (
      <Row></Row>
    ) : (
      buildMovieList()
    )
  ) : (
    <MovieCardPlaceHolder></MovieCardPlaceHolder>
  );
}
