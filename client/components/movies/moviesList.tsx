import React from "react";
import { Row } from "react-bootstrap";
import { IFailedResponse, ISuccessfulResponse } from "../../interfaces/response";
import MovieCardPlaceHolder from "./movieCardPlaceholder";

const fetchMoviesForIndex = async (): Promise<ISuccessfulResponse | IFailedResponse> => {
  let response = await fetch("/api").then((response) => response.json());
  return response;
};

export default function MoviesList() {
  const [finished, setFinished] = React.useState(false);
  const [movies, setMovies] = React.useState([]);
  const [errorMessage, setErrorMessage] = React.useState('');

  React.useEffect(() => {
    setFinished(false);
    
    const handleMoviesResponse = async () => {
        const data: any = await fetchMoviesForIndex();
        console.log('>> ',data);

        if(!data.status)
            setErrorMessage(data.message);
        else
            setMovies(data.data); 

        setFinished(true);
    };

    // Delay requesyt to display results (given a better feeling...)
    setTimeout(()=>handleMoviesResponse(), 1300)
  }, []);

  return (
    finished 
        ? errorMessage != "" 
            ? <Row></Row>
            : <Row></Row>
        : <MovieCardPlaceHolder></MovieCardPlaceHolder>
  );
}
