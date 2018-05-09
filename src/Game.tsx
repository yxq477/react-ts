import * as React from 'react';
import Board from './Board';

interface IGameStates {
    history: string[][],
    stepNumber: number,
    xIsNext: boolean,
}

class Game extends React.Component<object, IGameStates> {
    constructor(p: object, s: IGameStates) {
        super(p, s);
        this.state = { history: [Array(9).fill('')], xIsNext: true, stepNumber: 0 }
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
        if (squares) {
            for (const i of lines) {
                const [a, b, c] = i;
                if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                    return squares[a];
                }
            }
        }
        return null;
    }
    public handleClick(i: number) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const squares = history[history.length - 1].slice();

        if (this.calculateWinner(squares) || squares[i]) {
            return;
        }

        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            history: history.concat([squares]),
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext,
        });
    }

    public jumpTo(step: number) {
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) ? false : true,
        });
    }
    public render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = this.calculateWinner(current);
        let status;
        if (winner) {
            status = 'winner is ' + winner;
        } else {
            status = `Next player:  ${this.state.xIsNext ? 'X' : 'O'}`;
        }
        const moves = history.map((step, stepNumber) => {
            const desc = stepNumber !== 0 ? 'Step #' + stepNumber : 'Game Start';
            return (
                <li key={stepNumber}><a href="#" onClick={() => { this.jumpTo(stepNumber) }}>{desc}</a></li>
            )
        })

        return (
            < div className="game" >
                <div className="game-board">
                    <Board squares={current} isXnext={this.state.xIsNext} onClick={(i) => { this.handleClick(i) }} />
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <ol>{moves}</ol>
                </div>
            </div>
        );
    }
}
export default Game