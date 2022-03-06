import React from "react";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import { NextPage } from "next";
import IUserRegisterProperties from "../interfaces/user";
import ErrorAlter from "../components/utils/errorAlert";

const Register: NextPage = () => {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [repassword, setRePassword] = React.useState("");
  const [usernameError, setUsernameError] = React.useState("");
  const [passwordError, setPasswordError] = React.useState("");
  const [repasswordError, setRePasswordError] = React.useState("");

  const [alertError, setAlertError] = React.useState<any>({});

  const handleUsernameChange = (event: any) => {
    setUsername(event.target.value);
    setUsernameError("");

    if (event.target.value === "")
      setUsernameError("This field cannot be empty...");
  };

  const handlePasswordChange = (event: any) => {
    setPassword(event.target.value);
    setPasswordError("");

    if (event.target.value === "")
      setPasswordError("This field cannot be empty...");
  };

  const handleRePasswordChange = (event: any) => {
    setRePassword(event.target.value);
    setRePasswordError("");

    if (event.target.value === "")
      setRePasswordError("This field cannot be empty...");
  };

  const handleClearForm = (event: any) => {
    setUsername("");
    setUsernameError("");
    setPassword("");
    setPasswordError("");
    setRePassword("");
    setRePasswordError("");
    setAlertError({});
  };

  const handleFormSubmit = (event: any) => {
    setAlertError({});
    if (usernameError != "" || passwordError != "" || repasswordError != "")
      return;

    if (password != repassword)
      return setAlertError({
        title: "Password mismatch!",
        content:
          "The password and the retype password fields you have provided mismatch! Check again your input...",
      });

    const payload: IUserRegisterProperties = { username, password };
  };

  return (
    <Container className="p-4">
      <Row xs={12} md={9} lg={7}>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicUsername">
            <Form.Label>Username:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter a username here..."
              value={username}
              onChange={handleUsernameChange}
            />

            <Form.Text className="text-danger">{usernameError}</Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password:</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter a password here..."
              value={password}
              onChange={handlePasswordChange}
            />

            <Form.Text className="text-danger">{passwordError}</Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicRePassword">
            <Form.Label>Retype Password:</Form.Label>
            <Form.Control
              type="password"
              placeholder="Retype your password here..."
              value={repassword}
              onChange={handleRePasswordChange}
            />

            <Form.Text className="text-danger">{repasswordError}</Form.Text>
          </Form.Group>

          <Row className="gap-2">
            <Col xs={12} md={4} lg={3}>
              <Button
                variant="outline-primary"
                className="w-100"
                onClick={handleFormSubmit}
              >
                Register
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
      </Row>

      {Object.keys(alertError).length > 0 ? (
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
  );
};

export default Register;