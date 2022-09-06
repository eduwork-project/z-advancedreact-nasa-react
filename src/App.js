import { Container, Row, Col, Stack, Form, Card, Button } from 'react-bootstrap';
function App() {
  return (
    <Container>
      <Row className="mt-5">
        <Col sm={3}>
          <Button>Picture of the day</Button>
        </Col>
        <Col sm={9}>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Search</Form.Label>
              <Form.Control type="email" placeholder="Search here..." />
              <Form.Text className="text-muted">
                Find amazing pic in NASA library.
              </Form.Text>
            </Form.Group>
          </Form>
        </Col>
      </Row>
      <Row>
        <Col className="my-3"style={{ textAlign: 'center' }}>
          <h1>
            Loading...
          </h1>
        </Col>
      </Row>
      <Stack style={{ flexWrap: 'wrap' }} direction="horizontal" gap={3}>
        <Card style={{ width: '18rem' }}>
          <Card.Img variant="top" src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.pngkey.com%2Fpng%2Fdetail%2F233-2332677_image-500580-placeholder-transparent.png&f=1&nofb=1" />
          <Card.Body>
            <Card.Title>Card Title</Card.Title>
            <Card.Text>
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </Card.Text>
            <Button variant="primary">See in details</Button>
          </Card.Body>
        </Card>
      </Stack>
    </Container>
  );
}

export default App;
