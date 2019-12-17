import React, { Component } from 'react';
import { Navbar, Button, Alert } from 'react-bootstrap';
import axios from 'axios';
import { getFromStorage, setInStorage } from './utils/storage';

class Navbar2 extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      token: '',
      users: [],
      user_id: 0,
      usuarios: [],
      usuario: ''
    };
    this.logout = this.logout.bind(this);

  }

  componentDidMount() {
    const obj = getFromStorage('usuarios');


    if (obj && obj.token) {
      const { token } = obj;

      // Verify token
      axios.get('http://localhost:4000/users/api/account')
        .then(response => {
          this.setState({ users: response.data });
          console.log(this.state.users);

          this.state.users.map(user => {
           
            axios.get('http://localhost:4000/users/api/account/users')
            .then(response => {
              this.setState({ usuarios: response.data });
              console.log(this.state.users);

              this.state.usuarios.map(usuario => {
                
                if (user.userId== usuario._id && user.isDeleted == false) {
                  
                
        
                  this.setState({
                    token,
                    isLoading: false,
                    usuario: usuario.name,
                    user_id:usuario._id
                    
  
                  });
                
    
    
    
                } else {
                  this.setState({
                    isLoading: false,
                  });
                }
               
               
               
               
                
              })
            })
         


          });
        })
        .catch(function (error) {
          console.log(error);
        })


    } else {
      this.setState({
        isLoading: false,
      });
    }
  }

  logout(){
    
  axios.post('http://localhost:4000/users/api/account/update/'+this.state.user_id)
            .then(res => console.log(res.data));
            
            window.location = "/";        
  }


  render() {
    return (
      <Navbar bg="danger" variant="dark">
        <div class="my_container">
          <h1>GamesTrade</h1>
        </div>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            Signed in as: <a1 href="#login">{this.state.usuario}</a1>
          </Navbar.Text>
          <Navbar.Text className = "nt">HHH</Navbar.Text>
          <Button variant="dark" onClick={this.logout}>Log Out</Button>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default Navbar2;
