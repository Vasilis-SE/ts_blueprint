import React from "react";
import { Form, Button, Row } from "react-bootstrap";
import Fetch from "../helpers/fetch";
import { IUserLoginProperties } from "../interfaces/user";
import { IErrorAlert } from "../interfaces/components";
import ErrorAlter from "./utils/errorAlert";
import LocalStorageStore from "../helpers/storage";
import { IGlobalContextProperties } from "../interfaces/contexts";
import GlobalContext from "../context/globalContext";

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
    setAlertError(_init_alert);
    if (username == "" || password == "") return;
    const payload: IUserLoginProperties = {
      username,
      password,
    };

    // Attempt login user
    const loginResponse = await Fetch.post("/api/user/login", payload);
    if (!loginResponse.status) {
      return setAlertError({
        title: "Login Error!",
        content: loginResponse.message
          ? loginResponse.message
          : "Error occurred while trying to login...",
      });
    }


    // If login was a success fetch profile
    let url = `/api/user${rememberMe ? "?rm=true" : ""}`;
    const profileResponse = await Fetch.get(url, {
      Authorization: JSON.stringify(loginResponse.data),
    });

    if (!profileResponse.status) {
      return setAlertError({
        title: "Login Error!",
        content: profileResponse.message
          ? profileResponse.message
          : "Error occurred while trying to fetch profile...",
      });
    }

    const tokenData = {...loginResponse.data, exp: loginResponse.exp};
    LocalStorageStore.setData(JSON.stringify(profileResponse.data), '_user');
    LocalStorageStore.setData(JSON.stringify(tokenData), '_token');
    global.update({isLoggedIn: true, update: global.update});
    
    // Router.reload(); // Force reload
  };

  const _init_alert: IErrorAlert = {
    title: "",
    content: "",
  };

  const global: IGlobalContextProperties = React.useContext(GlobalContext);

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
