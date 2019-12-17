import axios from 'axios';
import React, { Component } from 'react';
import 'whatwg-fetch';
import Login from './login';
import { Tab, Nav, Col, Row, Card, ListGroup, ListGroupItem, CardGroup, Button, Form, CardImg,Container} from 'react-bootstrap';
import { getFromStorage, setInStorage } from './utils/storage';
import Marketplace from './Marketplace'

class TradeCenter extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isTraded1: false,
            isTraded2: false,
            userId1: '',
            userId2: '',
            trades: [],
            users: []
        };


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


            })
            .catch(function (error) {
                console.log(error);
            })



    }


    render() {

        return (
            <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src="holder.js/100px180" />
            <Card.Body>
              <Card.Title>Card Title</Card.Title>
              <Card.Text>
                Some quick example text to build on the card title and make up the bulk of
                the card's content.
              </Card.Text>
              <Button variant="primary">Go somewhere</Button>
            </Card.Body>
          </Card>
        );


    }
}

export default TradeCenter;