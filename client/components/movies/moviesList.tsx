import React from "react";
import { Row, Col, Dropdown, Pagination } from "react-bootstrap";
import Converter from "../../helpers/convert";
import Fetch from "../../helpers/fetch";
import { IRequestQueryFilters } from "../../interfaces/request";
import { IMetaProperties } from "../../interfaces/response";
import MovieCard from "./movieCard";
import MovieCardPlaceHolder from "./movieCardPlaceholder";

export default function MoviesList() {
  const initQuery: IRequestQueryFilters = {
    page: 0,
    limit: 4,
    order: "likes",
    sort: "DESC",
  };

  const initMeta: IMetaProperties = {
    _num: 0,
    _pages: 0,
    _prev: "",
    _next: "",
  };

  const [finished, setFinished] = React.useState(false);
  const [movies, setMovies] = React.useState<any[]>([]);
  const [meta, setMeta] = React.useState(initMeta);
  const [errorMessage, setErrorMessage] = React.useState("");
  const [queryParams, setQueryParams] = React.useState(initQuery);

  const handleMoviesResponse = async (path: string) => {
    const data: any = await Fetch.get(path);
    if (!data.status) return setErrorMessage(data.message);

    let moviesList = Array.isArray(data.data) ? data.data : [data.data];
    setMovies(moviesList);
    setMeta(data.meta);
  };

  const handlePaginationPrev = async (e: any) => {
    e.preventDefault();
    if (meta._prev === "") return;
    const clonedState = { ...queryParams };
    clonedState.page!--;
    setQueryParams({ ...clonedState });
    handleMoviesResponse(meta._prev);
  };

  const handlePaginationNext = async (e: any) => {
    e.preventDefault();
    if (meta._next === "") return;
    const clonedState = { ...queryParams };
    clonedState.page!++;
    setQueryParams({ ...clonedState });
    handleMoviesResponse(meta._next);
  };

  const handleChangeOfOrdering = (order: string) => {
    if(order === queryParams.order) return;

    // Since the order changed, re-init the query params and call
    // again for data.
    const newState = {...initQuery};
    newState.order = order;
    setQueryParams(newState);
    handleMoviesResponse(`/api/movie?${Converter.objectToQueryString(newState)}`);
  };

  React.useEffect(() => {
    setFinished(false);
    const queryString = Converter.objectToQueryString(queryParams);

    // Delay requesyt to display results (given a better feeling...)
    setTimeout(() => {
      handleMoviesResponse(`/api/movie?${queryString}`);
      setFinished(true);
    }, 1000);
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
      <Row>
        <Col>
          <Dropdown onSelect={handleChangeOfOrdering}>
            <Dropdown.Toggle variant="outline-warning" id="dropdown-basic">
              Order By
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item
                eventKey="likes"
                active={queryParams.order == "likes"}
              >
                Order By Likes
              </Dropdown.Item>
              <Dropdown.Item
                eventKey="hates"
                active={queryParams.order == "hates"}
              >
                Order By Hates
              </Dropdown.Item>
              <Dropdown.Item
                eventKey="created_at"
                active={queryParams.order == "created_at"}
              >
                Order By Date
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Col>
        <Col>
          <Pagination className="justify-content-right">
            <Pagination.Prev
              disabled={meta._prev == ""}
              onClick={handlePaginationPrev}
            />
            <Pagination.Next
              disabled={meta._next == ""}
              onClick={handlePaginationNext}
            />
          </Pagination>
        </Col>
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
