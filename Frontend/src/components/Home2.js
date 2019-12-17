import React, { Component } from 'react';
import 'whatwg-fetch';
import axios from 'axios'
import Login from './login'

import {
  getFromStorage,
  setInStorage,
} from './utils/storage';
import Signup from './Signup';

class Home2 extends Component {
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
      signUpName: '',
      signUpLastName: '',
      signUpPasswordConfirm: '',
      signUpPassword: '',

    };

    this.onTextboxChangeSignInEmail = this.onTextboxChangeSignInEmail.bind(this);
    this.onTextboxChangeSignInPassword = this.onTextboxChangeSignInPassword.bind(this);
    this.onTextboxChangeSignUpEmail = this.onTextboxChangeSignUpEmail.bind(this);
    this.onTextboxChangeSignUpName = this.onTextboxChangeSignUpName.bind(this);
    this.onTextboxChangeSignUpLastName = this.onTextboxChangeSignUpLastName.bind(this);
    this.onTextboxChangeSignUpPasswordConfirm = this.onTextboxChangeSignUpPasswordConfirm.bind(this);
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
            console.log(user._id)
            if (token == user._id) {
              this.setState({

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


  onTextboxChangeSignUpName(event) {
    this.setState({
      signUpName: event.target.value,
    });

  }
  onTextboxChangeSignUpLastName(event) {
    this.setState({
      signUpLastName: event.target.value,
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
  onTextboxChangeSignUpPasswordConfirm(event) {
    this.setState({
      signUpPasswordConfirm: event.target.value,
    });
  }

  onSignUp() {
   
    if (this.state.signUpPassword == this.state.signUpPasswordConfirm) {
      const newUser = {
        email: this.state.signUpEmail,
        name: this.state.signUpName,
        lastname: this.state.signUpLastName,
        password: this.state.signUpPassword

      }

      this.setState({
        isLoading: true,
      });

      // Post request to backend

      axios.post('http://localhost:4000/users/api/account/signup', newUser)
        .then(res => console.log(res.data));
      this.setState({

        isLoading: false,
        signUpEmail: '',
        signUpPassword: '',
        signUpName: '',
        signUpLastName:'',
        signUpPasswordConfirm:''
      })
    }else{
      alert("Different Password Not Registered")
   
    }


  }

  onSignIn() {
    // Grab state
    const {
      signInEmail,
      signInPassword,
    } = this.state;

    this.setState({
      isLoading: true,
    });

    // Post request to backend
    fetch('/api/account/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: signInEmail,
        password: signInPassword,
      }),
    }).then(res => res.json())
      .then(json => {
        console.log('json', json);
        if (json.success) {
          setInStorage('the_main_app', { token: json.token });
          this.setState({
            signInError: json.message,
            isLoading: false,
            signInPassword: '',
            signInEmail: '',
            token: json.token,
          });
        } else {
          this.setState({
            signInError: json.message,
            isLoading: false,
          });
        }
      });
    console.log('funciona')
    console.log(this.state.signInEmail)
    console.log(this.state.signInPassword)
  }

  logout() {
    this.setState({
      isLoading: true,
    });
    const obj = getFromStorage('usuarios');
    if (obj && obj.token) {
      const { token } = obj;
      // Verify token
      fetch('/api/account/logout?token=' + token)
        .then(res => res.json())
        .then(json => {
          if (json.success) {
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
            <Signup
              onSignUp={this.onSignUp}
              onTextboxChangeSignUpEmail={this.onTextboxChangeSignUpEmail}
              onTextboxChangeSignUpName={this.onTextboxChangeSignUpName}
              onTextboxChangeSignUpLastName={this.onTextboxChangeSignUpLastName}
              onTextboxChangeSignUpPassword={this.onTextboxChangeSignUpPassword}
              onTextboxChangeSignUpPasswordConfirm={this.onTextboxChangeSignUpPasswordConfirm}
              signUpEmail={this.state.signUpEmail}
              signUpName={this.state.signUpName}
              signUpLastName={this.state.signUpLastName}
              signUpPassword={this.state.signUpPassword}
              signUpPasswordConfirm={this.state.signUpPasswordConfirm}
              on
            />
          </div>
          <br />
          <br />


        </div>
      );
    }


  }
}

export default Home2;