import * as React from 'react';

interface ISquareProps {
    sequence: number;
    value: string;
    onClick: (value: number) => void;
}
class Square extends React.Component<ISquareProps> {
    constructor(p: ISquareProps) {
        super(p);
        this.handleClick = this.handleClick.bind(this);
    }
    public handleClick() {
        this.props.onClick(this.props.sequence);
    }
    public render() {
        return (
            <button className="square" onClick={this.handleClick}>
                {this.props.value}
            </button>
        );
    }
}

export default Square