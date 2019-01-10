import React, { Component} from "react";
import Game from './gameBoard/game';
import {hot} from "react-hot-loader";
import { Jumbotron } from 'reactstrap';
import "./App.css";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

class App extends Component{
  render(){
    return (
      <div className="container">
        <header className="text-center">
         <h3>!! Tic Tac Toe !!</h3>
        </header>
        <div className="spacer"></div>
        <div>
          <Game />
        </div>
       
      </div>
    );
  }
}

export default hot(module)(App);