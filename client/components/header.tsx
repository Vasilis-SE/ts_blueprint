import Head from "next/head";
import React from "react";
import { Navbar, Container, Nav, Button, Row } from "react-bootstrap";

export default function Header() {
  return (
    <Head>
      <Navbar bg="light" variant="light">
          <Container>
            <Navbar.Brand href="#home">MovieRama</Navbar.Brand>
            <Nav className="me-auto">
              <Nav.Link href="#home">Home</Nav.Link>
              <Nav.Link href="#profile">Profile</Nav.Link>
            </Nav>
          </Container>
          
          <Container className="gap-1 justify-content-right">
            <Button variant="outline-success">Login</Button>
            <Button variant="outline-info">Register</Button>
          </Container>
      </Navbar>
    </Head>
  );
}
