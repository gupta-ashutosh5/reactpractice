import React from 'react';
import Button from './Button';
import './ButtonPanel.css'

class ButtonPanel extends React.Component{
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(value) {
        this.props.handleDigitClick(value)
    }

    render() {
        return (
            <div className = "component-button-panel">
                <div className = "Digit-row">
                    <Button digit = '1' onClick = {this.handleClick} />
                    <Button digit = '2' onClick = {this.handleClick} />
                    <Button digit = '3' onClick = {this.handleClick} />
                    <Button digit = '4' onClick = {this.handleClick} />
                </div>
                <div className = "Digit-row">
                    <Button digit = '5' onClick = {this.handleClick} />
                    <Button digit = '6' onClick = {this.handleClick} />
                    <Button digit = '7' onClick = {this.handleClick} />
                    <Button digit = '8' onClick = {this.handleClick} />
                </div>
                <div className = "Digit-row">
                    <Button digit = '9' onClick = {this.handleClick} />
                    <Button digit = '0' onClick = {this.handleClick} />
                    <Button digit = '+' onClick = {this.handleClick} orange />
                    <Button digit = '-' onClick = {this.handleClick} orange />
                </div>
                <div className = "Digit-row">
                    <Button digit = 'x' onClick = {this.handleClick} orange />
                    <Button digit = '/' onClick = {this.handleClick} orange />
                    <Button digit = '=' onClick = {this.handleClick} orange />
                    <Button digit = 'AC' onClick = {this.handleClick} />
                </div>
            </div>
        );
    }
}

export default ButtonPanel;