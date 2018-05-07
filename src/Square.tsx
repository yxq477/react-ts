import * as React from 'react';

interface ISquareProps {
    sequence: number;
    value: string;
    onClick: (value: number) => void;
}
interface ISquareStates {
    value: string | null;
}
class Square extends React.Component<ISquareProps, ISquareStates> {
    constructor(p: ISquareProps, o: object) {
        super(p, o);
        this.state = {
            value: null
        }
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