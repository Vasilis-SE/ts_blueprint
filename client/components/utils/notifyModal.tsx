import React from "react";
import { Button, Modal } from "react-bootstrap";
import { INotifyModal } from "../../interfaces/components";

const PopupModal = ({ show, title, content, close }: INotifyModal) => {
  return show ? (
    <Modal show="true">
      <Modal.Header closeButton onHide={() => close()}>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{content}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => close()}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  ) : null;
};

export default PopupModal;
