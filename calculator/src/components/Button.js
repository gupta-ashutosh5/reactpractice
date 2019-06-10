import React from 'react';
import './Button.css';

class Button extends React.Component{
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e) {
        this.props.onClick(this.props.digit);
    }

    render() {
        const className = [
            "component-button",
            this.props.orange ? "orange" : "",
            this.props.wide ? "wide" : ""
        ]

        return(
            <div className={className.join(" ").trim()}>
                <button value={this.props.digit} onClick = {this.handleClick}>
                    {this.props.digit}
                </button>
            </div>

        )
    }
}

export default Button;