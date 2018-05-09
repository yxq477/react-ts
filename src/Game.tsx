import * as React from 'react';
import { Board } from './Board';

interface IGameStates {
    isXnext: boolean,
    history: string[][],
    stepNumber: number,
}
class Game extends React.Component<object, IGameStates> {
    constructor(p: object, s: IGameStates) {
        super(p, s);
        this.state = {
            history: [Array(9).fill(null)],
            isXnext: true,
            stepNumber: 0,
        }
        this.handleClick = this.handleClick.bind(this);
        this.jumpTo = this.jumpTo.bind(this);
    }
    public handleClick(index: number) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1].slice();

        if (this.calculateWinner(current) || current[index]) {
            return;
        }
        current[index] = this.state.isXnext ? 'X' : 'O';
        this.setState({ history: history.concat([current]), stepNumber: history.length, isXnext: !this.state.isXnext });
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

    public jumpTo(step: number): any {
        this.setState({
            isXnext: (step % 2) ? false : true,
            stepNumber: step,
        });
    }


    public render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = this.calculateWinner(current);

        function TimeMachine(props: any) {
            function clickHandle() {
                props.jumpTo(props.stepNumber);
            }
            return (
                <a href="#" onClick={clickHandle}>{props.desc}</a>
            )
        }
        const moves = history.map((step, stepNumber) => {
            const desc = stepNumber ?
                'Move #' + stepNumber : 'Game start';
            return (
                <li key={stepNumber}>
                    <TimeMachine jumpTo={this.jumpTo} stepNumber={stepNumber} desc={desc} />
                </li>
            )
        })

        let status;
        if (winner) {
            status = 'winner is ' + winner;
        } else {
            status = `Next player:  ${this.state.isXnext ? 'X' : 'O'}`;
        }
        return (
            <div className="game">
                <div className="game-board">
                    <Board squares={current} onClick={this.handleClick} />
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