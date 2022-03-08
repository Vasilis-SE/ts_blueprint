import React from "react";
import {
  Container,
  Form,
  Button,
  Row,
  Col,
  FloatingLabel,
} from "react-bootstrap";
import { NextPage } from "next";
import { IErrorAlert, INotifyModal } from "../../interfaces/components";
import PopupModal from "../../components/utils/notifyModal";
import ErrorAlter from "../../components/utils/errorAlert";
import { IMovieProperties, MovieGlobals } from "../../interfaces/movies";
import Fetch from "../../helpers/fetch";
import LocalStorageStore from "../../helpers/storage";
import Header from "../../components/header";
import Footer from "../../components/footer";

const AddMovie: NextPage = () => {
  const handleTitleChange = (event: any) => {
    setTitle(event.target.value);
    setTitleError("");
    setAlertError(_init_alert);

    if (event.target.value === "")
      setTitleError("This field cannot be empty...");
  };

  const handleDescriptionChange = (event: any) => {
    setDescription(event.target.value);
    setDescriptionError("");
    setAlertError(_init_alert);

    if (event.target.value === "")
      setDescriptionError("This field cannot be empty...");
  };

  const handleFormSubmit = async (event: any) => {
    setAlertError(_init_alert);
    setModal(_init_modal);

    if (title == "" || description == "") return;

    if (title.length > MovieGlobals.TITLE_MAXLENGTH) {
      return setAlertError({
        title: "Form Error!",
        content: `The length of the title input is to long. 
            Try a title with less than ${MovieGlobals.TITLE_MAXLENGTH} letters...`,
      });
    }

    const payload: IMovieProperties = {
      title,
      description,
    };

    const tokenPayload = await LocalStorageStore.getData("_token");
    const response: any = await Fetch.post("/api/movie", payload, {
      Authorization: tokenPayload,
    });

    let newModalState = Object.assign({}, _init_modal);
    newModalState.show = true;

    // If there is an error display it on the popup
    if (!response.status) {
      newModalState.title = "Form Error!";
      newModalState.content = response.message;
      return setModal(newModalState);
    }

    newModalState.title = "Form Success!";
    newModalState.content = "Movie was created successfully!";
    setModal(newModalState);
    return handleClearForm();
  };

  const handleClearForm = () => {
    setTitle("");
    setDescription("");
    setTitleError("");
    setDescriptionError("");
    setAlertError(_init_alert);
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

  const _init_alert: IErrorAlert = {
    title: "",
    content: "",
  };

  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [titleError, setTitleError] = React.useState("");
  const [descriptionError, setDescriptionError] = React.useState("");

  const [alertError, setAlertError] = React.useState<any>(_init_alert);
  const [modal, setModal] = React.useState<any>(_init_modal);

  return (
    <>
      <PopupModal
        show={modal.show}
        title={modal.title}
        content={modal.content}
        close={togleModal}
      ></PopupModal>

      <Header></Header>
      <Container className="p-4">
        <Row xs={12} md={9} lg={7}>
          <section className="p-3">
            <Form>
              <Form.Group className="mb-3" controlId="formBasicTitle">
                <Form.Label>Title:</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter the title of the movie..."
                  value={title}
                  onChange={handleTitleChange}
                />

                <Form.Text className="text-danger">{titleError}</Form.Text>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicReDescription">
                <Form.Label>Description:</Form.Label>

                <FloatingLabel
                  controlId="formBasicReDescription"
                  label="Movie Description..."
                >
                  <Form.Control
                    as="textarea"
                    placeholder="Type the full description of the movie here..."
                    value={description}
                    onChange={handleDescriptionChange}
                    style={{ height: "100px" }}
                  />
                </FloatingLabel>

                <Form.Text className="text-danger">
                  {descriptionError}
                </Form.Text>
              </Form.Group>

              <Row className="gap-2">
                <Col xs={12} md={4} lg={3}>
                  <Button
                    variant="outline-primary"
                    className="w-100"
                    onClick={handleFormSubmit}
                  >
                    Create New Movie
                  </Button>
                </Col>
                <Col xs={12} md={4} lg={3}>
                  <Button
                    variant="outline-danger"
                    className="w-100"
                    onClick={handleClearForm}
                  >
                    Clear Form
                  </Button>
                </Col>
              </Row>
            </Form>
          </section>
        </Row>

        {alertError.title != "" ? (
          <Row xs={12}>
            <ErrorAlter
              title={alertError.title}
              content={alertError.content}
            ></ErrorAlter>
          </Row>
        ) : (
          ""
        )}
      </Container>
      <Footer></Footer>
    </>
  );
};

export default AddMovie;
