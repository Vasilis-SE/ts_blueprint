import React from "react";
import { Alert } from "react-bootstrap";
import { IErrorAlert } from "../../interfaces/components";

export default function ErrorAlter({ title, content }: IErrorAlert) {
  return (
    <Alert variant="danger">
      <Alert.Heading> {title} </Alert.Heading>
      <p> {content} </p>
    </Alert>
  );
}
