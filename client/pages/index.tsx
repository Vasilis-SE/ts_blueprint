import React from "react";
import Footer from "../components/footer";
import Header from "../components/header";
import MoviesList from "../components/movies/moviesList";
import { Container } from "react-bootstrap";
import { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <div>
      <Header></Header>
      <Container>
        <MoviesList></MoviesList>
      </Container>
      <Footer></Footer>
    </div>
  );
};

export default Home;
