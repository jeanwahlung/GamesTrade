import React, { Component } from 'react';
import Marketplace from './Marketplace'
import Home from './Home'
import Home2 from './Home2'
import Signup from './Signup'
import TradeCenter from './TradeCenter'
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom'



const App = ({ children }) => (
  <>
   <Router>
   
   <Switch>
     <Route exact path="/" component={Home}/>
     <Route exact path="/h" component={Home2}/>
     <Route exact path="/trade" component={TradeCenter}/>

   
     <Route exact path="/signup" component={Signup}/>

    
   </Switch>

</Router>

  </>
);

export default App;
