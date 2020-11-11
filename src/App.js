import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Table,
  Button,
  Container,
  ButtonGroup,
  Form,
  Row,
  Col,
} from "react-bootstrap";
import React, { Component } from "react";

const contacts = [
  { id: 1, contactName: "Jacob", contactNumber: "8294486138" },
  { id: 2, contactName: "Luis", contactNumber: "8294486138" },
  { id: 3, contactName: "Jose", contactNumber: "8294486138" },
  { id: 4, contactName: "Junior", contactNumber: "8294486138" },
  { id: 5, contactName: "Josue", contactNumber: "8294486138" },
];
class App extends Component {
  state = {
    contactos: contacts,
    form: {
      id: "",
      contactName: "",
      contactNumber: "",
    },
    emptyForm: { id: "", contactName: "", contactNumber: "" },
    buttonText: { text: "Guardar contacto" },
    editState: { text: "Guardar cambios" },
    formState: { mode: "" },
    search: { word: "" },
  };

  handleChange = (e) => {
    this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value,
      },
    });
  };

  search = () => {
    if (this.state.search.word.length !== 1) {
      const result = this.state.contactos.filter((contacts) =>
        contacts.contactName
          .toString()
          .toLowerCase()
          .includes(this.state.search.word.toLowerCase())
      );
      this.setState({ contactos: result });
    } else if (this.state.search.word.length === 1) {
      this.setState({ contactos: contacts });
    }
  };

  formMode = (formMode, contactToEdit) => {
    console.log(contactToEdit);
    console.log(this.state.formState.mode);
    const mode = this.state.formState.mode;
    this.setState({
      formState: {
        mode: mode,
      },
    });
    if (mode == "edit") {
      this.editar(contactToEdit);
    } else {
      this.insertar();
    }
  };

  insertar = () => {
    if (this.state.form.contactName !== "" && this.state.form.contactNumber) {
      let newValue = { ...this.state.form };
      newValue.id = this.state.contactos.length + 1;
      let list = this.state.contactos;
      list.push(newValue);
      let initialState = this.state.emptyForm;
      this.setState({
        contactos: list,
        form: initialState,
        formState: { mode: "" },
      });
    }
  };

  limpiar = () => {
    let initialState = this.state.emptyForm;
    this.setState({
      form: initialState,
      buttonText: { text: "Guardar contacto" },
      formState: { mode: "" },
    });
  };

  editar = (contactToEdit) => {
    this.setState({ formState: { mode: "edit" } });
    let counter = 0;
    let list = this.state.contactos;
    list.map(
      (contactEdit) => {
        if (contactToEdit.id === contactEdit.id) {
          list[counter].contactName = contactToEdit.contactName;
          list[counter].contactNumber = contactToEdit.contactNumber;
        }
        counter++;
      },
      console.log("Miodiendo alcance"),
      this.setState({ form: this.state.emptyForm })
    );

    this.setState({
      form: contactToEdit,
      contactos: list,
      buttonText: { text: "Guardar cambios" },
    });
  };

  eliminar = (contactToDel) => {
    let contactsList = this.state.contactos;
    let counter = 0;
    contactsList.map((contacto) => {
      if (contacto.id === contactToDel.id) {
        contactsList.splice(counter, 1);
      }
      counter++;
    });
    this.setState({ contactos: contactsList });
  };
  render() {
    return (
      <div className="App">
        <Container>
          <Form>
            <Form.Group>
              <Form.Group as={Row} controlId="contactID">
                <Form.Label column sm="1">
                  ID
                </Form.Label>
                <Col sm="11">
                  <Form.Control
                    type="text"
                    placeholder={this.state.contactos.length + 1}
                    name="id"
                    readOnly
                    value={this.state.form.id}
                  />
                </Col>
              </Form.Group>

              <Form.Group as={Row} controlId="contactNumber">
                <Form.Label column sm="1">
                  Nombre
                </Form.Label>
                <Col sm="11">
                  <Form.Control
                    type="text"
                    placeholder="Jacob"
                    name="contactName"
                    onChange={this.handleChange}
                    value={this.state.form.contactName}
                  />
                </Col>
              </Form.Group>

              <Form.Group as={Row} controlId="phoneNumber">
                <Form.Label column sm="1">
                  Numero
                </Form.Label>
                <Col sm="11">
                  <Form.Control
                    type="text"
                    placeholder="(124)-567-8901"
                    name="contactNumber"
                    onChange={this.handleChange}
                    value={this.state.form.contactNumber}
                  />
                </Col>
              </Form.Group>
            </Form.Group>
            <Button
              color="primary"
              size="lg"
              block
              onClick={() => {
                this.formMode("save", this.state.form);
              }}
            >
              {this.state.buttonText.text}
            </Button>
            <Button
              color="primary"
              size="lg"
              block
              onClick={() => this.limpiar()}
            >
              Limpiar
            </Button>
          </Form>
          <Col xs="3" md={{ span: 6, offset: 6 }}>
            <Form.Label column sm="1"></Form.Label>
            <Form.Control
              type="text"
              placeholder="Buscar"
              name="word"
              onChange={(e) => {
                if (this.state.search.word !== undefined) {
                  this.setState({ search: { word: e.target.value } });
                  this.search(this.state.contactos);
                }
              }}
            />
          </Col>

          <Table>
            <thead>
              <th>Id</th>
              <th>Nombre</th>
              <th>Numero</th>
              <th>Opciones</th>
            </thead>
            <tbody>
              {this.state.contactos.map((contacto) => (
                <tr key={contacto.id}>
                  <td>{contacto.id}</td>
                  <td>{contacto.contactName}</td>
                  <td>{contacto.contactNumber}</td>
                  <td>
                    <ButtonGroup>
                      <Button
                        color="warning"
                        onClick={() => {
                          this.editar(contacto);
                        }}
                      >
                        Editar
                      </Button>
                      <Button
                        color="danger"
                        onClick={() => {
                          this.eliminar(contacto);
                        }}
                      >
                        Eliminar
                      </Button>
                    </ButtonGroup>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Container>
      </div>
    );
  }
}

export default App;
