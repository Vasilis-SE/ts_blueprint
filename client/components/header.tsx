import { NextPage } from "next";
import React from "react";
import { Navbar, Container, Nav, Button } from "react-bootstrap";
import LoginModal from "./utils/loginModal";
import GlobalContext from "../context/globalContext";
import Fetch from "../helpers/fetch";
import LocalStorageStore from "../helpers/storage";
import PopupModal from "./utils/notifyModal";
import { INotifyModal } from "../interfaces/components";
import { IGlobalContextProperties } from "../interfaces/contexts";

const Header: NextPage = () => {
  const global: IGlobalContextProperties = React.useContext(GlobalContext);

  const togleModal = (): void => {
    setShowLoginModal(!showLoginModal);
  };

  const logOutUser = async (): Promise<boolean> => {
    setModal(_init_modal);
    const tokenPayload = await LocalStorageStore.getData("_token");
    const response: any = await Fetch.delete("/api/user", {
      Authorization: tokenPayload,
    });

    if (!response.status) {
      let newModalState = Object.assign({}, _init_modal);
      newModalState.show = true;
      newModalState.title = "Logout Error!";
      newModalState.content = response.message;
      setModal(newModalState);
      return false;
    }

    LocalStorageStore.clearLocalStorage();
    global.update({ isLoggedIn: false, update: global.update });
    return true;
  };

  const _init_modal: INotifyModal = {
    show: false,
    title: "",
    content: "",
    close: togleModal,
  };

  const [showLoginModal, setShowLoginModal] = React.useState<any>(false);
  const [modal, setModal] = React.useState<any>(_init_modal);

  return (
    <>
      <PopupModal
        show={modal.show}
        title={modal.title}
        content={modal.content}
        close={togleModal}
      ></PopupModal>

      {!global.isLoggedIn ? (
        <LoginModal show={showLoginModal} close={togleModal}></LoginModal>
      ) : null}

      <Navbar bg="light" variant="light">
        <Container>
          <Navbar.Brand href="/">MovieRama</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>

            {global.isLoggedIn ? (
              <Nav.Link href="#profile">Profile</Nav.Link>
            ) : null}

            {global.isLoggedIn ? (
              <Nav.Link href="/movies/add">Add New Movie</Nav.Link>
            ) : null}
          </Nav>
        </Container>

        {global.isLoggedIn ? (
          <Container className="gap-1 justify-content-right">
            <Button variant="outline-danger" onClick={logOutUser}>
              Logout
            </Button>
          </Container>
        ) : (
          <Container className="gap-1 justify-content-right">
            <Button variant="outline-success" onClick={togleModal}>
              Login
            </Button>
            <Button variant="outline-info" href="/register">
              Register
            </Button>
          </Container>
        )}
      </Navbar>
    </>
  );
};

export default Header;
