import React from "react";
import { Placeholder } from "react-bootstrap";

export default function MovieCardPlaceHolder() {
  return (
    <>
      <Placeholder as="p" animation="wave">
        <Placeholder xs={12} />
      </Placeholder>
      <Placeholder as="p" animation="wave">
        <Placeholder xs={12} />
      </Placeholder>
      <Placeholder as="p" animation="wave">
        <Placeholder xs={12} />
      </Placeholder>
    </>
  );
}
