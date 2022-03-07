import React, { useState } from "react";
import Footer from "../components/footer";
import Header from "../components/header";
import MoviesList from "../components/movies/moviesList";
import { Container } from "react-bootstrap";
import { NextPage } from "next";

const Home: NextPage = () => {
  const [isLogged, setIsLogged] = useState(false);

  return (
    <>
      <Header></Header>
      <Container fluid className="p-3">
        <MoviesList></MoviesList>
      </Container>
      <Footer></Footer>
    </>
  );
};

export default Home;
