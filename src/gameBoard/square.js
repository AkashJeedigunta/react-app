import React, { Component} from "react";
import './square.css';

class Square extends Component {
  constructor(props){
    super(props);
    
  }
    render() {
      return (
        <button 
          className={`square ${ this.props.addedClass }`}
          onClick={()=>this.props.onClick()}
        >
          {this.props.value}
        </button>
      );
    }
  }

export default Square;