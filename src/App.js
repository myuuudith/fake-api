// import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import Axios from 'axios';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Modal from 'react-bootstrap/Modal';

function App() {
const [data, setData] =  useState([]);
const [name, setName] = useState('');
const [price, setAge] = useState(1);
const [description, setDescription] = useState();
const [image, setImage] = useState();

const [nameEdit, setNameEdit] = useState('');
const [ageEdit, setAgeEdit] = useState(1);
const [descriptionEdit, setDescriptionEdit] = useState();
const [imageEdit, setImageEdit] = useState();
const [show, setShow] = useState(false);

const handleClose = () => setShow(false);
const handleShow = (id) => setShow(id);

const getData = () => {
  Axios({
    method: 'get',
    url: 'http://localhost:7777/product',
  })
  .then(function (response) {
    setData(response.data.data)
  });
}

const handleEdit = () => {
  Axios ({
    method: 'put',
    url: `http://localhost:7777/product/${show}`,
    data: {
      name: nameEdit,
      description: descriptionEdit,
      image: imageEdit,
      price: ageEdit
    }
  })
  .then(function (response) {
    handleClose()
    setNameEdit('')
    setAgeEdit(1)
    setDescriptionEdit('')
    setImageEdit('')
    getData()
  });
}

  const handleAdd = (e) => {
    e.preventDefault()
    Axios ({
      method: 'post',
      url: 'http://localhost:7777/product',
      data: {
        name: name,
      description: description,
      image: image,
      price: parseInt(price)
      }
    })
    .then(function (response) {
      // console.log(response);
      setName('')
      setAge('')
      setDescription('')
      setImage('')
      getData()
    });
  }

  const handleDelete = (id) => {
    if (window.confirm(`Delete ID ${id}?`)) {
    Axios ({
      method: 'post',
      url: `http://localhost:7777/product/delete/${id}`,})
    .then(function (response) {
      getData()
    });
  }
  }

  useEffect(() => {
    getData()
   }, []);
 

  return (
    <>
    <Form onSubmit={handleAdd}>
      <Form.Group className="mb-3" controlId="formBasicName">
        <Form.Label>Product</Form.Label>
        <Form.Control value={name} name="name" type="text" onChange={(e) => setName(e.target.value)} placeholder="Enter Product" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicAge">
        <Form.Label>Price</Form.Label>
        <Form.Control value={price} name="price" type="number" onChange={(e) => setAge(e.target.value)}placeholder="Enter Price" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicDescription">
        <Form.Label>Description</Form.Label>
        <Form.Control value={description} name="description" type="text" onChange={(e) => setDescription(e.target.value)}placeholder="Enter Description" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicImage">
        <Form.Label>Image</Form.Label>
        <Form.Control value={image} name="image" type="text" onChange={(e) => setImage(e.target.value)}placeholder="Enter Url Image" />
      </Form.Group>

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
    <br>
    </br>

    {/* <Button size="sm" variant="primary" onClick={handleAdd}>Add</Button> */}
    <Table striped bordered hover variant="dark">
    <thead>
      <tr>
        <th>#</th>
        <th>Name</th>
        <th>Price</th>
        <th>Description</th>
        <th>Image URL</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
    {data.map((item, index) => {
      return <tr key={index}>
        <td>{index + 1}</td>
        <td>{item.name}</td>
        <td>{item.price}</td>
        <td>{item.description}</td>
        <td>{item.image}</td>
        <td><ButtonGroup aria-label="Action">
      <Button size="sm" variant="primary" onClick={() => handleShow(item.id)}>Edit</Button>
      <Button size="sm" variant="danger" onClick={() => handleDelete(item.id)}>Delete</Button>
    </ButtonGroup></td>
      </tr>
    })}
    </tbody>
  </Table>
  <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>Product</Form.Label>
              <Form.Control value={nameEdit} type="text" onChange={(e) => setNameEdit(e.target.value)} placeholder="Enter name" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicAge">
              <Form.Label>Price</Form.Label>
              <Form.Control value={ageEdit} type="number" onChange={(e) => setAgeEdit(e.target.value)} placeholder="Enter Price" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control value={descriptionEdit} type="text" onChange={(e) => setDescriptionEdit(e.target.value)} placeholder="Enter Description" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicImage">
              <Form.Label>Image</Form.Label>
              <Form.Control value={imageEdit} type="text" onChange={(e) => setImageEdit(e.target.value)} placeholder="Enter Image" />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleEdit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
  </>
  );
}

export default App;
