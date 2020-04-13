import React, { Component } from 'react';
import './App.css';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Home from "./Home";
import PessoaList from "./PessoaList";
import PessoaEdit from "./PessoaEdit";
import Login from "./Login";

class App extends Component {

  render() {
    return (
        <BrowserRouter>
          <Switch>
            <Route path='/' exact={true} component={Login}/>
              <Route path='/source' exact={true} component={Home}/>
              <Route path='/pessoas' exact={true} component={PessoaList}/>
            <Route path='/pessoas/:id' component={PessoaEdit}/>
          </Switch>
        </BrowserRouter>
    );
  }
}

export default App;