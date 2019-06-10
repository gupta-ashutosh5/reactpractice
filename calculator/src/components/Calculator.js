import React from 'react';
import Display from './Display';
import ButtonPanel from './ButtonPanel';
import './Calculator.css';
import calculate from '../logic/calculate';

class Calculator extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            total: null,
            next: null,
            operation: null
        };
        this.handleDigitClick = this.handleDigitClick.bind(this);
    }

    handleDigitClick(buttonName) {
        this.setState(calculate(this.state, buttonName))
    }

    render() {
        return(
            <div className = "component-app">
                <Display value = {this.state.next || this.state.total || "0"} />
                <ButtonPanel handleDigitClick = {this.handleDigitClick} />
            </div>
        )
    }

}

export default Calculator;