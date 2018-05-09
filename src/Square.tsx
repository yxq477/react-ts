import * as React from 'react';

interface ISquareProps {
    value: string;
    onClick: () => void;
}
class Square extends React.Component<ISquareProps> {
    public render() {
        return (
            <button className="square" onClick={()=>{this.props.onClick()}}>
                {this.props.value}
            </button>
        );
    }
}

export default Square