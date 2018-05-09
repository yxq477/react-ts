import * as React from 'react';
import Square from './Square';

export interface IBoardProps {
    squares: string[],
    onClick: (index:number) => void
}
export class Board extends React.Component<IBoardProps> {
    constructor(p: IBoardProps) {
        super(p);
        this.handleClick = this.handleClick.bind(this);
    }
    public handleClick(i: number) {
     
        this.props.onClick(i)
    }
    public renderSquare(i: number) {
        return (<Square
            sequence={i}
            value={this.props.squares[i]}
            onClick={this.handleClick} />)
    }


    public render() {
        return (
            <div>
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
