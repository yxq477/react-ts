import * as React from 'react';

class CustomTextInput extends React.Component {
    public textInput: React.RefObject<HTMLInputElement>;
    constructor(props: any) {
        super(props);
        this.textInput = React.createRef();
        this.focus = this.focus.bind(this);
    }

    public focus() {
        // 直接使用原生 API 使 text 输入框获得焦点
        if (this.textInput.current) {
            this.textInput.current.focus();
        }
    }

    public render() {
        // 使用 `ref` 的回调将 text 输入框的 DOM 节点存储到 React 
        // 实例上（比如 this.textInput）
        return (
            <div>
                <input
                    type="text"
                    ref={this.textInput} />
                <input
                    type="button"
                    value="Focus the text input"
                    onClick={this.focus}
                />
            </div>
        );
    }
}

export default CustomTextInput