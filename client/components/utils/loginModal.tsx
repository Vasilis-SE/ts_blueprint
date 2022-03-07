import React from "react";
import { Button, Modal } from "react-bootstrap";
import { ILoginModal } from "../../interfaces/components";
import LoginForm from "../loginForm";

const LoginModal = ({ show, close }: ILoginModal) => {
  return show ? (
    <Modal show="true">
      <Modal.Header closeButton onHide={() => close()}>
        <Modal.Title> Login </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <LoginForm></LoginForm>
      </Modal.Body>
    </Modal>
  ) : null;
};

export default LoginModal;
