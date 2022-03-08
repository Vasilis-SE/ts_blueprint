import React from "react";
import { Card, Row, Col, Button } from "react-bootstrap";
import GlobalContext from "../../context/globalContext";
import { INotifyModal } from "../../interfaces/components";
import { IGlobalContextProperties } from "../../interfaces/contexts";
import { IMovieProperties } from "../../interfaces/movies";
import PopupModal from "../utils/notifyModal";

const convertTimestampToData = (timestamp = 0) => {
  return new Date(timestamp * 1000).toLocaleTimeString("el-GR");
};

export default function MovieCard({
  id,
  title,
  description,
  username,
  likes,
  hates,
  created_at,
}: IMovieProperties) {
  const checkIfLoggedIn = (): boolean => {
    if (global.isLoggedIn) return true;
    let newModalState = Object.assign({}, _init_modal);
    newModalState.show = true;
    newModalState.title = "Login First!";
    newModalState.content = `In order to rate a movie you will need first to login, 
        or firstly create a new account if you dont have one`;
    setModal(newModalState);
    return false;
  };

  const handleLikeRating = () => {
    setModal(_init_modal);
    if (!checkIfLoggedIn()) return false;


  };

  const handleHateRating = () => {
    setModal(_init_modal);
    if (!checkIfLoggedIn()) return false;

    
  };

  const togleModal = (): void => {
    const modalState = { ...modal };
    modalState.show != modalState.show;
    setModal(_init_modal);
  };

  const _init_modal: INotifyModal = {
    show: false,
    title: "",
    content: "",
    close: togleModal,
  };

  const global: IGlobalContextProperties = React.useContext(GlobalContext);
  const [modal, setModal] = React.useState<any>(_init_modal);

  return (
    <>
      <PopupModal
        show={modal.show}
        title={modal.title}
        content={modal.content}
        close={togleModal}
      ></PopupModal>

      <Card className="movie-card">
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <Card.Text className="movie-card-discription">
            {description}
          </Card.Text>
          <Row xs={6} className="social-button-area justify-content-between">
            <Col xs="auto">
              <Button
                variant="outline-success"
                className=""
                onClick={handleLikeRating}
              >
                {likes ? likes : 0}
              </Button>
            </Col>
            <Col xs="auto">
              <Button
                variant="outline-danger"
                className=""
                onClick={handleHateRating}
              >
                {hates ? hates : 0}
              </Button>
            </Col>
          </Row>
        </Card.Body>
        <Card.Footer>
          <Row xs={6} className="social-button-area justify-content-between">
            <Col xs="auto">Created by: {username}</Col>
            <Col xs="auto">{convertTimestampToData(created_at)}</Col>
          </Row>
        </Card.Footer>
      </Card>
    </>
  );
}
