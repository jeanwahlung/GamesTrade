import React, { Component } from 'react';
import TradeCenter from '../components/TradeCenter'
import axios from 'axios';
import { Tab, Nav, Col, Row, Card, ListGroup, ListGroupItem, CardGroup, Button, Form, CardImg } from 'react-bootstrap';

class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      image: "https://i.pinimg.com/originals/82/1d/75/821d75c6279126e43aeb77ccc36ceeec.jpg",
      image1: "https://i.pinimg.com/originals/82/1d/75/821d75c6279126e43aeb77ccc36ceeec.jpg",
      selected1: false,
      selected2: false,
      product1: 1,
      product2: 2,
      isTraded1: false,
      isTraded2: false,
      userId1: '',
      userId2: '',
      trades: [],
      mytrades: [],
      users: []

    };

    this.cargar = this.cargar.bind(this);
    this.Selected1 = this.Selected1.bind(this);
    this.Selected2 = this.Selected2.bind(this);
    this.cargar1 = this.cargar1.bind(this);
    this.Submit = this.Submit.bind(this);
    this.Submit = this.Submit.bind(this);

    this.componentDidMount = this.componentDidMount.bind(this)
  }

  componentDidMount() {





    // Verify token
    axios.get('http://localhost:4000/users/api/account')
      .then(response => {
        this.setState({ users: response.data });


      })
      .catch(function (error) {
        console.log(error);
      })

    axios.get('http://localhost:4000/users/api/account/trades/')
      .then(response => {
        this.setState({ trades: response.data });
        this.state.trades.map(trade => {



          this.props.myproductstrade.map(user => {

            if (trade.userId2 == user.id && trade.owner != user.owner) {

              this.state.mytrades.push(trade)

            }


          });


        });

      })
      .catch(function (error) {
        console.log(error);
      })





  }



  cargar() {
    var image = this.productImage.value
    this.setState({ image: image })
  }

  cargar1() {
    var image1 = this.productImage1.value
    this.setState({ image1: image1 })
  }
  Selected1(product) {
    if (this.state.selected1 == true) {
      var select1 = false
      this.setState({ selected1: select1 })
    } else if (this.state.selected2 == false) {
      var select1 = true
      this.setState({
        selected1: select1,
        product1: product
      })
    }





  }
  Selected2(product) {
    if (this.state.selected2 == true) {
      var select2 = false
      this.setState({ selected2: select2 })
    } else if (this.state.selected2 == false) {
      var select2 = true
      this.setState({
        selected2: select2,
        product2: product
      })
    }

  }
  Submit() {
    this.props.createTrade(this.state.product1.id.toString(), this.state.product1.name, this.state.product2.id.toString(), this.state.product1.owner, this.state.product2.name);

  }
  Submit2(product) {



  }


  render() {

    return (
      <Tab.Container id="left-tabs-example" defaultActiveKey="first">
        <Row>
          <Col sm={2}>
            <Nav variant="pills" className="flex-column">
              <Nav.Item>
                <Nav.Link eventKey="first">Products</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="second">Buy Product</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="third">Create Trade</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="fourth">Trade Requests</Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
          <Col sm={10}>
            <Tab.Content>
              <Tab.Pane eventKey="first">
                <Tab.Container id="left-tabs-example" defaultActiveKey="add">
                  <Nav variant="tabs">
                    <Nav.Item>
                      <Nav.Link eventKey="add">Add</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="edit">Edit</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="delete">Delete</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="list">List</Nav.Link>
                    </Nav.Item>
                  </Nav>
                  <Tab.Content>
                    <Tab.Pane eventKey="add">
                      <br />
                      <h1>Product Information</h1>
                      <br />
                      <Form onSubmit={(event) => {
                        event.preventDefault()
                        const name = this.productName.value
                        const description = this.productDescription.value
                        const image = this.productImage.value
                        const price = window.web3.utils.toWei(this.productPrice.value.toString(), 'Ether')
                        this.props.createProduct(name, description, image, price)
                      }}>
                        <Form.Row>
                          <Col sm={6}>
                            <Form.Control
                              id="productName"
                              type="text"
                              ref={(input) => { this.productName = input }}
                              className="form-control"
                              placeholder="Name"
                              required />
                            <br />
                            <Form.Control
                              id="productPrice"
                              type="text"
                              ref={(input) => { this.productPrice = input }}
                              className="form-control"
                              placeholder="Price"
                              required />
                            <br />
                            <Form
                              as="textarea" rows="3"
                              id="productDescription"
                              type="text"
                              ref={(input) => { this.productDescription = input }}
                              className="form-control"
                              placeholder="Description"
                              required />
                            <br />
                            <Form.Row>
                              <Col sm={10}>
                                <Form.Control
                                  id="productImage"
                                  type="text"
                                  ref={(input) => { this.productImage = input }}
                                  className="form-control"
                                  placeholder="Image URL"
                                  required />
                              </Col>
                              <Col sm={2}>
                                <Button variant="success" onClick={this.cargar} >Load URL</Button>
                              </Col>
                            </Form.Row>
                            <br />
                            <Button type="submit" variant="danger">Add Product</Button>
                          </Col>
                          <Col sm={1} />
                          <Col sm={5}>
                            <Card border="danger">
                              <CardImg top width="100%" src={this.state.image} />
                            </Card>
                          </Col>
                        </Form.Row>
                      </Form>
                    </Tab.Pane>
                    <Tab.Pane eventKey="edit">
                      <br />
                      <Form onSubmit={(event) => {
                        event.preventDefault()
                        const id = this.productID1.value
                        const name = this.productName1.value
                        const description = this.productDescription1.value
                        const image = this.productImage1.value
                        const price = window.web3.utils.toWei(this.productPrice1.value.toString(), 'Ether')
                        this.props.updateProduct(id, name, description, image, price)
                      }}>
                        <Form.Row>
                          <Col sm={5}>
                            <h1>Select a Product</h1>
                            <br />
                            <table className="table">
                              <thead>
                                <tr>
                                  <th scope="col">#</th>
                                  <th scope="col">Name</th>
                                  <th scope="col">Price</th>
                                  <th scope="col"></th>
                                </tr>
                              </thead>
                              <tbody id="productList">
                                {this.props.myproducts.map((product, key) => {
                                  return (
                                    <tr key={key}>
                                      <th scope="row">{product.id.toString()}</th>
                                      <td>{product.name}</td>
                                      <td>{window.web3.utils.fromWei(product.price.toString(), 'Ether')} Eth</td>
                                      <td>
                                        {true
                                          ? <Button
                                            variant="primary"
                                            onClick={(event) => {
                                              this.productID1.value = product.id.toString()
                                              this.productName1.value = product.name
                                              this.productDescription1.value = product.description
                                              this.productPrice1.value = window.web3.utils.fromWei(product.price.toString(), 'Ether')
                                              this.productImage1.value = product.image
                                            }}
                                          >
                                            Edit
                                        </Button>
                                          : null
                                        }
                                      </td>
                                    </tr>
                                  )
                                })}
                              </tbody>
                            </table>
                          </Col>
                          <Col sm={1} />
                          <Col sm={6}>
                            <h1>Product Information</h1>
                            <br />
                            <Form.Row>
                              <Col sm={1}>
                                <p className="id">ID:</p>
                              </Col>
                              <Col sm={4}>
                                <Form.Control
                                  id="productID1"
                                  type="text"
                                  ref={(input) => { this.productID1 = input }}
                                  className="form-control"
                                  readOnly
                                  required />
                              </Col>
                              <Col sm={4}></Col>
                              <Col sm={3}>
                                <Button type="submit" className="boton1" variant="danger">Confirm Edit</Button>
                              </Col>
                            </Form.Row>
                            <Form.Control
                              id="productName1"
                              type="text"
                              ref={(input) => { this.productName1 = input }}
                              className="form-control"
                              placeholder="Name"
                              required />
                            <br />
                            <Form.Control
                              id="productPrice1"
                              type="text"
                              ref={(input) => { this.productPrice1 = input }}
                              className="form-control"
                              placeholder="Price"
                              required />
                            <br />
                            <Form
                              as="textarea" rows="3"
                              id="productDescription1"
                              type="text"
                              ref={(input) => { this.productDescription1 = input }}
                              className="form-control"
                              placeholder="Description"
                              required />
                            <br />
                            <Form.Row>
                              <Col sm={10}>
                                <Form.Control
                                  id="productImage1"
                                  type="text"
                                  ref={(input) => { this.productImage1 = input }}
                                  className="form-control"
                                  placeholder="Image URL"
                                  required />
                              </Col>
                              <Col sm={2}>
                                <Button variant="success" onClick={this.cargar1}>Load URL</Button>
                              </Col>
                            </Form.Row>
                            <br />
                            <Card border="danger">
                              <CardImg top width="100%" src={this.state.image1} />
                            </Card>
                            <br />
                          </Col>
                        </Form.Row>
                      </Form>
                    </Tab.Pane>
                    <Tab.Pane eventKey="delete">
                      <br />
                      <h1>Select a Product</h1>
                      <br />
                      <table className="table">
                        <thead>
                          <tr>
                            <th scope="col">#</th>
                            <th scope="col">Name</th>
                            <th scope="col">Description</th>
                            <th scope="col">Price</th>
                            <th scope="col"></th>
                          </tr>
                        </thead>
                        <tbody id="productList">
                          {this.props.myproducts.map((product, key) => {
                            return (
                              <tr key={key}>
                                <th scope="row">{product.id.toString()}</th>
                                <td>{product.name}</td>
                                <td>{product.description}</td>
                                <td>{window.web3.utils.fromWei(product.price.toString(), 'Ether')} Eth</td>
                                <td>
                                  {true
                                    ? <Button
                                      variant="danger"
                                      name={product.id}
                                      onClick={(event) => {
                                        this.props.deleteProduct(event.target.name)
                                      }}
                                    >
                                      Delete
                        </Button>
                                    : null
                                  }
                                </td>
                              </tr>
                            )
                          })}
                        </tbody>
                      </table>
                    </Tab.Pane>
                    <Tab.Pane eventKey="list">
                      <br />
                      <h1>My Products</h1>
                      <br />
                      <Row>
                        <CardGroup>
                          {this.props.myproducts.map((product, key) => {
                            return (
                              <Col sm={4}>
                                <Card border="danger">
                                  <Card.Img variant="top" src={product.image} height="20%" />
                                  <Card.Body>
                                    <Card.Title>{product.name}</Card.Title>
                                    <Card.Text>
                                      {product.description}
                                    </Card.Text>
                                  </Card.Body>
                                  <ListGroup className="list-group-flush">
                                    <ListGroupItem>Precio: {window.web3.utils.fromWei(product.price.toString(), 'Ether')} Eth</ListGroupItem>
                                  </ListGroup>
                                </Card>
                                <br />
                              </Col>
                            )
                          })}
                        </CardGroup>
                      </Row>
                    </Tab.Pane>
                  </Tab.Content>
                </Tab.Container>
              </Tab.Pane>
              <Tab.Pane eventKey="second">
                <h1>Buy Product</h1>
                <br />
                <Row>
                  <CardGroup>
                    {this.props.products.map((product, key) => {
                      return (
                        <Col sm={4}>
                          <Card border="danger">
                            <Card.Img variant="top" src={product.image} height="20%" />
                            <Card.Body>
                              <Card.Title>{product.name}</Card.Title>
                              <Card.Text>
                                {product.description}
                              </Card.Text>
                            </Card.Body>
                            <ListGroup className="list-group-flush">
                              <ListGroupItem>Precio: {window.web3.utils.fromWei(product.price.toString(), 'Ether')} Eth</ListGroupItem>
                              <ListGroupItem>Propietario: {product.owner}</ListGroupItem>
                              <ListGroupItem>{true
                                ? <Button
                                  variant="danger"
                                  className="float-right"
                                  name={product.id}
                                  value={product.price}
                                  onClick={(event) => {
                                    this.props.purchaseProduct(event.target.name, event.target.value)
                                  }}
                                >
                                  Buy Product
                                </Button>
                                : null
                              }</ListGroupItem>
                            </ListGroup>
                          </Card>
                          <br />
                        </Col>
                      )
                    })}
                  </CardGroup>
                </Row>
              </Tab.Pane>
              <Tab.Pane eventKey="third">
                <Tab.Container id="left-tabs-example" defaultActiveKey="one">
                  <Nav variant="tabs">
                    <Nav.Item>
                      <Nav.Link eventKey="one">Trade</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="three">My Trade Products</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="two">Trade Products</Nav.Link>
                    </Nav.Item>
                  </Nav>
                  <Tab.Content>
                    <Tab.Pane eventKey="one">
                      <br />
                      <h1>Trade Request</h1>
                      <br />
                      <Form.Row>
                        <Col sm={4}>
                          <Card style={{ width: '18rem', marginLeft: '50px' }}>
                            <h2>Your Product</h2>
                            <Card.Img border="danger" variant="top" src={this.state.product1.image} />
                            <Card.Body>
                              <Card.Title>{this.state.product1.name}</Card.Title>
                              <Card.Text>
                                {this.state.product1.description}
                              </Card.Text>
                            </Card.Body>
                          </Card>
                        </Col>
                        <Col sm={4}>
                          <Button className="bot1" variant="outline-danger" onClick={this.Submit}>
                            <img className="inter" src="https://cdn1.iconfinder.com/data/icons/venetian-red-to-beautify-your-website/512/Exchange_Arrows-512.png" alt="my image" />
                          </Button>
                        </Col>
                        <Col sm={4}>
                          <Card style={{ width: '18rem' }}>
                            <h2>Wanted Product</h2>
                            <Card.Img variant="top" src={this.state.product2.image} />
                            <Card.Body>
                              <Card.Title>{this.state.product2.name}</Card.Title>
                              <Card.Text>
                                {this.state.product2.description}
                              </Card.Text>
                            </Card.Body>
                          </Card>
                        </Col>
                      </Form.Row>
                    </Tab.Pane>
                    <Tab.Pane eventKey="two">
                      <br />
                      <h1>Trade Products</h1>
                      <br />
                      <Row>
                        <CardGroup>
                          {this.props.productstrade.map((product, key) => {
                            return (
                              <Col sm={4}>
                                <Card border="danger">
                                  <Card.Img variant="top" src={product.image} height="20%" />
                                  <Card.Body>
                                    <Card.Title>{product.name}</Card.Title>
                                    <Card.Text>
                                      {product.description}
                                    </Card.Text>
                                  </Card.Body>
                                  <ListGroup className="list-group-flush">
                                    <ListGroupItem>Precio: {window.web3.utils.fromWei(product.price.toString(), 'Ether')} Eth</ListGroupItem>
                                    <ListGroupItem>Propietario: {product.owner}</ListGroupItem>
                                    <ListGroupItem>{true
                                      ? <Button
                                        variant="primary"
                                        className="float-right"
                                        name={product.id}
                                        value={product.price}
                                        onClick={(event) => {
                                          { this.Selected2(product) }
                                        }}
                                      >
                                        Select for Trade
                                </Button>
                                      : null
                                    }</ListGroupItem>
                                  </ListGroup>
                                </Card>
                                <br />
                              </Col>
                            )
                          })}
                        </CardGroup>
                      </Row>
                    </Tab.Pane>
                    <Tab.Pane eventKey="three">
                      <br />
                      <h1> My Trade Products</h1>
                      <br />
                      <Row>
                        <CardGroup>
                          {this.props.myproductstrade.map((product, key) => {
                            return (
                              <Col sm={4}>
                                <Card border="danger">
                                  <Card.Img variant="top" src={product.image} height="20%" />
                                  <Card.Body>
                                    <Card.Title>{product.name}</Card.Title>
                                    <Card.Text>
                                      {product.description}
                                    </Card.Text>
                                  </Card.Body>
                                  <ListGroup className="list-group-flush">
                                    <ListGroupItem>Precio: {window.web3.utils.fromWei(product.price.toString(), 'Ether')} Eth</ListGroupItem>
                                    <ListGroupItem>Propietario: {product.owner}</ListGroupItem>
                                    <ListGroupItem>{true
                                      ? <Button
                                        variant="primary"
                                        className="float-right"
                                        name={product.id}
                                        value={product.price}
                                        onClick={(event) => {
                                          { this.Selected1(product) }
                                        }}
                                      >
                                        Select for Trade
                                </Button>
                                      : null
                                    }</ListGroupItem>
                                  </ListGroup>
                                </Card>
                                <br />
                              </Col>
                            )
                          })}
                        </CardGroup>
                      </Row>
                    </Tab.Pane>
                  </Tab.Content>
                </Tab.Container>
              </Tab.Pane>
              <Tab.Pane eventKey="fourth">
                <h1>Trade Requests</h1>
                <br />
                <br />
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">Trader's ID</th>
                      <th scope="col">Product Offered</th>
                      <th scope="col">My Product</th>
                      <th scope="col"></th>
                      <th scope="col"></th>
                    </tr>
                  </thead>
                  <tbody id="tradeList">
                    {this.state.mytrades.map((product, key) => {


                      return (
                        <tr key={key}>
                          <th scope="row">{product._id.toString()}</th>
                          <td>{product.name1}</td>
                          <td>{product.name2}</td>
                          <td>
                            {true
                              ? <Button
                                variant="success"
                                name={product.id}
                                onClick={(event) => {
                                  this.props.purchaseProducttrade(product.userId2, product.userId1, product.owner)

                                }}
                              >
                                Accept
                        </Button>
                              : null
                            }
                          </td>
                          <td>
                            {true
                              ? <Button
                                variant="danger"
                                name={product.id}
                                onClick={(event) => {
                                  this.props.deleteTrade([product._id])
                                }}
                              >
                                Decline
                        </Button>
                              : null
                            }
                          </td>

                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>

      </Tab.Container>

    );
  }
}

export default Main;

