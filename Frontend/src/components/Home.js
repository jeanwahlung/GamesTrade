import axios from 'axios';
import React, { Component } from 'react';
import 'whatwg-fetch';
import Login from './login';
import swal from 'sweetalert';
import { getFromStorage, setInStorage } from './utils/storage';
import Marketplace from './Marketplace'

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      token: '',
      signUpError: '',
      signInError: '',
      signInEmail: '',
      signInPassword: '',
      signUpEmail: '',
      signUpPassword: '',
      users: []
    };

    this.onTextboxChangeSignInEmail = this.onTextboxChangeSignInEmail.bind(this);
    this.onTextboxChangeSignInPassword = this.onTextboxChangeSignInPassword.bind(this);
    this.onTextboxChangeSignUpEmail = this.onTextboxChangeSignUpEmail.bind(this);
    this.onTextboxChangeSignUpPassword = this.onTextboxChangeSignUpPassword.bind(this);

    this.onSignIn = this.onSignIn.bind(this);
    this.onSignUp = this.onSignUp.bind(this);
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
            
            if (token == user._id && user.isDeleted == false) {
             
              this.setState({
                token,
                isLoading: false
              });
              

            } else {
              this.setState({
                isLoading: false,
              });
            }


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

  onTextboxChangeSignInEmail(event) {
    this.setState({
      signInEmail: event.target.value,
    });
  }

  onTextboxChangeSignInPassword(event) {
    this.setState({
      signInPassword: event.target.value,
    });
  }

  onTextboxChangeSignUpEmail(event) {
    this.setState({
      signUpEmail: event.target.value,
    });

  }

  onTextboxChangeSignUpPassword(event) {
    this.setState({
      signUpPassword: event.target.value,
    });
  }

  onSignUp() {
    // Grab state

  }

  onSignIn() {
    // Grab state
    const usersession = {
      email: this.state.signInEmail,
      password: this.state.signInPassword
    }

    this.setState({
      isLoading: true,
    });
    axios.post('http://localhost:4000/users/api/account/signin', usersession)
      .then(res => {
        setInStorage('usuarios', { token: res.data.token });
        this.setState({

          isLoading: false,
          signInPassword: '',
          signInEmail: '',
          token: res.data.token,

        })
        
    
  })



}

logout() {
  this.setState({
    isLoading: true,
  });
  const obj = getFromStorage('usuarios');

  if (obj && obj.token) {
    const { token } = obj;

    // Verify token
    axios.post('http://localhost:4000/users/api/account/update/' + this.state.token, obj)
      .then(response => {


        this.state.users.map(user => {
          if (token == user._id) {
            this.setState({
              token: '',
              isLoading: false
            });

          } else {
            this.setState({
              isLoading: false,
            });
          }


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

render() {
  const {
    isLoading,
    token,
    signInError,
    signInEmail,
    signInPassword,
    signUpEmail,
    signUpPassword,
    signUpError,
  } = this.state;

  if (isLoading) {
    return (<div><p>Loading...</p></div>);
  }

  if (!token) {
    return (
      <div>
        <div>
          {
            (signInError) ? (
              <p>{signInError}</p>
            ) : (null)
          }
          <Login
            onSignIn={this.onSignIn}
            onTextboxChangeSignInEmail={this.onTextboxChangeSignInEmail}
            onTextboxChangeSignInPassword={this.onTextboxChangeSignInPassword}
            signInEmail={this.state.signInEmail}
            signInPassword={this.state.signInPassword}

          />
        </div>
        <br />
        <br />


      </div>
    );
  }

  return (
    <Marketplace />
  );
}
  }

export default Home;