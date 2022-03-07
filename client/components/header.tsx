import { NextPage } from "next";
import React from "react";
import { Navbar, Container, Nav, Button } from "react-bootstrap";
import LoginModal from "./utils/loginModal";

const Header: NextPage = () => {
  const togleModal = (): void => {
    setShowLoginModal(!showLoginModal);
  };

  const [showLoginModal, setShowLoginModal] = React.useState<any>(false);

  return (
    <>
      <LoginModal show={showLoginModal} close={togleModal}></LoginModal>

      <Navbar bg="light" variant="light">
        <Container>
          <Navbar.Brand href="#home">MovieRama</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#profile">Profile</Nav.Link>
          </Nav>
        </Container>

        <Container className="gap-1 justify-content-right">
          <Button variant="outline-success" onClick={togleModal}>
            Login
          </Button>
          <Button variant="outline-info" href="/register">
            Register
          </Button>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
