import React from "react";
import { Form, Button, Row } from "react-bootstrap";
import Fetch from "../service/fetch";
import IUserLoginProperties from "../interfaces/user";
import { IErrorAlert } from "../interfaces/components";
import ErrorAlter from "./utils/errorAlert";

export default function LoginForm() {
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

  const handleRememberMeChange = (event: any) => {
    setRememberMe(!rememberMe);
  };

  const handleLogin = async () => {
    if (username == "" || password == "") return;
    const payload: IUserLoginProperties = {
      username,
      password,
    };

    const response = await Fetch.post("/api/user/login", payload);
    console.log(response);
    if (!response.status) {
      return setAlertError({
        title: "Login Error!",
        content: response.message,
      });
    }
  };

  const _init_alert: IErrorAlert = {
    title: "",
    content: "",
  };

  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [rememberMe, setRememberMe] = React.useState(false);
  const [usernameError, setUsernameError] = React.useState("");
  const [passwordError, setPasswordError] = React.useState("");
  const [alertError, setAlertError] = React.useState<any>(_init_alert);

  return (
    <Form>
      <Form.Group className="mb-3" controlId="formBasicUsername">
        <Form.Label>Username: </Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter your username here..."
          value={username}
          onChange={handleUsernameChange}
        />
        <Form.Text className="text-danger">{usernameError}</Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          value={password}
          onChange={handlePasswordChange}
        />
        <Form.Text className="text-danger">{passwordError}</Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check
          type="checkbox"
          label="Remember me"
          checked={rememberMe}
          onChange={handleRememberMeChange}
        />
      </Form.Group>

      <Button variant="outline-primary" onClick={handleLogin}>
        Login
      </Button>

      {alertError.title != "" ? (
        <Row xs={12} className="my-sm-1">
          <ErrorAlter 
            title={alertError.title}
            content={alertError.content}
          ></ErrorAlter>
        </Row>
      ) : null}
    </Form>
  );
}
