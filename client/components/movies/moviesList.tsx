import React from "react";
import { Row, Col, Dropdown } from "react-bootstrap";
import Fetch from "../../helpers/fetch";
import MovieCard from "./movieCard";
import MovieCardPlaceHolder from "./movieCardPlaceholder";

export default function MoviesList() {
  const [finished, setFinished] = React.useState(false);
  const [movies, setMovies] = React.useState<any[]>([]);
  const [errorMessage, setErrorMessage] = React.useState("");
  const [orderMethod, setOrderMethod] = React.useState("obl");

  const handleMoviesResponse = async () => {
    const data: any = await Fetch.get("/api/movie");
    if (!data.status) setErrorMessage(data.message);
    else setMovies(data.data);

    setFinished(true);
  };

  const handleChangeOfOrdering = (e: any) => {
    console.log(e.target);
    setOrderMethod(e.target.value);
  };

  React.useEffect(() => {
    setFinished(false);

    // Delay requesyt to display results (given a better feeling...)
    setTimeout(() => handleMoviesResponse(), 1000);
  }, []);

  const buildMovieList = () => {
    let cards = [];

    for (let movie of movies) {
      cards.push(
        <Col xs={12} md={6} lg={4} key={`col_${movie.id}`}>
          <MovieCard
            key={movie.id}
            id={movie.id}
            title={movie.title}
            description={movie.description}
            username={movie.username}
            likes={movie.likes ? movie.likes : 0}
            hates={movie.hates ? movie.hates : 0}
            created_at={movie.created_at}
          ></MovieCard>
        </Col>
      );
    }

    return <Row className="g-4">{cards}</Row>;
  };

  const buildBar = () => {
    return (
      <Row className="p-2">
        <Dropdown>
        <Dropdown.Toggle variant="outline-warning" id="dropdown-basic">
          Dropdown Button
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item value="obl" onClick={handleChangeOfOrdering}>Order By Likes</Dropdown.Item>
          <Dropdown.Item value="obh" onClick={handleChangeOfOrdering}>Order By Hates</Dropdown.Item>
          <Dropdown.Item value="obd" onClick={handleChangeOfOrdering}>Order By Date</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      </Row>
    );
  };

  return finished ? (
    errorMessage != "" ? (
      <Row> {errorMessage} </Row>
    ) : (
      [buildBar(), buildMovieList()]
    )
  ) : (
    <MovieCardPlaceHolder></MovieCardPlaceHolder>
  );
}
