import { useState } from 'react';
import { Container, Row, Col, Stack, Form, Card, Button, Modal, Image } from 'react-bootstrap';
import axios from 'axios';


function CardNasa({ item }) {
  const defaultPlaceholder = "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.pngkey.com%2Fpng%2Fdetail%2F233-2332677_image-500580-placeholder-transparent.png&f=1&nofb=1";
  const [summarized, setSummarized] = useState(true);
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Card style={{ width: '18rem' }}>
        <Card.Img style={{ aspectRatio: '2', objectFit: 'cover' }} variant="top" src={item.url || defaultPlaceholder} />
        <Card.Body>
          <Card.Title>{item.title}</Card.Title>
          {
            summarized ?
              <Card.Text>
                {item.desc.slice(0,75)}...
                <Button onClick={() => setSummarized(false)} variant="link">show more</Button>
              </Card.Text>
            :
              <Card.Text>
                {item.desc}
                <Button onClick={() => setSummarized(true)} variant="link">show less</Button>
              </Card.Text>
          }
          <Button variant="primary" onClick={() => setShowModal(true)}>See in details</Button>
        </Card.Body>
      </Card>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{item.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Image style={{ width: '100%' }} rounded={true} src={item.url || defaultPlaceholder} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

function App() {
  const NASA_KEY = "DEMO_KEY";
  const BASE_URL = "https://api.nasa.gov";
  const [loading, setLoading] = useState(false);
  const [gallery, setGallery] = useState([]);
  const [query, setQuery] = useState('');

  function handleAPOD(e) {
    e.preventDefault();
    const APOD = `${BASE_URL}/planetary/apod?api_key=${NASA_KEY}`;
    setLoading(true);
    axios.get(APOD)
      .then(({ data }) => {
        setLoading(false);
        const desc = data.explanation;
        const newGallery = {
          title: data.title,
          desc,
          url: data.url,
        }
        setGallery([newGallery, ...gallery]);
      })
  }
  function handleSubmit(e) {
    e.preventDefault();
    if (!query) return;

    const LIBRARY = "https://images-api.nasa.gov";
    const endpoint = "/search";
    const queryParam = `?q=${query}`;
    const URL = `${LIBRARY}${endpoint}${queryParam}`;

    setLoading(true);
    axios.get(URL)
      .then(({ data }) => {
        const collections = data.collection.items;
        let randomIndex = -1;
        let linkIndex = -1;
        if (collections.length === 0) {
          setLoading(false);
          return;
        }
        while (linkIndex < 0) {
          randomIndex = Math.floor(Math.random() * (collections.length - 1));
          if (collections[randomIndex].links && collections[randomIndex].links.length > 0) {
            linkIndex = Math.floor(Math.random() * (collections[randomIndex].links.length - 1))
          }
        }
        setLoading(false);

        const desc = collections[randomIndex].data[0].description;
        const newGallery = {
          title: collections[randomIndex].data[0].title,
          desc,
          url: collections[randomIndex].links[linkIndex].href,
        }
        setGallery([newGallery, ...gallery]);
      })
  }
  function handleChange(e) {
    setQuery(e.target.value);
  }

  return (
    <Container>
      <Row className="mt-5">
        <Col style={{ textAlign: 'center' }}>
          <Image style={{ width: '40%' }} rounded={true} src="https://www.nasa.gov/sites/all/themes/custom/nasatwo/images/nasa-logo.svg" />
        </Col>
      </Row>
      <Row className="mt-5">
        <Col sm={2}>
          <Button disabled={loading} onClick={handleAPOD}>Picture of the day</Button>
        </Col>
        <Col sm={10}>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control onChange={handleChange} placeholder="Search here..." />
              <Form.Text className="text-muted">
                or find amazing pic in NASA library.
              </Form.Text>
            </Form.Group>
          </Form>
        </Col>
      </Row>
      {
        loading ?
          <Row>
            <Col className="my-3"style={{ textAlign: 'center' }}>
              <h1>
                Loading...
              </h1>
            </Col>
          </Row>
        :
          <></>
      }
      <Stack style={{ flexWrap: 'wrap', justifyContent: 'center' }} direction="horizontal" gap={4}>
        {
          gallery.map((item, index) => {
            return (
              <CardNasa key={index} item={item}></CardNasa>
            )
          })
        }
      </Stack>
    </Container>
  );
}

export default App;
