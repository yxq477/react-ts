import * as React from 'react';
import Square from './Square';

interface IBoardStates {
    squares: string[],
    isXnext: boolean,
}
class Board extends React.Component<object, IBoardStates> {
    constructor(p: object, s: IBoardStates) {
        super(p, s);
        this.state = {
            isXnext: true,
            squares: Array(9).fill(null),
        }
        this.handleClick = this.handleClick.bind(this);
    }
    public handleClick(i: number) {
        const squares = this.state.squares.slice();
        if (this.calculateWinner(squares) || squares[i]) {
            return;
        }
        squares[i] = this.state.isXnext ? 'X' : 'O';
        this.setState({
            isXnext: !this.state.isXnext,
            squares
        });
    }
    public renderSquare(i: number) {
        return (<Square
            sequence={i}
            value={this.state.squares[i]}
            onClick={this.handleClick} />)
    }
    public calculateWinner(squares: string[]) {
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
        for (const i of lines) {
            const [a, b, c] = i;
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                return squares[a];
            }
        }
        return null;
    }

    public render() {
        const winner = this.calculateWinner(this.state.squares);
        let status;
        if (winner) {
            status = 'winner is ' + winner;
        } else {
            status = `Next player:  ${this.state.isXnext ? 'X' : 'O'}`;
        }
        return (
            <div>
                <div className="status">{status}</div>
                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="board-row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="board-row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
            </div>
        );
    }
}

export default Board