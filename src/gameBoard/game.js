import React, { Component} from "react";
import Board from './board';
import './game.css';
import { ListGroup, ListGroupItem, Button } from 'reactstrap';

function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
        }
    }
    return null;
}

function getLocation(move) {
    const locationMap = {
        0: 'row: 1, col: 1',
        1: 'row: 1, col: 2',
        2: 'row: 1, col: 3',
        3: 'row: 2, col: 1',
        4: 'row: 2, col: 2',
        5: 'row: 2, col: 3',
        6: 'row: 3, col: 1',
        7: 'row: 3, col: 2',
        8: 'row: 3, col: 3',
    }; 
    return locationMap[move];
};

class Game extends Component {
    constructor(props){
        super(props);
        this.state={
            history:[{
                squares: Array(9).fill(null)
            }],
            playerX: true,
            stepNumber: 0,
            addedClass: 'X'
        }
    }
    handleClick(i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();
  
        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        squares[i] = this.state.playerX ? 'X' : 'O';
        
        this.setState({
            history: history.concat([{
            squares: squares,
            currentLocation: getLocation(i),
            }]),
            stepNumber: history.length,
            playerX: !this.state.playerX,
        });
    }
    jumpTo(step){
        this.setState({
            stepNumber: step,
            playerX: (step%2) ===0
        })
    }
    sortMoves() {
        this.setState({
            history: this.state.history.reverse(),
        });
    }
    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = calculateWinner(current.squares);

        const moves = history.map((step,move) => {
            const currentLocation = step.currentLocation ? `(${step.currentLocation})` : '';
            const eachMove = move ?
                'Go to move #' + move : 'Go to game start';
            return (
                <ListGroup key={move} flush>
                    <ListGroupItem>
                        <Button color="primary" size="sm" onClick={()=> this.jumpTo(move)}>{eachMove +" "+ currentLocation}</Button>
                    </ListGroupItem>
                </ListGroup>
            )
        });
        let status;
        if(winner){
            status = 'Good game '+ winner+'... you won!!';
        }else if(!winner && this.state.stepNumber == 9){
            status = 'Tight Game, Its a Tie!!';
        }else{
            status = 'Next player: ' + (this.state.playerX ? 'X' : 'O');
        }
        return (
            <div className="game">
                <div className="col-md-8 game-board">
                    <h6 className={winner? 'winner':''}>{status}</h6>
                    <Board squares={current.squares} addedClass={this.state.addedClass}
                        onClick={(i)=> this.handleClick(i)}/>
                </div>
                <div className="col-md-4 game-info">
                    <h6>Game Moves</h6>
                    {/* <Button color="primary" onClick={()=>this.sortMoves()}>^</Button> */}
                    <div className="game-info__steps">
                        <ol>{moves}</ol>
                    </div>
                </div>
            </div>
        );
    }
}

export default Game;