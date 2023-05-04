import './App.css';
import List from "./List"
import { useState, useEffect } from "react"
import { uid } from "uid"
import axios from "axios"
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Table from "react-bootstrap/Table"

let api = axios.create({ baseURL: "https://localhost.3001"})

function App() {
  const [contacts, setContacts] = useState([

  ])

  const [isUpdate, setIsUpdate] = useState({ id: null, status: false})

  const [formData, setFormData] = useState({
    name: "",
    telp: "",
  })

  useEffect(() => {
    api.get("/contacts").then((response) => {
      setContacts(response.data)
    })
  }, [])

  function handleChange(e) {
    let newFormState = { ...formData }
    newFormState[e.target.name] = e.target.value
    setFormData(newFormState)
  }

  function handleSubmit(e) {
    e.preventDefault()

    let data = [...contacts]

    if (formData.name === "") {
      return false;
    } if (formData.telp === "") {
      return false;
    }

    if (isUpdate.status) {
      data.forEach((contact) => {
        if (contact.id === isUpdate.id) {
          contact.name = formData.name
          contact.telp = formData.telp
        }
      })
    } else {
      let toSave = {
        id: uid(),
        name: formData.name,
        telp: formData.telp
      }
      data.push(toSave)
    }

    // menambahkan contact

    setContacts(data)
    setFormData({ name: "", telp: ""})
    setIsUpdate(false)
  }

  function handleEdit(id) {
    let data = [...contacts];
    let foundData = data.find((contact) => contact.id === id)
    setFormData({ name: foundData.name, telp: foundData.telp})
    setIsUpdate({ id: id, status: true})
  }

  function handleDelete(id) {
    let data = [...contacts]
    let filteredData = data.filter((contact) => contact.id !== id)

    api.delete("/contacts" + id)
    setContacts(filteredData)
  }

  return (
    <div>
      <div className='bg-white pb-3 mx-auto' style={{ width: "80%"}}>
        <h1 className='px-3 d-flex justify-content-center py-5'>My Contact List</h1>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control 
              type="text"
              className='form-control' 
              placeholder="Enter a Name" 
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>No Telp</Form.Label>
            <Form.Control 
              type="text" 
              className='form-control'
              placeholder="Enter a number"
              name="telp"
              value={formData.telp}
              onChange={handleChange}
            />
          </Form.Group>
          <Button variant="success" type="submit">
            Save
          </Button>
        </Form>
        <div style={{ marginTop: "50px"}}>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Nama</th>
                <th>No. Telp</th>
                <th>Action</th>
              </tr>
            </thead>
            <List handleEdit={handleEdit} data={contacts} handleDelete={handleDelete}  />
          </Table>
        </div>
      </div>
    </div>
  );
}

export default App;
