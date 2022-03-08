import React from "react";
import { Card, Row, Col, Button, Nav } from "react-bootstrap";
import GlobalContext from "../../context/globalContext";
import Fetch from "../../helpers/fetch";
import LocalStorageStore from "../../helpers/storage";
import { INotifyModal } from "../../interfaces/components";
import { IGlobalContextProperties } from "../../interfaces/contexts";
import { IMovieProperties } from "../../interfaces/movies";
import { IRatePayload } from "../../interfaces/rating";
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

  const checkIfTheUserIsTheSame = (): boolean => {
    if (username != global.user.username) return true;
    let newModalState = Object.assign({}, _init_modal);
    newModalState.show = true;
    newModalState.title = "Login First!";
    newModalState.content = `You cannot rate your own movies...`;
    setModal(newModalState);
    return false;
  };

  const handleLikeRating = async (e: any) => {
    setModal(_init_modal);
    if (!checkIfLoggedIn() || !checkIfTheUserIsTheSame()) return false;

    let payload: IRatePayload = {
      movieid: Number(movie.id),
      type: true,
    };

    const tokenPayload = await LocalStorageStore.getData("_token");
    const rateResponse = await Fetch.post("/api/rate", payload, {
      Authorization: tokenPayload,
    });
    if (!rateResponse.status) {
      let newModalState = Object.assign({}, _init_modal);
      newModalState.show = true;
      newModalState.title = "Rating Error!";
      newModalState.content = rateResponse.message;
      setModal(newModalState);
      return false;
    }

    let newState = { ...movie };
    switch (rateResponse.proc) {
      case "add":
        newState.likes++;
        break;
      case "change":
        newState.likes++;
        newState.hates--;
        break;
      case "retract":
        newState.likes--;
        break;
    }

    setMovie({ ...newState });
  };

  const handleHateRating = async () => {
    setModal(_init_modal);
    if (!checkIfLoggedIn() || !checkIfTheUserIsTheSame()) return false;

    let payload: IRatePayload = {
      movieid: Number(movie.id),
      type: false,
    };

    const tokenPayload = await LocalStorageStore.getData("_token");
    const rateResponse = await Fetch.post("/api/rate", payload, {
      Authorization: tokenPayload,
    });
    if (!rateResponse.status) {
      let newModalState = Object.assign({}, _init_modal);
      newModalState.show = true;
      newModalState.title = "Rating Error!";
      newModalState.content = rateResponse.message;
      setModal(newModalState);
      return false;
    }

    let newState = { ...movie };
    switch (rateResponse.proc) {
      case "add":
        newState.hates++;
        break;
      case "change":
        newState.hates++;
        newState.likes--;
        break;
      case "retract":
        newState.hates--;
        break;
    }

    setMovie({ ...newState });
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

  const _initMovie: IMovieProperties = {
    id,
    title,
    description,
    username,
    likes,
    hates,
    created_at,
  };
  const global: IGlobalContextProperties = React.useContext(GlobalContext);
  const [modal, setModal] = React.useState<any>(_init_modal);
  const [movie, setMovie] = React.useState<any>(_initMovie);

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
          <Card.Title>{movie.title}</Card.Title>
          <Card.Text className="movie-card-discription">
            {movie.description}
          </Card.Text>
          <Row xs={6} className="social-button-area justify-content-between">
            <Col xs="auto">
              <Button
                variant="outline-success"
                className=""
                onClick={handleLikeRating}
              >
                {movie.likes ? movie.likes : 0}
              </Button>
            </Col>
            <Col xs="auto">
              <Button
                variant="outline-danger"
                className=""
                onClick={handleHateRating}
              >
                {movie.hates ? movie.hates : 0}
              </Button>
            </Col>
          </Row>
        </Card.Body>
        <Card.Footer>
          <Row xs={6} className="social-button-area justify-content-between">
            <Col xs="auto">Created by: {movie.username}</Col>
            <Col xs="auto">{convertTimestampToData(movie.created_at)}</Col>
          </Row>
        </Card.Footer>
      </Card>
    </>
  );
}
