import React, { Component } from 'react'
import CalcScreen from '../CalcScreen/CalcScreen'
import NumberPalette from '../NumberPalette/NumberPalette'
import './Main.css'

class Main extends Component {
  constructor () {
    super()
    this.state = {
      calculatorText: '',
      operands: [],
      operator: null    
    }
    this.operandMapping = {
        '+': (a, b) => a+b,
        '×': (a, b) => a*b,
        '-': (a, b) => a-b,
        '÷': (a, b) => a/b,
    };
  }


  clickNumberButton = () =>(eve) => {
    this.setState({
        calculatorText: `${this.state.calculatorText}${eve.currentTarget.textContent}`
      })
  }

  clickOperatorButton = () =>(eve) => {
    try {
      const operatorText = eve.currentTarget.textContent;
      if(!this.state.operator){
        this.setState({
          operator: operatorText,
          calculatorText: `${this.state.calculatorText}${operatorText}`
        })
      }
      else{
        const operationResult = this.calculateOperationOrThrowError(this)
        this.setState({
          calculatorText: `${operationResult}${operatorText}`,
          operator: operatorText
        })       
      }
    } catch (error) {
      this.handleError()
    }
  
  }

  clickEqualButton = () =>() => {
    try {
      const res = this.calculateOperationOrThrowError(this)
      this.setState({
        calculatorText: res,
        operator: null
      })    
    } catch (error) {
      this.handleError(error);
    }
 
  }

  clickMemorySaveButton = () =>(eve) => {
      try {
        
      } catch (error) {
        this.handleError(error);
      }
  }

  clickMemoryLoadButton = () =>(eve) => {
    try {
        
    } catch (error) {
      this.handleError(error);
    }
  }

  clickClearButtonButton = () =>(eve) => {
    this.setState({
      calculatorText: '',
      operator: null
    })  
  }

  handleError() {
    this.setState({
      calculatorText: 'Error'
    })
  }

  calculateOperationOrThrowError(context) {
    const res = context.state.calculatorText.split(context.state.operator);
    if (res.length < 2) {
      throw new Error("All operators are binary!");
    }

    return context.operandMapping[context.state.operator](parseFloat(res[0]), parseFloat(res[1]));
  }

    checkIfValidOrThrowError(availableOperands, operandString) {
        if(!operandString){
            throw new Error('The operation cannot be empty!')
        }
        let contains = true

        availableOperands.forEach(operator => {
            contains += operandString.includes(operator)
        })
        if(!contains){
            throw new Error('The operation to perform does not contain operators!')
        }
    }

  render () {
    return (
      <div className='App'>
        <CalcScreen screenText={this.state.calculatorText} />
        <NumberPalette handleNumberClick={this.clickNumberButton}
                handleEqualClick={this.clickEqualButton}
                handleOperatorClick={this.clickOperatorButton}
                handleClearClick={this.clickClearButtonButton}
                />
      </div>
    )
  }
}

export default Main
