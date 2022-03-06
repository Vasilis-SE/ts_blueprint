import React from "react";
import { Placeholder, Row, Card, Col } from "react-bootstrap";

export default function MovieCardPlaceHolder() {
  const buildCardPlaceHolder = () => {
    return (
      <Col xs={12} md={6} lg={4}>
        <Card className="movie-card">
          <Card.Body>
            <Card.Title>
              <Placeholder as="p" animation="wave">
                <Placeholder xs={12} />
              </Placeholder>
            </Card.Title>
            <Card.Text className="movie-card-discription">
              <Placeholder as="p" animation="wave" className="h-100">
                <Placeholder xs={10} />
              </Placeholder>
            </Card.Text>
            <Row xs={12} className="social-button-area justify-content-between">
              <Placeholder as="p" animation="wave">
                <Placeholder xs={9} />
              </Placeholder>
            </Row>
          </Card.Body>
          <Card.Footer>
            <Placeholder as="p" animation="wave">
              <Placeholder xs={6} />
            </Placeholder>
          </Card.Footer>
        </Card>
      </Col>
    );
  };
  return (
    <Row className="g-4">
      {[
        buildCardPlaceHolder(),
        buildCardPlaceHolder(),
        buildCardPlaceHolder(),
        buildCardPlaceHolder(),
        buildCardPlaceHolder(),
        buildCardPlaceHolder(),
      ]}
    </Row>
  );
}
